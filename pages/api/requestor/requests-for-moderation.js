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
 
        // get all users that are subaccount to the current account 
        const users = await req.db.collection('users').find({masterAccountId: req.user._id.toString()}).toArray();

        var usersIdArray = users.map((item) => {
            return item._id
        });
        console.log(usersIdArray);

        const requests = await req.db.collection('request-items').find({requestor: {$in: usersIdArray }}).toArray();


        res.send({result: 'success', requests: requests });
    }
);

export default handler;