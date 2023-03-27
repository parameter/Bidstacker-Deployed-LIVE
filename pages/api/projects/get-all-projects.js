import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const result = await req.db.collection('projects').find({}).toArray();

  console.log('result', result);

  if (!result) return res.status(500).end();

  return res.status(200).json({ result });
});

export default handler;
