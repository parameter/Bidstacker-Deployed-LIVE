import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }
  console.log('User ID:', req.user._id);

  const request_metadata = await req.db
    .collection('request-metadata')
    .find({ requestor: req.user._id })
  .toArray();

  console.log('request_metadata:', request_metadata);

  const groupIds = [];
  request_metadata.forEach((item) => {
    if (groupIds.indexOf(item.groupId) === -1) {
      groupIds.push(item.groupId);
    }
  });
  console.log('groupIds:', groupIds);

  const deliveries = await req.db.collection('deliveries').find().toArray();
  console.log('deliveries:', deliveries);

  res.send({
    result: 'success',
    request_metadata: request_metadata,
    // request_items: request_items,
    deliveries: deliveries,
  });
});

export default handler;
