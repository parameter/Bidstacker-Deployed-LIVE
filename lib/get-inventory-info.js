export const getInventoryInfo = (category, itemId, itemIndex, inventory) => {
  let inventoryName = null;
  let categoryName = null;

  dance:
  for (var i = 0; i < inventory.categories.length; i++) {
    if (inventory.categories[i].category === category) {
      for (var ii = 0; ii < inventory.categories[i].items.length; ii++) {
        if (inventory.categories[i].items[ii].id === itemId) {
          inventoryName = inventory.categories[i].items[ii].products[itemIndex];
          categoryName = inventory.categories[i].name;
          break dance;
        }
      }
    }
  }

  return {
    categoryName: categoryName,
    inventoryName: inventoryName
  };
};
