export const offerCheck = (request, negotiationId) => {
  if (!request || !negotiationId) return;
  const deliveryNegotiation = request.negotiations.find(
    (item) => item._id === negotiationId
  );

  const date = new Date(deliveryNegotiation.promisedDeliveryDate);
  const start = new Date(request.delivery[0].deliveryEarliest);
  const end = new Date(request.delivery[0].deliveryLatest);

  if (date > start && date < end) {
    return true;
  } else {
    return false;
  }
};
