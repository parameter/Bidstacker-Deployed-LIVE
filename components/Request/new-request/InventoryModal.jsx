const InventoryModal = ({ inventoryOpen, addRequest, inventory }) => {

  const addReq = (event) => {
    addRequest(event.target.getAttribute('data-item-id'));
  };

  return (
    <div
      className="inventory__tree-holder"
      style={{ display: inventoryOpen ? 'block' : 'none' }}
    >
      <div className="inventory__inner">
        <input
          className="inventory__search-input"
          type="text"
          name=""
          placeholder="Sök"
        />
        <ul className="inventory__ul-top" onClick={(event) => addReq(event)}>
          {inventory.categories.map((category, i) => (
            <li key={i}>
              <div className="inventory__cat-title">{category.name}</div>
              <ul>
                {category.items.map((item, ii) => (
                  <li key={ii}>
                    <div data-item-id={item.id}>{item.name}</div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryModal;
