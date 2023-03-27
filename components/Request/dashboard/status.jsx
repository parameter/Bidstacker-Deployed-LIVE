'use client';

const Status = ({ requestCount, offerCount }) => {
  return (
    <div className="grid gap-4 grid-cols-2 mobile:grid-cols-4 pb-4 mt-4">
      <div className="flex items-center bg-white rounded-xl px-6 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-light text-gray-800 truncate dark:text-white">
            Pågående
          </p>
          <p className="text-sm font-light text-gray-800 truncate dark:text-gray-800">
            förfrågningar
          </p>
        </div>
        <h2 className="font-black text-2xl mobile:text-5xl text-gray-800">
          {requestCount}
        </h2>
      </div>
      <div className="flex items-center bg-white rounded-xl px-6 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-light text-gray-8001 truncate dark:text-white">
            Mottagna
          </p>
          <p className="text-sm font-light text-gray-800 truncate dark:text-gray-800">
            offerter
          </p>
        </div>
        <h2 className="font-black text-2xl mobile:text-5xl text-orange">
          {offerCount}
        </h2>
      </div>
      <div className="flex items-center bg-white rounded-xl px-6 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-light text-gray-800 truncate dark:text-white">
            Inväntar
          </p>
          <p className="text-sm font-light text-gray-800 truncate dark:text-gray-800">
            attestering
          </p>
        </div>
        <h2 className="font-black text-2xl mobile:text-5xl text-gray-200">0</h2>
      </div>
      <div className="flex items-center bg-white rounded-xl px-6 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-light text-gray-800 truncate dark:text-white">
            Mottagna
          </p>
          <p className="text-sm font-light text-gray-800 truncate dark:text-gray-800">
            beställningar
          </p>
        </div>
        <h2 className="font-black text-2xl mobile:text-5xl text-gray-200">0</h2>
      </div>
    </div>
  );
};

export default Status;
