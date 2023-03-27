import { auths, database } from '@/api-lib/middlewares';
import axios from 'axios';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { ObjectId } from 'mongodb';

const handler = nc(ncOpts);

handler.use(database);

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  // Filtr out the collection negotiation from req.body.groupId
  const { groupId } = req.body;
  const { offerId } = req.body;

  // Om vi inte hittar något här betyder att förfrågan inte har accepterats av någon än
  const negotiation = await req.db
    .collection('negotiation')
    .findOne({ groupId: ObjectId(groupId), status: 'accepted' });



  /* 
    Pär rekommenderar: 
  */

  if (negotiation) {
    return res.send({
      message: "Can't accept more than one offer",
    });
  }
  
  /*
  const checkStatus = negotiation.filter(
    (negotiation) => negotiation.status === 'accepted'
  ).length;


  if (negotiation) {
    return res.send({
      message: "Can't accept more than one offer",
    });
  } 
  */

  // Then update the negotiation.status to accepted

    

  /* 
    Om vi här kollar att den även är NOT "accepted" så har vi säkrat att inte flera kan acceptera samtidigt
  */
  const acceptedNegotiation = await req.db
    .collection('negotiation')
    .findOneAndUpdate(
      { _id: ObjectId(offerId) },
      { $set: { status: 'accepted' } },
      { returnDocument: 'after' }
    );

    /* Is it ready for checkout? */ 
    // 1. When negotiation is "Accepted" and supplier "Can Deliver" 
    if (acceptedNegotiation.ok && acceptedNegotiation.value.status === 'accepted' && acceptedNegotiation.value.canDeliver) {

      const requestReadyForCheckout = await req.db
        .collection('request-metadata')
        .findOneAndUpdate(
          { groupId: ObjectId(groupId) },
          { $set: { status: 'ready-for-checkout' } },
          { returnDocument: 'after' }
        );

    }

});

export default handler;
