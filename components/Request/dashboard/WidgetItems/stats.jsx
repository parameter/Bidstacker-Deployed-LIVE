'use client';
import { ChartPieIcon } from '@heroicons/react/24/outline';

const Stats = () => {
  return (
    <div className="bg-white flex flex-col rounded-xl align-center px-4 py-3 mobile:p-4">
      <div className="flex">
        <ChartPieIcon className="w-5 h-5 stroke-2 mobile:w-6 mobile:h-6" />
        <p className="ml-1 text-sm mobile:text-lg font-bold">Statistik</p>
      </div>
      <section className="flex-wrap">
        <div className="flex items-center justify-between">
          <dd className="text-xs font-light text-gray-500 dark:text-gray-400">
            Vinst
          </dd>
          <dt className="text-lg font-bold">4382kr</dt>
        </div>
        <div className="flex items-center justify-between">
          <dd className="text-xs font-light text-gray-500 dark:text-gray-400">
            Vinst
          </dd>
          <dt className="text-lg font-bold">4382kr</dt>
        </div>
        <div className="flex items-center justify-between">
          <dd className="text-xs font-light text-gray-500 dark:text-gray-400">
            Vinst
          </dd>
          <dt className="text-lg font-bold">4382kr</dt>
        </div>
      </section>
    </div>
  );
};

export default Stats;
