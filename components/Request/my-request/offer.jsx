'use client';
import Link from 'next/link';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useCallback } from 'react';
import { getNegotiationItems } from '@/lib/get-negotiation-items';
import { offerCheck } from '@/lib/offer-check';
import axios from 'axios';
import NewRequest from '../new-request/new-request';
import Header from '@/components/Request/dashboard/header';
import OfferStatus from './OfferComponents/offer-status';
import OfferItem from './OfferComponents/offer-item';
import OfferChecklist from './OfferComponents/offer-checklist';
import OfferBudget from './OfferComponents/offer-budget';
import AcceptButton from './OfferComponents/offer-accept-button';

const Offer = ({ params, request, groupId }) => {
  const [loading, setLoading] = useState(false);
  const [uncompleted, setUncompleted] = useState(false);
  const [priceDeviation, setPriceDeviation] = useState(false);
  const [amountDeviation, setAmountDeviation] = useState(false);
  const negotiationItems = getNegotiationItems(request, params[1]);
  const deliveryDate = offerCheck(request, params[1]);
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [restItems, setRestItems] = useState([]);
  const [amountDeviationValue, setAmountDeviationValue] = useState([]);
  const restData = { items: restItems, delivery: request.delivery };

  console.log('negotiationItems', negotiationItems);

  // Get all requests that are not negotiated in order to make a new request
  const getRestItems = useCallback(() => {
    let _restItems = [];
    let notNegotiatedItems = [];
    negotiationItems.forEach((item) => {
      if (
        item.negotiation === undefined ||
        item.fields[1].value != item.negotiation.offeredQuantity
      ) {
        amountDeviationValue.push(
          item.fields[1].value - item?.negotiation?.offeredQuantity
        );

        notNegotiatedItems.push(item._id);
        setAmountDeviationValue(amountDeviationValue);
      }
    });
    Object.keys(request.request_items).forEach((key) => {
      notNegotiatedItems.forEach((item) => {
        if (request.request_items[key]._id === item) {
          _restItems.push(request.request_items[key]);
        }
      });
    });
    setRestItems(_restItems);
  }, [negotiationItems, request, setRestItems, amountDeviationValue]);

  const currentOfferStatus = useCallback(() => {
    request.negotiations.map((item, index) => {
      console.log(item);
      if (item._id === params[1]) {
        if (index !== 0 && request.negotiations[0].status === 'accepted')
          setStatus('rejected');
        else setStatus(item.status);
      }
    });
  }, [request.negotiations, params, setStatus]);

  useEffect(() => {
    if (!request) return;
    getRestItems();

    negotiationItems.map((item) => {
      if (item.negotiation === undefined) {
        setUncompleted(true);
      }
      if (
        item.negotiation === undefined ||
        item.fields[2].value < item.negotiation.offeredPrice
      ) {
        setPriceDeviation(true);
      }
      if (item.fields[1].value != item?.negotiation?.offeredQuantity) {
        setAmountDeviation(true);
      }
    });
    currentOfferStatus();
    setLoading(false);
  }, [
    request,
    params,
    groupId,
    getRestItems,
    negotiationItems,
    currentOfferStatus,
  ]);

  const acceptOffer = async () => {
    const res = await axios.post('/api/offerera/accept', {
      offerId: params[1],
      groupId: groupId,
    });
  };

  const getOfferBudget = () => {
    let offerBudget = 0;
    negotiationItems.map((item) => {
      if (
        !(item.negotiation === undefined) &&
        !isNaN(item.negotiation.offeredPrice)
      ) {
        offerBudget += parseFloat(item.negotiation.offeredPrice);
      }
    });
    return offerBudget;
  };

  const getTotalOfferBudget = () => {
    // 200 is a made up delivery cost
    let totalBudget = getOfferBudget() + 200;
    return totalBudget;
  };

  return (
    <>
      <Header />
      {newRequestOpen ? (
        <NewRequest
          restData={restData}
          amountDeviationValue={amountDeviationValue}
        />
      ) : (
        <>
          {/* HEADER & LINK BACKWARDS */}

          <div className="rounded-xl gap-2 px-4 mobile:px-10 pb-8">
            <div className="bg-white px-6 py-4 rounded-xl">
              <section className="relative text-gray-800">
                <Link
                  className="absolute top-0 left-0 cursor-pointer"
                  href={`/management/request/my-requests/${groupId}`}
                >
                  <button>
                    <ArrowUturnLeftIcon className="h-6 w-6" />
                  </button>
                </Link>
                <div className="flex justify-center border-b items-start">
                  <h2 className="font-semibold text-xl">Offert</h2>
                </div>
              </section>

              {/* OFFER STATUS */}

              <OfferStatus status={status} />

              {/* COLLECT BUTTON */}

              <section className="w-full px-0 mobile:px-6 pb-6 text-lg font-light">
                {(request.negotiations[0].items.length !==
                  request.request_items.length ||
                  amountDeviation) &&
                  request.negotiations[0].status === 'accepted' && (
                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setNewRequestOpen(true);
                        }}
                        className="w-fit transition duration-300 ease-in-out bg-orange font-semibold py-3 px-4 rounded-xl hover:rounded-full"
                      >
                        Lägg ut resterande varor
                      </button>
                    </div>
                  )}
                <p className="w-full border-b mb-2">Artiklar</p>

                {/* ITEMLIST */}

                {negotiationItems.map((item, index) => {
                  return <OfferItem key={index} item={item} />;
                })}

                {/* CHECKLIST */}

                <section>
                  <OfferChecklist
                    deliveryDate={deliveryDate}
                    uncompleted={uncompleted}
                    priceDeviation={priceDeviation}
                    amountDeviation={amountDeviation}
                  />
                </section>

                {/* BUDGET */}

                <OfferBudget
                  getOfferBudget={getOfferBudget}
                  getTotalOfferBudget={getTotalOfferBudget}
                />

                {/* ACCEPT BUTTON */}

                <AcceptButton acceptOffer={acceptOffer} status={status} />
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Offer;
