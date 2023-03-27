import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { ObjectId } from 'mongodb';

const handler = nc(ncOpts);

handler.use(database);

console.log(handler);

handler.get(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const request_metadata = await req.db
    .collection('request-metadata')
    .find({ requestor: req.user._id })
    .toArray();

  // get request ids
  const groupIds = [];
  request_metadata.forEach((item) => {
    if (groupIds.indexOf(item.groupId) === -1) {
      groupIds.push(item.groupId);
    }
  });
  console.log({ groupIds });

  const request_items = await req.db
    .collection('request-items')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  const deliveries = await req.db
    .collection('deliveries')
    .find({ groupId: { $in: groupIds } })
    .toArray();
  console.log({ deliveries });

  const negotiations = await req.db
    .collection('negotiation')
    .find({ groupId: { $in: groupIds } })
    .toArray();
  console.log({ negotiations });

  negotiations.forEach(async (item, i) => {
    const user = await req.db
      .collection('users')
      .findOne({ _id: item.offererId });
    negotiations[i].user = user;
  });

  if (!request_items) {
    return res.status(404).json({ error: { message: 'No requests found' } });
  }

  res.send({
    result: 'success',
    request_metadata: request_metadata,
    request_items: request_items,
    negotiations: negotiations,
    deliveries: deliveries,
  });
});

export default handler;
