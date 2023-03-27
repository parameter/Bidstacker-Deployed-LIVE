'use client';

import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import Link from 'next/link';
import Image from 'next/image';
import karta from '../../public/images/karta.jpg';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import OfferSuccess from './offer-success';
import { useSupplierContext } from 'context/supplier-context';
import OfferToRequest from './offer-to-request';
import RequestComp from './request-component.jsx';
import { calcSumFromBudget } from '@/lib/calc-sum-from-budget';
import { useRouter } from 'next/router';

const RequestDetails = ({
  groupId,
  params,
  addRemoveSelectedRequestItem,
  selectedRequestItems,
  setSelectedRequestItems,
}) => {
  const { requests, activePageTab, setActivePageTab, date } = useSupplierContext();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  // Redirect if request is undefined
  useEffect(() => {
    if (typeof requests[params] === 'undefined') {
      router.push('/management/supplier/supplier-requests');
    }
  }, [router, requests, params]);

  if (typeof requests[params] === 'undefined') {
    return <div></div>;
  }

  return (
    <>
      {activePageTab === 0 && (
        <div className="w-full bg-gray-100 px-4 py-10">
          <div className="max-w-[800px] bg-white rounded-xl pt-10 mx-auto">
            <div className="px-10">
              <div className="mb-6">
                <Link href={'/management/supplier/supplier-requests'}>
                  <ArrowUturnLeftIcon className="w-9 mb-10 cursor-pointer" />
                </Link>
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                  Lämna offert för{' '}
                  <span className="text-3xl">
                    {requests[params].request_metadata.marking}
                  </span>
                </h1>
                <p className="font-bold border-b-2 pb-2 pt-8">DATUM {date}</p>
              </div>

              <div className="flex justify-around gap-x-6">
                <div>
                  <p className="text-xl font-bold pt-4">
                    {requests[params].request_items.length} Artiklar
                  </p>
                  <p className="text-sm">
                    Ordervärde:{' '}
                    {calcSumFromBudget(requests[params].request_items)} SEK
                  </p>
                  <div className="mt-5">
                    <u className="no-underline text-xs text-zinc-700">
                      <li>{requests[params].delivery[0].city}</li>
                      <li>{requests[params].delivery[0].deliveryType}</li>
                      <li>EF 1-5 anställda</li>
                    </u>
                  </div>
                </div>

                <div className="bg-white w-28 h-20 my-3 flex justify-center rounded-lg">
                  <Image src={karta} alt="Map"></Image>
                </div>
              </div>

              <div className="my-12">
                <div>
                  <div className="flex bg-gray-light rounded-md">
                    <p className="rounded-md p-2 flex-auto w-72 font-bold">
                      Artiklar
                    </p>
                    <p className="font-bold rounded-md p-2 flex-auto w-32">
                      Antal
                    </p>
                    <p className="font-bold rounded-md p-2 flex-auto w-32">
                      Pris
                    </p>
                    <p className="font-bold flex justify-around items-center flex-auto w-32">
                      I lager
                    </p>
                  </div>
                  {requests[params].request_items.map((item, index) => {
                    return (
                      <RequestComp
                        key={index}
                        item={item}
                        request={requests[params]}
                        setActivePageTab={setActivePageTab}
                        addRemoveSelectedRequestItem={
                          addRemoveSelectedRequestItem
                        }
                        setIsChecked={setIsChecked}
                        isChecked={isChecked}
                        selectedRequestItems={selectedRequestItems}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl font-bold py-4">Lämna ett meddelande</h2>
                <textarea
                  className="bg-gray-lighter w-96 h-40 border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 focus:ring-1 mobile:text-sm"
                  placeholder="Här kan du lämna ett meddelande till förfrågaren"
                ></textarea>
              </div>
              <div className="flex justify-center pb-8">
                <button
                  type="button"
                  onClick={() => setActivePageTab(1)}
                  className="mt-[70px] transition duration-300 ease-in-out bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl hover:rounded-full"
                >
                  Nästa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activePageTab === 1 && (
        <OfferToRequest
          request={requests[groupId]}
          groupId={groupId}
          setSelectedRequestItems={setSelectedRequestItems}
          selectedRequestItems={selectedRequestItems}
        />
      )}

      {activePageTab === 2 && <OfferSuccess />}
    </>
  );
};

export default RequestDetails;
