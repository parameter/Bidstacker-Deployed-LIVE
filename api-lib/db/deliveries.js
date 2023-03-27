import { ObjectId } from 'mongodb';

// export async function getActiveDeliveries(db, id) {
//   return db
//     .collection('deliveries')
//     .findAll({ _id: id })
//     .then((result) => {
//       console.log(result);
//       return result;
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// }

// const { MongoClient } = require('mongodb');

// export async function getAllDeliveries(dbName) {
//   const client = await MongoClient.connect('mongodb://localhost:27017');
//   const db = client.db(dbName);
//   const collection = db.collection('delivery');
//   const deliveries = await collection.find().toArray();
//   client.close();
//   return deliveries;
// }
// const deliveries = await getAllDeliveries('mydatabase');
// console.log(deliveries);

// deliveries.forEach((delivery) => {
//   console.log(delivery);
// });
