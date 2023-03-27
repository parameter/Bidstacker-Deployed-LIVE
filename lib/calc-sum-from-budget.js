export const calcSumFromBudget = (items) => {
  return items?.reduce(
    (total, item) => parseInt(total) + parseInt(item.fields[2].value),
    0
  );
};
