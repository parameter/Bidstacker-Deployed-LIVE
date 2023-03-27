import Link from 'next/link';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OfferSuccess = () => {
  return (
    <div className="w-full h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-[800px] bg-white rounded-xl pt-10 mx-auto pb-10">
        <div className="flex flex-col justify-center items-center px-10">
          <CheckCircleIcon className="w-[250px] text-green" />
          <h1 className="font-bold text-2xl">
            Er offert är skickad och inväntar attestering!
          </h1>
          <p className="text-center mt-3">
            Klicka på knappen nedantill för att se eller hantera era utelämnade
            offerter
          </p>

          <div className="flex justify-center">
            <Link
              href={'/management/supplier/my-offers'}
              className="mt-[70px] transition duration-300 ease-in-out bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl hover:rounded-full"
            >
              Mina offerter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSuccess;
