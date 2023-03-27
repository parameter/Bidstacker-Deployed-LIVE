import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
    ...auths,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).end();
        }

        const deliveryResponse = await req.db.collection('deliveries').insertOne({
            deliveryOperator: req.user._id,
            groupId: req.body.groupId
        });

        if (!deliveryResponse) {
            return res.status(404).json({ error: { message: 'No delivery accepted' } });
        }

        const requestResponse = await req.db.collection('request-items').update({groupId: req.body.groupId}, 
            { $set: {
                deliveryId: deliveryResponse.insertedId
            }}
        );

        if (!requestResponse) {
            return res.status(404).json({ error: { message: 'No delivery requests updated' } });
        }

        res.send({result: 'success', deliveryId: deliveryResponse.insertedId});
    }
);

export default handler;