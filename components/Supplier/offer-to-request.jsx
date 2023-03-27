import { React, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  ArrowUturnLeftIcon,
  HomeIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useSupplierContext } from 'context/supplier-context';
import inventory from 'products-json/inventory';
import { getInventoryInfo } from '@/lib/get-inventory-info';
import { calcSumFromOffer } from '@/lib/calc-sum-from-offer';

const OfferToRequest = (props) => {
  const { setActivePageTab, date } = useSupplierContext();
  const [canDeliver, setCanDeliver] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState("0");
  const [promisedDeliveryDay, setPromisedDeliveryDay] = useState(null);
  const [promisedDeliveryTime, setPromisedDeliveryTime] = useState(null);

  const printItemData = (item) => {
    const { categoryName, inventoryName } = getInventoryInfo(
      item.category,
      item.itemId,
      item.fields[0].value,
      inventory
    );

    return (
      <>
        <span className="font-sans bg-black pt-1 pb-1 px-2 mr-2 text-xs rounded-xl text-white font-bold">
          {categoryName}
        </span>
        <span className=" ">{inventoryName}</span>
      </>
    );
  };

  console.log({ props: props });

  let iNegotiatedThis = false;

  let deliveryEarliest;
  let deliveryLatest;

  deliveryEarliest = props.request.delivery[0].deliveryEarliest.slice(0, 10);
  deliveryLatest = props.request.delivery[0].deliveryLatest.slice(0, 10);

  let promisedDeliveryDate = `${promisedDeliveryDay} ${promisedDeliveryTime}`;

  const offerera = (event) => {
    event.preventDefault();

    axios
      .post('/api/offerera/create', {
        groupId: props.groupId,
        requestor: props.request.request_metadata.requestor,
        items: props.selectedRequestItems,
        status: 'new',
        promisedDeliveryDate: promisedDeliveryDate,
        canDeliver: canDeliver,
        deliveryFee: deliveryFee,
      })
      .then((result) => {
        console.log('offerera result', result);
        // setRequestOffered(groupId);
        // props.getMyOffers();
      })
      .catch((error) => {
        console.log('The error... ', error);
      });
  };
  const changeField = (name, selectedRequestItems, event) => {
    let id = event.target.getAttribute('data-request-item-id');
    selectedRequestItems[id][name] = event.target.value;
  };

  return (
    <div className="w-full bg-gray-100 px-4 py-10">
      <div className="max-w-[800px] bg-white rounded-xl pt-10 mx-auto">
        <div className="px-10">
          <div className="border-b-2 pb-2 mb-2">
            <a onClick={() => setActivePageTab(0)}>
              <ArrowUturnLeftIcon className="w-9 mb-10 cursor-pointer font-bold" />
            </a>
            <div className="flex justify-between">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Lämna offert</h1>
                <p className="font-bold">DATUM {date}</p>
              </div>
              <div className="mt-10">
                <Link href={'/'}>
                  <span className="bg-gray-100 rounded-md p-1 text-semibold">
                    Customer profile
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex bg-gray-light rounded-md">
              <p className="flex-auto w-72 rounded-md p-2 font-bold">
                Artiklar
              </p>
              <p className="flex-auto w-72 rounded-md p-2 font-bold">
                Antalförslag
              </p>
              <p className="flex-auto w-32 rounded-md p-2 font-bold">
                Prisförslag
              </p>
            </div>
            {props.request.request_items.map((item) => {
              if (Object.keys(props.selectedRequestItems).includes(item._id)) {
                return (
                  <div
                    key={item._id}
                    className="flex bg-green-100 rounded-md my-2"
                  >
                    <p className="rounded-md p-2 flex-auto w-72">
                      {printItemData(item)}
                    </p>

                    {item.fields.map((field, ii) => {
                      if (field.name === 'budget') {
                        return (
                          <div className="p-2 flex-auto w-32" key={ii}>
                            <input
                              onChange={(event) =>
                                changeField(
                                  'offeredPrice',
                                  props.selectedRequestItems,
                                  event
                                )
                              }
                              className="w-1/2 h-fit border-solid border-2 border-slate-300 bg-green-100 rounded-md px-1"
                              data-request-item-id={item._id}
                              type="text"
                              defaultValue={field.value}
                              name={field.name}
                            />
                          </div>
                        );
                      } else if (field.name === 'quantity') {
                        return (
                          <div className="flex flex-auto w-72" key={ii}>
                            <input
                              onChange={(event) =>
                                changeField(
                                  'offeredQuantity',
                                  props.selectedRequestItems,
                                  event
                                )
                              }
                              className="peer h-fit border-solid border-2 border-slate-300 bg-green-100 rounded-md px-1 my-2"
                              data-request-item-id={item._id}
                              type="number"
                              defaultValue={field.value}
                              min="1"
                              max={field.value}
                              name={field.name}
                            />
                            <p className="invisible peer-invalid:visible my-2 mx-2 text-red text-[.6em]">
                              Value must be less than or equal to {field.value}.
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              }
            })}

            {iNegotiatedThis === false && (
              <form className="border-t-2 pt-4">
                <div className="grid grid-cols-2 gap-x-6 my-4 border-b-2 py-2">
                  <div className="">
                    <div className="flex items-center mb-2">
                      <HomeIcon className="text-gray-700 h-7 w-7" />
                      <p className="ml-2 font-bold">Address:</p>
                    </div>
                    <p className="">{props.request.delivery[0].street}</p>
                    <p className="">{props.request.delivery[0].postalCode}</p>
                    <p className="">{props.request.delivery[0].city}</p>
                  </div>
                  <div className="">
                    <div className="flex items-center mb-2">
                      <TruckIcon className="text-gray-700 h-7 w-7" />
                      <p className="ml-2 font-bold">Leverans:</p>
                    </div>
                    <p className="mb-1">Kunden vill ha leverans mellan</p>
                    <p>
                      <span className="font-semibold bg-gray-light rounded-md p-1 my-2">
                        {deliveryEarliest}
                      </span>{' '}
                      -{' '}
                      <span className="font-semibold bg-gray-light rounded-md p-1 my-2">
                        {deliveryLatest}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex my-4 border-b-2 py-2">
                  <div className="flex-1 ">
                    <p className="font-bold">Leveransförslag:</p>
                    <input
                      className="font-semibold w-auto border-solid border-2 border-slate-300 bg-green-100 rounded-md px-1 my-2"
                      onChange={(event) =>
                        setPromisedDeliveryDay(event.target.value)
                      }
                      type="date"
                      name="promiseddeliveryday"
                      min={deliveryEarliest}
                      max={deliveryLatest}
                      required
                    />{' '}
                    <input
                      className="font-semibold w-auto border-solid border-2 border-slate-300 bg-green-100 rounded-md px-1 my-2"
                      type="time"
                      onChange={(event) =>
                        setPromisedDeliveryTime(event.target.value)
                      }
                      name="promiseddeliverytime"
                    ></input>
                    <div className="flex gap-2">
                      <p className="font-bold">Kan leverera:</p>
                      <input
                        className="font-semibold w-auto border-solid border-2 border-slate-300 bg-green-100 rounded-md"
                        onChange={(event) => {
                          setCanDeliver(event.target.checked);
                        }}
                        type="checkbox"
                        name="can-deliver"
                        min={deliveryEarliest}
                        max={deliveryLatest}
                      />
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Leveransavgift:</p>
                      <input
                        defaultValue="0"
                        onChange={(event) => setDeliveryFee(event.target.value)}
                        className="w-1/6 h-fit border-solid border-2 border-slate-300 bg-green-100 rounded-md px-1"
                        type="text"
                        name="delivery-fee"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-bold">Orderkostnad =</p>
                      <p className="font-bold">
                        {calcSumFromOffer(
                          Object.values(props.selectedRequestItems)
                        )}{' '}
                        kr
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Leveransavgift =</p>
                      <p className="font-bold">{deliveryFee} kr</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Avgift till Bidstacker =</p>
                      <p className="font-bold">1000 kr</p>
                    </div>
                    <div className="border-t-2 my-2 py-2 flex justify-between">
                      <p className="font-bold text-lg ml-auto">
                        Totalt kostnad =
                      </p>
                      <p className="font-bold text-lg ml-2">155000 kr</p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h4 className="ml-2 font-bold">Storlek på schubanget?</h4>
                  <div className="flex flex-row">
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Pall
                        <input type="radio" name="size" value="pall" />
                      </label>
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Paket
                        <input type="radio" name="size" value="paket" />
                      </label>
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Påse
                        <input type="radio" name="size" value="pase" />
                      </label>
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Skrin
                        <input type="radio" name="size" value="skrin" />
                      </label>
                  </div>
                  <h4 className="ml-2 font-bold">Vad snackar vi om för tid?</h4>
                  <div className="flex flex-row">
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Express (inom 2h)
                        <input type="radio" name="urgency" value="express" />
                      </label>
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Arbetsdag (inom 5h)
                        <input type="radio" name="urgency" value="workday" />
                      </label>
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        Inom 1 -2 dagar
                        <input type="radio" name="urgency" value="halfweek" />
                      </label>
                      <label className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4 border-2 aspect-square">
                        När det går bra
                        <input type="radio" name="urgency" value="whenever" />
                      </label>
                  </div>
                </div>

                <div className="flex justify-center pb-8">
                  <button
                    onClick={(event) => {
                      offerera(event);
                      setActivePageTab(2);
                    }}
                    type="button"
                    className="mt-[70px] transition duration-300 ease-in-out bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl hover:rounded-full"
                  >
                    Offerera
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferToRequest;
