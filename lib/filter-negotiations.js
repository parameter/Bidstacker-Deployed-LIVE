import _ from 'underscore';

const filterNegotiations = (data) => {
  // Group all offers by groupId and save them in a variable
  let groupedNegotiations = _.groupBy(data.negotiations, 'groupId');

  Object.keys(groupedNegotiations || {}).forEach((groupId) => {
    const deliveries = data.deliveries.filter(
      (item) => item.groupId === groupId
    );

    const request_metadata = data.request_metadata.filter(
      (item) => item.groupId === groupId
    );

    const negotiations = data.negotiations.filter(
      (item) => item.groupId === groupId
    );

    const request_items = data.request_items.filter(
      (item) => item.groupId === groupId
    );

    groupedNegotiations[groupId] = {
      request_metadata: request_metadata[0],
      request_items: request_items,
      delivery: deliveries,
      negotiations: negotiations,
    };
  });

  return groupedNegotiations;
};

export default filterNegotiations;
