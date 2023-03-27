import inventory from 'products-json/inventory';
import { getInventoryInfo } from '@/lib/get-inventory-info';
import useInventoryInfo from '@/lib/request-hooks/useInventoryInfo';

const Request = (props) => {
  const handleOnChange = (id, quantity, budget) => {
    props.setIsChecked((prevState) => !prevState);
    props.addRemoveSelectedRequestItem(id, quantity, budget);
  };

  const { categoryName, inventoryName } = useInventoryInfo(
    props.item.category,
    props.item.itemId,
    props.item.fields[0].value
  );

  return (
    <>
      <div className="w-full text-gray-900 text-sm border-t-2 border-b-2 py-2 my-2 hover:bg-gray-100">
        <div className="flex bg-gray-light rounded-md">
          <p className="rounded-md p-2 flex-auto w-72">
            <span className="bg-black pt-1 pb-1 px-2 mr-2 text-xs rounded-xl text-white font-bold">
              {categoryName}
            </span>
            <span className="capitalize">{inventoryName}</span>
          </p>

          <p className="rounded-md p-2 flex-auto w-32">
            {props.item.fields[1].value} st
          </p>
          <p className="rounded-md p-2 flex-auto w-32">
            {props.item.fields[2].value} SEK
          </p>

          <div className="flex justify-around flex-auto w-32">
            <input
              type="checkbox"
              id="checkbox"
              value={props.item._id}
              onChange={() =>
                handleOnChange(
                  props.item._id,
                  props.item.fields[1].value,
                  props.item.fields[2].value
                )
              }
              checked={Object.keys(props.selectedRequestItems).includes(
                props.item._id
              )}
              name={props.item._id}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
