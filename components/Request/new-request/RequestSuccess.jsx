import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const RequestSuccess = () => {
  return (
    <div className="w-full h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-[800px] bg-white rounded-xl pt-10 mx-auto pb-10">
        <div className="flex flex-col justify-center items-center">
          <CheckCircleIcon className="w-[250px] text-[#3B963E]" />
          <h1 className="font-bold text-2xl">Vi har mottagit er förfrågan!</h1>
          <p className="text-center mt-3">
            Klicka på knappen nedantill för att se eller hantera alla era
            inkomna offerter.
          </p>

          <div className="flex justify-center">
            <Link href="/management/request/my-requests">
              <button className="mt-[70px] transition duration-300 ease-in-out bg-gray-200 hover:bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl">
                Mina förfrågningar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSuccess;
