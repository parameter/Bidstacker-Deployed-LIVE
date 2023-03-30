import { regexpCode } from 'ajv/dist/compile/codegen';
import { ObjectId } from 'mongodb';
import { ObjectModel, ArrayModel } from 'objectmodel';
import sanitizer from 'sanitizer';
import validator from 'validator';
import { adressToCoordinates} from "../../components/Map/geolocationUtils"

export async function getRequests(db, postId, before, limit = 10) {}

export async function insertRequest({
  db,
  groupId,
  request_metadata,
  request_items,
  delivery,
  latitude,
  longitude,

}) {
  /* 
     TODO 
       # Lägg till att fält är required 
       # Lägg till errorhantering, kanske i OBjectModel.js prototypes 
       # som här https://objectmodel.js.org/docs/v2/#doc-custom-collectors 
       # Förmodligen vill vi ha en logg som error hamnar i men också ett mail förmodligen 
       # return something, right? some errors and the no errors glad tidings message
  */

  // sanitizer.escape('your dirty string');
  // validator.isMongoId()
  // ObjectID.isValid("5e63c3a5e4232e4cd0274ac2")

  /*
  if (
    false === ObjectId.isValid(request_metadata.requestor) ||
    false === ObjectId.isValid(groupId)
  ) {
    console.log('THROW WARNING');
    return;
  }
  */

  /* REQUEST-METADATA */

  /* The Model */
  const RequestMetadataModel = new ObjectModel({
    requestor: Object,
    groupId: Object,
    status: String,
    projectNumber: String,
    marking: String,
    requestDescription: String,
    createdAt: Date,
  });

  /* The adding of data to the Models */
  const RequestMetadata = new RequestMetadataModel({
    requestor: request_metadata.requestor,
    status: sanitizer.escape(request_metadata.status),
    groupId: groupId,
    projectNumber: sanitizer.escape(request_metadata.projectNumber),
    marking: sanitizer.escape(request_metadata.marking),
    requestDescription: sanitizer.escape(request_metadata.requestDescription),
    createdAt: new Date(),
  });

  /* REQUEST-ITEMS */

  /* The Models */
  const RequestFieldsModel = new ArrayModel({
    name: String,
    value: String,
  });

  const RequestItemModel = new ObjectModel({
    groupId: Object,
    itemId: String,
    fields: RequestFieldsModel,
    category: new RegExp('^cat[a-zA-Z0-9]{4,8}$'),
  });

  /* The adding of data to the Models */
  var _requests = [];

  request_items.forEach((item) => {
    const Request = new RequestItemModel({
      groupId: groupId,
      category: sanitizer.escape(item.category),
      itemId: sanitizer.escape(item.itemId),
      fields: new RequestFieldsModel(
        item.fields.map((field) => {
          return {
            name: sanitizer.escape(field.name),
            value: sanitizer.escape(field.value),
          };
        })
      ),
    });

    if (Request) {
      _requests.push(Request);
    }
  });

  /* DELIVERIES */

  /* The Model */
  const DeliveryModel = new ObjectModel({
    groupId: Object,
    deliveryType: String,
    deliveryEarliest: Date,
    deliveryLatest: Date,
    vehicleType: String,
    contactName: String,
    contactNumber: String,
    street: String,
    extraAddress: String,
    postalCode: String,
    city: String,
    location: {
      type: String,
      coordinates: Array,
    },
  });

  // Get coordinates for the address
  const address = delivery.street + ', ' + delivery.postalCode + ', ' + delivery.city;
  const coordinates = await adressToCoordinates(address);
  console.log('coordinates:', coordinates);
  if (!coordinates) {
    throw new Error("Failed to get coordinates for address");
  }



  /* The adding of data to the Models */
  const delivery_ = new DeliveryModel({
    groupId: groupId,
    deliveryType: sanitizer.escape(delivery.deliveryType),
    deliveryEarliest: new Date(sanitizer.escape(delivery.deliveryEarliest)),
    deliveryLatest: new Date(sanitizer.escape(delivery.deliveryLatest)),
    vehicleType: sanitizer.escape(delivery.vehicleType),
    contactName: sanitizer.escape(delivery.contactName),
    contactNumber: sanitizer.escape(delivery.contactNumber),
    street: sanitizer.escape(delivery.street),
    extraAddress: sanitizer.escape(delivery.extraAddress),
    postalCode: sanitizer.escape(delivery.postalCode),
    city: sanitizer.escape(delivery.city),
    location: {
      type: 'Point',
      coordinates: [coordinates.lon, coordinates.lat],
    },
  });

  /* The putting of the datas into the mongo */
  const request_metadata_response = await db
    .collection('request-metadata')
    .insertOne(RequestMetadata);
  const request_response = await db
    .collection('request-items')
    .insertMany(_requests);
  const delivery_response = await db
    .collection('deliveries')
    .insertOne(delivery_);
}
