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

  var _categories = req.query['categories[]'];

  if (typeof _categories !== 'object') {
    _categories = [_categories];
  } else {
    console.log('array', _categories);
  }

  const groupsRaw = await req.db
    .collection('request-items')
    .aggregate([
      { $match: { category: { $in: _categories } } },
      { $group: { _id: '$groupId' } },
    ])
    .toArray();

  const groupIds = groupsRaw.map((item) => {
    return item._id;
  });

  const deliveries = await req.db
    .collection('deliveries')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  const requests = await req.db
    .collection('request-items')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  const request_metadata = await req.db
    .collection('request-metadata')
    .find({ groupId: { $in: groupIds } })
    .toArray();

    const negotiations = await req.db
    .collection('negotiation')
    .find({ groupId: { $in: groupIds } })
    .toArray();

  // requests.forEach((item, i) => {
  //     deliveries.forEach((item2) => {
  //         if (item.groupId === item2.groupId) {
  //             requests[i].delivery = item2;
  //         }
  //     });
  // });

  if (!requests) {
    return res.status(404).json({ error: { message: 'No offers found' } });
  }

  res.send({
    result: 'success',
    request_items: requests,
    deliveries: deliveries,
    negotiations: negotiations,
    request_metadata: request_metadata,
  });
});

export default handler;
