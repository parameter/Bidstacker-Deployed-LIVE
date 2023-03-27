import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const OfferItem = ({ myNegotiations, groupId }) => {
  let createdDate = myNegotiations[groupId].negotiations[0].createdAt;

  // console.log({
  //   myNegotiations: myNegotiations,
  // });
  return (
    <div className="px-6 py-5 mobile:p-2 bg-gray-100 rounded-3xl shadow-lg shadow-gray-200 my-4 border-2 border-gray-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 relative">
      <Link
        className="cursor-pointer"
        href={`/management/supplier/my-offers/${groupId}`}
        shallow
        
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="pt-2 font-bold text-2xl">
              {myNegotiations[groupId].request_metadata?.marking}
            </p>

            <p className="text-sm text-gray-400 pb-2">
              {createdDate.slice(0, 10)}
            </p>
            <p className="text-xs text-gray-400 pt-4">
              {myNegotiations[groupId].negotiations[0].items.length > 1
                ? `${myNegotiations[groupId].negotiations[0].items.length} artiklar`
                : `${myNegotiations[groupId].negotiations[0].items.length} artikel`}
            </p>

            {myNegotiations[groupId].negotiations[0].status === 'new' ? (
              <p className="w-28 flex justify-center bg-yellow-100 text-yellow-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full border border-yellow-400 absolute -top-4">
                Offererad
              </p>
            ) : myNegotiations[groupId].negotiations[0].status ===
              'accepted' ? (
              <p className="w-28 flex justify-center bg-green-100 text-green-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full border border-green-400 absolute -top-4">
                Accepterad
              </p>
            ) : myNegotiations[groupId].negotiations[0].status ===
              'completed' ? (
              <p className="w-28 flex justify-center bg-red-100 text-red-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full border border-red-400 absolute -top-4">
                Utförd
              </p>
            ) : (
              <p className="w-28 flex justify-center rounded-md p-2 bg-gray-200 border border-gray-300 text-gray-700"></p>
            )}
          </div>

          <ChevronDoubleRightIcon className="h-6 w-6 mr-1" />
        </div>
      </Link>
    </div>
  );
};

export default OfferItem;
