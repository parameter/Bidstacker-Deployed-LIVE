'use client';
import Link from 'next/link';
import {
  ChevronRightIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function RequestMessages({ groupId, request, negotiations }) {
  const [message, setMessage] = useState(false);

  return (
    <>
      <div className="flex font-light justify-between items-end">
        <h4 className="text-xl font-bold text-gray-900">Meddelanden</h4>
        <div>
          <select
            defaultValue="sort"
            className=" border-gray-300 text-sm bg-gray-100"
          >
            <option value="sort">Visa</option>
          </select>
        </div>
      </div>

      {!message ? (
        <div className="flex justify-center font-semibold text-lg text-gray-400 mt-4 mb-20">
          <h4>Inga meddelanden mottagna...</h4>
        </div>
      ) : (
        <section className="flex items-center bg-[#daf9c1] justify-between mb-4 p-6 mobile:p-2 rounded-lg border-4 border-white hover:border-4 hover:border-[#31a94d] transition ease-in-out">
          <div className="flex flex-col items-center justify-center">
            <div className="text-lg">
              <span className="bg-green-300 text-green-600 text-sm px-2 py-0.3 rounded-lg">
                new
              </span>
            </div>

            <div>
              <EnvelopeIcon className="h-12 w-12 mt-1 mr-1" />
            </div>
          </div>

          <ul className="flex flex-col ml-4 items-base tablet:text-lg text-xs text-left">
            <li className="flex items-center mb-2">
              <UserCircleIcon className="h-6 w-6" />
              <p className="text-sm ml-2">Handlare i Gävle</p>
            </li>
            <li className="flex items-center">
              <p className="text-sm ml-2">Nytt meddelande</p>
            </li>

            <li className="flex items-center">
              <p className="text-sm font-bold ml-2">Ej läst</p>
            </li>
          </ul>
          <div className="flex">
            <ChevronRightIcon className="h-6 w-6 mr-1" />
          </div>
        </section>
      )}
    </>
  );
}
