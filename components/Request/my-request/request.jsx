'use client';
import { useEffect, useState, useCallback } from 'react';
import RequestInfo from '@/components/Request/my-request/RequestComponents/request-info';
import RequestOffers from '@/components/Request/my-request/RequestComponents/request-offers';
import RequestMessages from '@/components/Request/my-request/RequestComponents/request-messages';
import Header from '@/components/Request/dashboard/header';

export default function Request({ request, params }) {
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(0);

  const getBudget = useCallback(() => {
    setBudget(
      request.request_items
        .map((item) => parseFloat(item.fields[1].value))
        .reduce((partialSum, a) => partialSum + a, 0)
    );
  }, [setBudget, request]);

  useEffect(() => {
    if (request) {
      getBudget();
    }
    setLoading(false);
  }, [getBudget, request, setLoading]);

  return (
    <>
      <Header />
      {loading ? (
        <h2 className="text-black">Loading...</h2>
      ) : (
        <>
          <div className="rounded-xl mr-auto ml-auto gap-2 px-4 mobile:px-10 pb-8">
            {/* INFO */}
            {request && params[0] && (
              <RequestInfo
                requestMetadata={request.request_metadata}
                budget={budget}
                request={request}
              />
            )}
            {/* OFFERS */}
            <section className="flex flex-col tablet:flex-row desktop:flex-row mt-8 gap-6">
              <div className="w-full">
                {request && params[0] && (
                  <RequestOffers
                    groupId={params[0]}
                    request={request}
                    negotiations={request.negotiations}
                  />
                )}
              </div>
              {/* MESSAGES */}
              <div className="w-full">
                <RequestMessages />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
