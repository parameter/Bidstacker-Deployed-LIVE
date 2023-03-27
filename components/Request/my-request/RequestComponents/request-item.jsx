'use client';
import Link from 'next/link';
import {
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export default function RequestItem({ request, groupId }) {
  return (
    <>
      <div className="px-6 py-2 text-gray-800 mobile:py-4 bg-white rounded-xl mobile:mb-4 hover:bg-gray-200 transition ease-in-out">
        {' '}
        <Link
          className="cursor-pointer"
          href={`/management/request/my-requests/${groupId}`}
          shallow
        >
          <div className="flex items-center">
            <div className="bg-gray-50 p-4 rounded-full mobile:mr-8">
              <ClipboardDocumentListIcon className="h-10 w-10 mobile:h-14 mobile:w-14 stroke-1.5" />
            </div>
            <section className="w-full flex relative items-center justify-between">
              <figure className="w-full flex flex-col ml-2">
                {/* <span className="absolute -left-[72px] -top-3 bg-[#ffb4b4] h-4 px-2 pt-0.5 pb-0.5 rounded-xl"></span> */}
                <h5 className="font-sans text-lg mobile:text-2xl font-semibold text-light">
                  {request.request_metadata.projectNumber}
                </h5>
                <p className="text-xs mobile:text-sm text-gray-400 dark:text-gray-400 mb-2">
                  {request.request_items.length} artiklar &nbsp;•&nbsp; Skapad{' '}
                  {request.request_metadata.createdAt.slice(0, 10)}{' '}
                </p>
              </figure>
              <ChevronRightIcon className="h-6 w-6 mr-1" />
            </section>
          </div>
        </Link>
      </div>
    </>
  );
}
