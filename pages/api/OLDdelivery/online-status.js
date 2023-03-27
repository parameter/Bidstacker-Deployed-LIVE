import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(
    ...auths,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).end();
        }

        // get online status 
        const onlineStatusResponse = await req.db.collection('active-delivery-operators').findOne({user: req.user._id});

        if (!onlineStatusResponse) {

            // upsert 
            await req.db.collection('active-delivery-operators').updateOne(
                { user: req.user._id },
                { $set: {
                    user: req.user._id,
                    location: {
                        coordinates: [req.body.lat, req.body.lon],
                        type: 'Point'
                    },
                    status: 'offline'
                }},
                { upsert: true}
            );

            return res.json({result: 'success', status: 'offline' });
        }

        return res.json({result: 'success', status: onlineStatusResponse.status });
    }
);

export default handler;