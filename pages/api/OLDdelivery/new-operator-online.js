import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import _ from 'underscore';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
    ...auths,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).end();
        }

        const deliveries = await req.db.collection('delivery').find({deliveryOperator: req.user._id}).toArray();

        // upsert 
        const upsertResponse = await req.db.collection('active-delivery-operators').updateOne(
            { user: req.user._id },
            { $set: {
                user: req.user._id,
                location: {
                    coordinates: [req.body.lat, req.body.lon],
                    type: 'Point'
                },
                status: 'online'
            }},
            { upsert: true}
        );

        if (!upsertResponse) {
            return res.status(404).json({ error: { message: 'Going online failed' } });
        }

        // get packets near operator 
        const requestResponse = await req.db.collection('request-items').find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lon)]
                    },
                    $maxDistance: 30000
                }
            }
        }).toArray();

        // get request ids 
        var groupIds = [];
        requestResponse.forEach((item) => {
            if (groupIds.indexOf(item.groupId) === -1) {
                groupIds.push(item.groupId);
            }
        });

        const negotiations = await req.db.collection('negotiation').find({groupId: {$in: groupIds }, accepted: true}).toArray();

        var _groupedRequests = _.groupBy(requestResponse, 'groupId');

        var finalRequests = [];

        Object.keys(_groupedRequests).map((groupId) => {
            var location = null;
            negotiations.forEach((item2) => {
                if (item2.groupId === groupId) {
                    location = item2.supplyLocation
                }
            });
            if (location !== null) {
                finalRequests.push({
                    requests: _groupedRequests[groupId],
                    location: location
                });
            }
        });

        return res.json({result: 'success', requests: finalRequests, deliveries: deliveries });
    }
);

export default handler;