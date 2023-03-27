import _ from 'underscore';

export const filterRequests = (data) => {
  // Group all requests by groupId and save them in a variable
  let groupedRequests = _.groupBy(data.request_items, 'groupId');

  Object.keys(groupedRequests || {}).forEach((groupId) => {
    const deliveries = data.deliveries.filter(
      (item) => item.groupId === groupId
    );

    const request_metadata = data.request_metadata.filter(
      (item) => item.groupId === groupId
    );

    const negotiations = data.negotiations.filter(
      (item) => item.groupId === groupId
    );

    groupedRequests[groupId] = {
      request_metadata: request_metadata[0],
      request_items: groupedRequests[groupId],
      delivery: deliveries,
      negotiations: negotiations,
    };
  });
  return groupedRequests;
};
