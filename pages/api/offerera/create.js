import { auths, database } from '@/api-lib/middlewares';
import axios from 'axios';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { ObjectId } from 'mongodb';
import Pusher from 'pusher';
import { insertNegotiation } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.use(database);

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  let items = [];
  Object.keys(req.body.items).forEach((key) => {
    items.push({
      request_item_id: req.body.items[key]['request_item_id'],
      offeredQuantity: req.body.items[key]['offeredQuantity'],
      offeredPrice: req.body.items[key]['offeredPrice'],
    });
  });

  const result = insertNegotiation({
    db: req.db,
    groupId: new ObjectId(req.body.groupId),
    requestor: new ObjectId(req.body.requestor),
    offererId: req.user._id,
    items: items,
    status: req.body.status,
    promisedDeliveryDate: req.body.promisedDeliveryDate,
    canDeliver: req.body.canDeliver,
    deliveryFee: req.body.deliveryFee
  });

  if (!result) {
    return res
      .status(404)
      .json({ error: { message: 'something happened' } });
  }

  // const crossServerResult = await axios.post('https://whale-app-a6c8t.ondigitalocean.app/new-negotiation', {groupId: req.body.groupId});
  // console.log('crossServerResult',crossServerResult.response);
 
  return res.send({ result: 'success' });

  /*
  try {
    const crossServerResult = await axios.post('https://whale-app-a6c8t.ondigitalocean.app/new-data', {groupId: req.body.groupId}, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true
      }
    });
    console.log('crossServerResult',crossServerResult.response);
  }
  catch(err) {
    console.log('error',err);
    return res.send({ error: err });
  } */

  return res.send({ result: 'success' });

});

export default handler;
