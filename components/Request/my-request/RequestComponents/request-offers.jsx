'use client';
import Link from 'next/link';
import {
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  StarIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { getOfferStatus } from '@/lib/get-offer-status';
import { offerCheck } from '@/lib/offer-check';

export default function RequestOffers({ groupId, request }) {
  const sortNegotiations = () => {
    return request.negotiations.sort((a, b) => {
      return a.status.localeCompare(b.status, undefined, { numeric: false });
    });
  };

  return (
    <>
      <section className="flex font-light justify-between items-end mb-2">
        <h4 className="text-xl font-bold text-gray-900">Offerter</h4>
        <div>
          <select defaultValue="sort" className="bg-gray-100 text-sm">
            <option value="sort">Visa</option>
          </select>
        </div>
      </section>

      {request.negotiations.length === 0 ? (
        <div className="flex justify-center font-semibold text-lg text-gray-400 mt-4">
          <h4>Inga offerter mottagna...</h4>
        </div>
      ) : (
        <>
          {sortNegotiations().map((item, index) => {
            console.log(item);
            return (
              <div key={item._id} className="relative">
                <span className="absolute -left-2 -top-1 z-10">
                  <p className="px-2 py-1 rounded-full text-white font-bold bg-[#ffb4b4] shadow">
                    {getOfferStatus(
                      item.status,
                      index,
                      request.negotiations[0].status
                    ) === 'accepted' && (
                      <span className="flex items-center">
                        <CheckIcon className="h-5 w-5 mr-1 stroke-2" />
                        <p className="text-sm">Accepterad</p>
                      </span>
                    )}
                    {getOfferStatus(
                      item.status,
                      index,
                      request.negotiations[0].status
                    ) === 'rejected' && (
                      <span className="flex items-center">
                        <p className="text-sm">Förfallen</p>
                      </span>
                    )}
                    {getOfferStatus(
                      item.status,
                      index,
                      request.negotiations[0].status
                    ) === 'new' && (
                      <span className="flex items-center">
                        <StarIcon className="h-5 w-5 mr-1 stroke-2" />
                        <p className="text-sm">Ny!</p>
                      </span>
                    )}
                  </p>
                </span>
                <Link
                  className={`" cursor-pointer bg-gray-200 ${
                    getOfferStatus(
                      item.status,
                      index,
                      request.negotiations[0].status
                    ) === 'rejected'
                      ? 'opacity-40'
                      : 'opacity-100'
                  } "`}
                  href={`/management/request/my-requests/${groupId}/${item._id}`}
                >
                  <section
                    className={
                      'flex justify-between items-center bg-white mb-2 p-6 rounded-xl hover:bg-gray-200 transition ease-in-out'
                    }
                  >
                    <div className="flex relative flex-col text-base items-start justify-center">
                      <div className="bg-orange p-4 rounded-full">
                        <ClipboardDocumentListIcon className="h-10 w-10" />
                      </div>
                    </div>

                    <ul className="w-48 flex flex-col justify-start ml-4 text-xs text-right">
                      <li className="flex items-center">
                        {item.canDeliver === true ? (
                          <CheckCircleIcon className="text-green h-6 w-6" />
                        ) : (
                          <ExclamationTriangleIcon className="text-red font-bold h-6 w-6" />
                        )}
                        {item.canDeliver === true ? (
                          <p className="text-sm ml-2">Leveranskrav</p>
                        ) : (
                          <p className="text-sm font-bold ml-2">Leveranskrav</p>
                        )}
                      </li>
                      <li className="flex items-center">
                        {offerCheck(request, item._id) === true && item ? (
                          <CheckCircleIcon className="text-green h-6 w-6" />
                        ) : (
                          <ExclamationTriangleIcon className="text-red font-bold h-6 w-6" />
                        )}
                        {offerCheck(request, item._id) === true && item ? (
                          <p className="text-sm ml-2">Leveransdatum</p>
                        ) : (
                          <p className="text-sm font-bold ml-2">
                            Leveransdatum
                          </p>
                        )}
                      </li>
                      <li className="flex items-center">
                        {item.items.length < request.request_items.length ? (
                          <CheckCircleIcon className="text-green h-6 w-6" />
                        ) : (
                          <ExclamationTriangleIcon className="text-red font-bold h-6 w-6" />
                        )}
                        {item.items.length < request.request_items.length ? (
                          <p className="text-sm ml-2">Offert komplett</p>
                        ) : (
                          <p className="text-sm font-bold ml-2">
                            Offert ej komplett
                          </p>
                        )}
                      </li>
                    </ul>
                    <div className="flex">
                      <ChevronRightIcon className="h-6 w-6" />
                    </div>
                  </section>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
