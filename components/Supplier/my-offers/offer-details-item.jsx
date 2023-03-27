import { getNegotiationItems } from '@/lib/get-negotiation-items';
import useInventoryInfo from '@/lib/request-hooks/useInventoryInfo';

const OfferDetailsItem = ({ negotiation, itemId, item }) => {
  const negotiationItems = getNegotiationItems(negotiation, itemId);
  const { categoryName, inventoryName } = useInventoryInfo(
    item.category,
    item.itemId,
    item.fields[0].value
  );
  // console.log('negotiationItem', negotiationItems);
  // console.log('negotiation', negotiation);
  // console.log('item', item);

  return (
    <>
      {negotiationItems && item.negotiation !== undefined && (
        <div key={item._id} className="flex bg-green-100 rounded-md my-2">
          <p className="rounded-md p-2 flex-auto w-72">
            <span className="bg-black pt-1 pb-1 px-2 mr-2 text-xs rounded-xl text-white font-bold">
              {categoryName}
            </span>
            <span className="capitalize">{inventoryName}</span>
          </p>
          <p className="rounded-md p-2 flex-auto w-22">
            {item?.negotiation?.offeredQuantity} st
          </p>
          <p className="rounded-md p-2 flex-auto w-22">
            {item?.negotiation?.offeredPrice} kr
          </p>
        </div>
      )}
    </>
  );
};

export default OfferDetailsItem;
