'use client';

import _ from 'underscore';
import NewRequest from '@/components/Request/new-request/new-request';
import { useRouter } from 'next/router';

const New = () => {
  const router = useRouter();

  return (
    <>
      {!router.query.params && (
        <div className="w-full bg-gray-100 px-4 py-10">
          <NewRequest />
        </div>
      )}
    </>
  );
};

export default New;
