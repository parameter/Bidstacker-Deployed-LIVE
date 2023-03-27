import axios from 'axios';
import OfferItem from './offer-item';
import { useCurrentUser } from '@/lib/user';
import { useEffect, useState } from 'react';
import _ from 'underscore';
import { useSupplierContext } from 'context/supplier-context';

const MyOffersList = () => {
  const { data: { user } = {} } = useCurrentUser();
  const { getMyOffers, myNegotiations } = useSupplierContext();

  useEffect(() => {
    getMyOffers();
  }, [user, getMyOffers]);


  // console.log({ myNegotiations: myNegotiations });

  return (
    <>
      {user && (
        <div className="w-full bg-gray-100 px-4 py-10">
          <div className="max-w-[800px] bg-white rounded-xl pt-10 mx-auto pb-10">
            <div className="flex flex-col justify-center px-10">
              <h1 className="text-3xl font-semibold text-gray-800">
                Besvarade förfrågningar
              </h1>
              <div className="flex justify-between my-16">
                <h2 className="font-semibold text-lg">
                  Status på förfrågningar
                </h2>
                <select>
                  <option value="">Sortera efter</option>
                  <option value="Status">Status</option>
                  <option value="Date">Date</option>
                </select>
              </div>

              {myNegotiations ? (
                Object.keys(myNegotiations).map((groupId, index) => {
                  return (
                    <OfferItem
                      key={index}
                      myNegotiations={myNegotiations}
                      groupId={groupId}
                    />
                  );
                })
              ) : (
                <h4 className="flex justify-center text-lg font-semibold my-8">
                  Inga besvarade förfrågningar
                </h4>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOffersList;
