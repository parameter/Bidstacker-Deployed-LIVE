export const getNegotiationItems = (request, negotiationId) => {
  // Group all requests_items with the matching negotiation items and save them in a variable

  if(!request || !negotiationId) return;
  var request_items = request.request_items;
  var negotiated_items = request.negotiations.filter(
    (item) => item._id === negotiationId
  )[0].items;

  request_items.forEach((request_item) => {
    request_item.negotiation = negotiated_items.filter(
      (item) => item.request_item_id === request_item._id
    )[0];
  });

  return request_items;
};
