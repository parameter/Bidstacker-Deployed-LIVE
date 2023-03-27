import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const negotiations = await req.db
    .collection('negotiation')
    .find({ offererId: req.user._id })
    .toArray();

  let groupIds = negotiations.map((item) => {
    return item.groupId;
  });

  const request_metadata = await req.db
    .collection('request-metadata')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  const requests = await req.db
    .collection('request-items')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  const deliveries = await req.db
    .collection('deliveries')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  requests.forEach((item, i) => {
    deliveries.forEach((item2) => {
      if (item.groupId === item2.groupId) {
        requests[i].delivery = item2;
      }
    });
  });

  if (!requests) {
    return res.status(404).json({ error: { message: 'No offers found' } });
  }

  res.send({
    result: 'success',
    request_items: requests,
    negotiations: negotiations,
    deliveries: deliveries,
    request_metadata: request_metadata,
  });
});

export default handler;
