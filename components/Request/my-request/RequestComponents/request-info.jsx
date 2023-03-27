'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  ArrowUturnLeftIcon,
  HomeIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import inventory from 'products-json/inventory';
import { getInventoryInfo } from '@/lib/get-inventory-info';

export default function RequestInfo({ budget, request, requestMetadata }) {
  const [showItems, setShowItems] = useState(false);
  const [aticleInfo, setArticleInfo] = useState(false);

  const style = {
    transform: showItems ? 'rotate(180deg)' : '',
    transition: 'transform 150ms ease',
  };

  return (
    <>
      {/* HEADER & LINK BACKWARDS */}
      <div className="bg-white px-6 py-4 rounded-xl">
        <div className="text-gray-800 relative">
          <section>
            <Link
              className="absolute top-0 left-0 cursor-pointer"
              href={`/management/request/dashboard`}
            >
              <button>
                <ArrowUturnLeftIcon className="h-6 w-6" />
              </button>
            </Link>
            <div className="flex justify-center border-b items-start">
              <h2 className="font-semibold text-xl">Förfrågan</h2>
            </div>
          </section>
          {/* DELIVERY INFO & INFO*/}
          <section className="flex flex-col justify-end items-center mobile:flex-row">
            <ul className="flex text-sm items-center">
              <li className="rounded-3xl">
                <DocumentMagnifyingGlassIcon className="text-black h-5 w-5" />
              </li>
              <li className="p-2 rounded-3xl">
                <p className="font-light">
                  Offerter:{' '}
                  <span className="font-bold">
                    {request.negotiations.length}
                  </span>
                </p>
              </li>
              <li className="rounded-3xl p-1.5">
                <EnvelopeIcon className="text-black h-5 w-5" />
              </li>
              <li className="p-2 rounded-3xl">
                <p className="font-light">
                  Meddelanden: <span className="font-bold">0</span>
                </p>
              </li>
            </ul>
          </section>
          <section className="flex flex-col tablet:flex-row justify-between">
            <div className="w-full flex flex-col text-2xl mobile:text-3xl font-semibold text-gray-900 mobile:ml-2 mt-4 mb-4 mobile:mb-0">
              <span className="text-gray-800 font-semibold">
                {requestMetadata.projectNumber}
              </span>
              <p className="font-light mb-2 mobile:text-lg border-b">
                Totalt{' '}
                <span className="font-bold">
                  {request.request_items.length}
                </span>{' '}
                st artiklar, budget{' '}
                <span className="font-bold">{budget} kr</span>{' '}
              </p>
            </div>
          </section>
          <div>
            {request.delivery.map((data) => {
              return (
                <ul
                  key={data._id}
                  className="flex flex-col tablet:flex-row text-sm font-light items-start mb-2 p-2 gap-2 tablet:gap-6 mobile:mt-4 mobile:mb-4"
                >
                  <li className="flex">
                    <div className="flex items-start">
                      <InformationCircleIcon className="h-8 w-8 mr-4" />
                    </div>
                    <section>
                      <p className="font-bold text-sm mobile:text-lg">Info</p>
                      <p className="text-sm">
                        Märkning: {request.request_metadata.marking}
                      </p>
                      <p className="text-sm">Kontakt: {data.contactName}</p>
                    </section>
                  </li>
                  <li className="flex">
                    <div className="flex items-start">
                      <HomeIcon className="h-8 w-8 mr-4" />
                    </div>
                    <section>
                      <p className="font-bold text-sm mobile:text-lg">Adress</p>
                      {data.street ? <li>{data.street}</li> : ''}
                      {data.extraAddress ? <li>{data.extraAddress}</li> : ''}
                      {data.city && data.postalCode ? (
                        <li>
                          {data.city} {data.postalCode}
                        </li>
                      ) : (
                        ''
                      )}
                    </section>
                  </li>
                  <li className="flex">
                    <div className="flex items-start">
                      <TruckIcon className="h-8 w-8 mr-4" />
                    </div>
                    <section>
                      <p className="font-bold text-sm mobile:text-lg">
                        Leverans
                      </p>
                      <p className="text-sm">
                        Tidigast: {data.deliveryEarliest.slice(0, 10)}
                      </p>
                      <p className="text-sm">
                        Senast: {data.deliveryLatest.slice(0, 10)}
                      </p>
                      <p className="text-sm capitalize">
                        Frakt: {data.vehicleType}
                      </p>
                    </section>
                  </li>
                </ul>
              );
            })}
          </div>

          {/* DROPDOWN ARTIKLAR */}

          <div className="flex-wrap mt-2 mb-4">
            <button
              className="flex flex-row justify-center h-12 bg-gray-100 font-bold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out"
              onClick={() => setShowItems(!showItems)}
            >
              <div>{showItems ? 'Dölj' : 'Visa'} Samtliga Artiklar</div>
              <ChevronDownIcon
                className="h-5 w-5 ml-1 stroke-2"
                style={style}
              />
            </button>
          </div>

          {request.request_items.map((item) => {
            return (
              <div key={item._id}>
                {showItems ? (
                  <figure className="text-sm border-b items-center mb-4 pb-2 font-light">
                    <div className="flex mobile:flex-row justify-between">
                      <section className="flex">
                        <p className="bg-black pt-1 pb-1 px-2 mr-2 text-xs rounded-xl text-white font-bold">
                          {
                            getInventoryInfo(
                              item.category,
                              item.itemId,
                              item.fields[0].value,
                              inventory
                            ).categoryName
                          }
                        </p>
                        <p className="text-sm text-left lowercase underline">
                          {
                            getInventoryInfo(
                              item.category,
                              item.itemId,
                              item.fields[0].value,
                              inventory
                            ).inventoryName
                          }
                        </p>
                      </section>
                      <section className="flex">
                        <div className="flex">
                          <ChartBarIcon className="text-gray-700 h-5 w-5 mr-1" />
                          <p className="text-sm">{item.fields[0].value}</p> st
                        </div>
                        <div className="flex items-center ml-4">
                          <CurrencyDollarIcon className="text-gray-700 h-5 w-5 mr-1" />
                          <p className="text-sm"> {item.fields[1].value}</p> kr
                        </div>
                      </section>
                    </div>
                  </figure>
                ) : (
                  ''
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
