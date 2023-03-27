import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { v4 as uuidv4 } from 'uuid';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const response = await req.db.collection('delivery').updateOne({groupId: req.body.groupId }, { $set: { signedByRequestor: req.user._id }});

    if (!response) {
      return res.status(404).json({ error: { message: 'Sign failed' } });
    } 

    return res.json({result: 'success' });
  }
);

export default handler;