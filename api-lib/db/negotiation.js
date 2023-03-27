import { ObjectId } from 'mongodb';
import { ObjectModel, ArrayModel } from 'objectmodel';
import sanitizer from 'sanitizer';

export async function insertNegotiation({
  db,
  groupId,
  requestor,
  offererId,
  promisedDeliveryDate,
  status,
  items,
  canDeliver,
  deliveryFee
}) {
  /* The Models */
  const NegotiationItemsModel = new ArrayModel({
    request_item_id: String,
    offeredQuantity: String,
    offeredPrice: String
  });

  const NegotiationModel = new ObjectModel({
    groupId: Object,
    requestor: Object,
    offererId: Object,
    items: NegotiationItemsModel,
    status: String,
    promisedDeliveryDate: Date,
    canDeliver: Boolean,
    deliveryFee: String,
    createdAt: Date
  });

  /* The adding of data to the Models */
  const Negotiation = new NegotiationModel({
    groupId: groupId,
    requestor: requestor,
    offererId: offererId,
    items: new NegotiationItemsModel(
      items.map((item) => {
        return {
          request_item_id: item.request_item_id,
          offeredQuantity: sanitizer.escape(item.offeredQuantity),
          offeredPrice: sanitizer.escape(item.offeredPrice),
        };
      })
    ),
    status: sanitizer.escape(status),
    promisedDeliveryDate: new Date(sanitizer.escape(promisedDeliveryDate)),
    canDeliver: (sanitizer.escape(canDeliver) === 'true'),
    deliveryFee: sanitizer.escape(deliveryFee),
    createdAt: new Date()
  });

  /* The putting of the datas into the mongo */
  const negotiation_response = await db
    .collection('negotiation')
    .insertOne(Negotiation);
}
