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
        // upsert 
        const upsertResponse = await req.db.collection('active-delivery-operators').updateOne(
            { user: req.user._id },
            { $set: {
                status: 'offline'
            }},
            { upsert: true}
        );
        
        if (!upsertResponse) {
            return res.json({result: 'success', status: 'offline' });
        }

        return res.json({result: 'success', status: 'offline' });
    }
);

export default handler;