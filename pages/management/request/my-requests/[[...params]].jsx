'use client';
import _ from 'underscore';
import { useCurrentUser } from '@/lib/user';
import { useEffect } from 'react';
import { useRequestContext } from 'context/request-context';
import AllRequests from '@/components/Request/my-request/all-requests';
import Request from '@/components/Request/my-request/request';
import Offer from '@/components/Request/my-request/offer';
import { useRouter } from 'next/router';

function MyRequest() {
  const { data: { user } = {} } = useCurrentUser();
  const { myRequests, getMyRequests } = useRequestContext();
  const router = useRouter();

  useEffect(() => {
    getMyRequests();
  }, [getMyRequests]);

  return (
    <>
      <div className="w-full bg-gray-100 py-10 mx-auto">
        <div className="max-w-[1000px] mx-auto mt-4 mobile:mt-12">
          {!router.query.params && <AllRequests myRequests={myRequests} />}

          {router.query.params && !router.query.params[1] && (
            <Request
              params={router.query.params}
              request={myRequests[router.query.params[0]]}
            />
          )}
          {router.query.params && router.query.params[1] && (
            <Offer
              params={router.query.params}
              request={myRequests[router.query.params[0]]}
              groupId={router.query.params[0]}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default MyRequest;
