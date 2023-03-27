'use client';
import { calcSumFromOffer } from '@/lib/calc-sum-from-offer';
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  InformationCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useSupplierContext } from 'context/supplier-context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OfferDetailsItem from './offer-details-item';

const OfferDetails = ({ params, groupId }) => {
  const { myNegotiations } = useSupplierContext();
  const [showInfo, setShowInfo] = useState(false);
  console.log('myNegotiationDetails', myNegotiations[params]);

  const deliveryDate = new Date(
    myNegotiations[params].negotiations[0].promisedDeliveryDate
  );

  return (
    <div className="max-w-[800px] bg-white rounded-xl py-10 mx-auto">
      <div className="flex flex-col justify-center px-10">
        <div className="">
          <Link
            className="cursor-pointer"
            href={`/management/supplier/my-offers`}
          >
            <ArrowUturnLeftIcon className="w-9 mb-10 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-800">
            Offert <span className="font-bold">F2354</span>
          </h1>
          <div className="bg-slate-100 p-4 my-16 rounded-lg">
            <div className="mb-4">
              <div className="flex bg-gray-200 rounded-md border">
                <p className="rounded-md p-2 flex-auto w-72 font-bold">
                  Artiklar
                </p>
                <p className="flex-auto w-22 rounded-md p-2 font-bold">Antal</p>
                <p className="flex-auto w-22 rounded-md p-2 font-bold">Pris</p>
              </div>
              {myNegotiations[params].request_items.map((item, index) => {
                return (
                  <OfferDetailsItem
                    key={index}
                    item={item}
                    negotiation={myNegotiations[params]}
                    itemId={myNegotiations[params].negotiations[0]._id}
                    params={params}
                  />
                );
              })}

              <div className="py-2">
                <div className="flex justify-end mr-10 mt-4 pt-4 text-md border-t-4">
                  <span className="font-semibold mr-6">Orderkostnad:</span>{' '}
                  {calcSumFromOffer(
                    myNegotiations[params].negotiations[0].items
                  )}{' '}
                  kr
                </div>
                <div className="flex justify-end mr-10  text-md">
                  <span className="font-semibold mr-6">Leveranskostnad:</span>{' '}
                  {myNegotiations[params].negotiations[0].deliveryFee} kr
                </div>
                <div className="flex justify-end mr-10 text-md">
                  <span className="font-semibold mr-6">
                    Avgift till Bidstacker:
                  </span>{' '}
                  800 kr
                </div>
                <div className="flex justify-end mr-10 mt-4 pt-4 text-md border-t-4">
                  <span className="font-semibold mr-6">Total kostnad:</span>{' '}
                  5000 kr
                </div>
              </div>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="mt-8 border-2 border-orange p-1 rounded-lg hover:rounded-full w-full font-semibold bg-orange"
              >
                {showInfo ? (
                  <div className="flex justify-center items-center">
                    <span>Mindre information</span>
                    <ChevronUpIcon className="h-4 w-4 ml-4" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <span>Mer information</span>
                    <ChevronDownIcon className="h-4 w-4 ml-4" />
                  </div>
                )}
              </button>
            </div>
            {showInfo && (
              <div className="flex justify-around gap-5 my-4">
                <div>
                  <div className="flex items-center mb-4">
                    <InformationCircleIcon className="text-gray-700 h-8 w-8" />
                    <p className="font-bold ml-1">Info</p>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Datum:</span>{' '}
                    <span className="ml-1">
                      {myNegotiations[params].negotiations[0].createdAt.slice(
                        0,
                        10
                      )}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Marking:</span>{' '}
                    <span className="ml-1">
                      {myNegotiations[params].request_metadata?.marking}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Kontakt:</span>{' '}
                    <span className="ml-1">
                      {myNegotiations[params].delivery[0].contactName}
                    </span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <TruckIcon className="text-gray-700 h-8 w-8" />
                    <p className="font-bold ml-1">Leverans </p>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Leveransdatum:</span>{' '}
                    <span className="ml-1">
                      {deliveryDate.toLocaleString('sv-SE', {
                        timeZone: 'Europe/Stockholm',
                      })}
                    </span>
                  </p>

                  <p className="text-sm">
                    <span className="font-semibold">Leveranssätt:</span>{' '}
                    <span className="ml-1">
                      {myNegotiations[params].delivery[0].deliveryType}
                    </span>
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <HomeIcon className="text-gray-700 h-7 w-7" />
                    <p className="font-bold ml-1">Address </p>
                  </div>
                  <p className="text-sm">
                    {myNegotiations[params].delivery[0].street}
                  </p>
                  <p className="text-sm">
                    {myNegotiations[params].delivery[0].postalCode}
                  </p>
                  <p className="text-sm">
                    {myNegotiations[params].delivery[0].city}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col my-4">
          <h2 className="text-xl font-bold py-2 border-b my-6">Meddelanden</h2>
          <textarea
            className="bg-[#e5e5e5] w-96 h-40 border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-1 mobile:text-sm"
            placeholder="Här kan du lämna ett meddelande till förfrågaren"
          ></textarea>
          <button className="border-2 border-orange p-1 rounded-lg hover:rounded-full w-full font-semibold my-4 bg-orange">
            Visa alla meddelanden
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
