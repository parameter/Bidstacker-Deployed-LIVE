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

        const requests = await req.db.collection('request-metadata').find({ status: 'ready-for-checkout' }).toArray();

        const groupIds = requests.map((item) => {
            return item.groupId;
        });

        console.log('groupIds',groupIds);

        const negotiations = await req.db.collection('negotiation').find({ groupId: { $in: groupIds }, status: 'accepted' }).toArray();

        if (!requests) {
            return res.status(404).json({ error: { message: 'No requests found' } });
        }

        res.send({result: 'success', requests: requests, negotiations: negotiations });
    }
);

export default handler;