'use client';
import {
  ChartBarIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import useInventoryInfo from '@/lib/request-hooks/useInventoryInfo';

const OfferItem = ({ item }) => {
  const { categoryName, inventoryName } = useInventoryInfo(
    item.category,
    item.itemId,
    item.fields[0].value
  );
  return (
    /* Artiklar */
    <>
      <section
        key={item._id}
        className="grid grid-cols-2 grid-rows-2 gap-2 mb-2"
      >
        <article className="col-span-2 bg-gray-100 rounded-lg pl-2">
          <div
            className={`" flex items-center py-2 rounded-lg ${
              item.negotiation === undefined ? 'bg-red-100' : 'bg-green-50'
            } "`}
          >
            <p className="bg-black pt-1 pb-1 px-2 mr-2 text-xs rounded-xl text-white font-bold">
              {categoryName}
            </p>
            <p
              className={`"text-left lowercase ${
                item.negotiation === undefined ? 'font-bold' : 'font-base'
              } "`}
            >
              {inventoryName}
            </p>
            <InformationCircleIcon className="w-6 h-6 cursor-pointer ml-1" />
            <div className="absolute -top-[50px] right-26 flex-col items-center hidden">
              <span className="relative w-[300px] z-10 p-4 text-xs text-white bg-black shadow-lg rounded">
                - Artikelinfo
              </span>
              <div className="hidden desktop:block w-3 h-3 -mt-2 rotate-45 bg-black"></div>
            </div>
          </div>
        </article>

        {/* Pris */}

        <figure
          className={`" flex items-center px-2 rounded-lg ${
            item.negotiation === undefined ||
            item.fields[2].value < item.negotiation.offeredPrice
              ? 'bg-red-100 border-1 border-green-600'
              : 'bg-green-100'
          } "`}
        >
          <div className="flex items-center">
            <CurrencyDollarIcon className="text-gray-800 mr-1 h-6 w-6" />
            {item.negotiation === undefined ? (
              <p className="font-bold">0 kr</p>
            ) : (
              <p
                className={`" text-left ${
                  item.fields[2].value < item.negotiation.offeredPrice
                    ? 'font-bold'
                    : 'font-base'
                } "`}
              >
                {item.negotiation.offeredPrice}kr
                {/* <span className="font-light text-sm">
                    ({item.fields[2].value})
                </span> */}
              </p>
            )}
          </div>
        </figure>

        {/* Antal */}

        <figure
          className={`" flex items-center px-2 py-2 rounded-lg ${
            item.negotiation === undefined ||
            item.fields[1].value != item.negotiation.offeredQuantity
              ? 'bg-red-100'
              : 'bg-green-100'
          } "`}
        >
          <div className="flex items-center">
            <ChartBarIcon className="text-gray-700 h-5 w-5 mr-1" />
            <p
              className={`" text-left ${
                item.negotiation === undefined ? 'font-bold' : 'font-base'
              } "`}
            >
              {item.negotiation === undefined
                ? 0
                : item.negotiation.offeredQuantity}{' '}
              st ({item.fields[1].value})
            </p>
          </div>
        </figure>
      </section>
    </>
  );
};

export default OfferItem;
