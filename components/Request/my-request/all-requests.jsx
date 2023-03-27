'use client';

import Link from 'next/link';
import RequestItem from './RequestComponents/request-item';
import {
  QuestionMarkCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useRequestContext } from 'context/request-context';

export default function AllRequests({ myRequests }) {
  const { isPrelAdmin } = useRequestContext();
  const router = useRouter();
  return (
    <>
      <div className="rounded-xl pt-8 gap-2 pb-8">
        {!router.query.params && (
          <div>
            <div className="flex items-center flex-row font-light justify-between mb-4">
              <h2 className="text-xl mobile:text-2xl font-semibold text-gray-800">
                Förfrågningar
              </h2>

              <Link href={`/management/request/new`}>
                {isPrelAdmin && (
                  <button>
                    <span className="flex bg-orange py-2 px-2 rounded text-black font-semibold">
                      <PencilSquareIcon className="h-6 w-6 stroke-1.5 mr-2" />
                      Ny förfrågan
                    </span>
                  </button>
                )}
              </Link>
            </div>
          </div>
        )}

        {Object.keys(myRequests).length === 0 ? (
          <div className="flex flex-col justify-center items-center font-semibold text-lg text-gray-300 mt-10">
            <QuestionMarkCircleIcon className="h-14 w-14 text-gray-400" />
            <h4 className="text-gray-400">Inga förfrågningar...</h4>
          </div>
        ) : (
          Object.keys(myRequests).map((groupId) => {
            return (
              <RequestItem
                key={groupId}
                request={myRequests[groupId]}
                groupId={groupId}
              />
            );
          })
        )}
      </div>
    </>
  );
}
