'use client';
import {
  CheckCircleIcon,
  DocumentCheckIcon,
  DocumentMinusIcon,
} from '@heroicons/react/24/outline';

const OfferStatus = ({ status }) => {
  return (
    <div>
      {status === 'accepted' && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <CheckCircleIcon className="h-20 mobile:h-24 w-20 mobile:w-24 mt-4 mobile:mt-8" />
            <p className="text-2xl font-semibold">Tack för din beställning!</p>
            <p className="w-64 mobile:w-full text-lg font-light text-center">
              Du kommer få ett mail när din beställning är klar.
            </p>
          </div>
        </div>
      )}
      {status === 'rejected' && (
        <div className="flex justify-center mt-4 mb-4">
          <div className="flex flex-col items-center">
            <DocumentMinusIcon className="h-20 w-20 mt-4 mobile:mt-8" />
            <p className="text-2xl font-semibold">Förfallen offert</p>
            <p className="w-64 text-lg font-light text-center">
              Förfrågan redan offerterad.
            </p>
          </div>
        </div>
      )}
      {status === 'new' && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <DocumentCheckIcon className="h-20 w-20 mt-4 mobile:mt-8" />
            <p className="text-2xl font-semibold">Din offert</p>
            <p className="w-64 mobile:w-full text-lg font-light text-center">
              Du kan acceptera eller avböja offerten nedan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferStatus;
