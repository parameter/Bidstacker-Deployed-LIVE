import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { ObjectId } from 'mongodb';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
    ...auths,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).end();
        }

        const deliveryResponse = await req.db.collection('delivery').updateOne({_id: new ObjectId(req.body.deliveryId)},
            { $set: {
                delivered: {
                    time: new Date(),
                    coordinates: [req.body.position.lat, req.body.position.lon]
                }
            }}
        );

        if (!deliveryResponse) {
            return res.status(404).json({ error: { message: 'No delivery delivered' } });
        }

        res.send({result: 'success'});
    }
);

export default handler;