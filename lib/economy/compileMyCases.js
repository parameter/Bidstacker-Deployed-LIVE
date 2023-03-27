import _ from 'underscore';

const compileMyCases = (data) => {

  let groupedCases = _.groupBy(data.requests, 'groupId');

  Object.keys(groupedCases || {}).forEach((groupId) => {
    const negotiation = data.negotiations.filter((item) => item.groupId === groupId)[0];
    groupedCases[groupId] = {
        ...groupedCases[groupId][0],
        ...negotiation
    };
  });

  return groupedCases;
};

export default compileMyCases;