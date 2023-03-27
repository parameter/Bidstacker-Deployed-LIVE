export const calcSumFromOffer = (items) => {
  return items.reduce(
    (total, item) => parseInt(total) + parseInt(item.offeredPrice),
    0
  );
};
