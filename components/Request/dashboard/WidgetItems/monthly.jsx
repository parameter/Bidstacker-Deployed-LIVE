'use client';

const Monthly = () => {
  return (
    <div className="bg-white flex flex-col justify-between rounded-xl px-6 py-6 mb-4 mobile:mb-4 mobile:mr-4">
      <section className="flex justify-between">
        <div className="flex">
          <h5 className="text-xl font-semibold leading-none text-gray-800 dark:text-white">
            Statistik
          </h5>
        </div>

        <div className="flex flex-row items-center justify-center text-xs font-light text-gray-800 truncate dark:text-gray-800">
          <figure className="flex items-center mobile:text-sm">
            <span className="bg-gray-light mr-2 h-[6px] w-[6px] p-[4px] rounded-[12px]" />
            Utpris
          </figure>
          <figure className="flex items-center mobile:text-sm">
            <span className="bg-orange mr-2 ml-2 h-[6px] w-[6px] p-[4px] rounded-[12px]" />
            Förhandlat
          </figure>
        </div>
      </section>
      <section className="flex justify-between mobile:px-4 mt-8 mobile:mt-16">
        <figure className="flex flex-col items-center">
          <div className="flex justify-end items-end">
            <div className="bg-gray-light h-8 w-5 rounded-sm mr-[2px]" />
            <div className="bg-orange h-12 w-5 rounded-sm" />
          </div>
          <p className="text-xs font-medium text-gray-400 mobile:text-sm mt-1">
            Nov
          </p>
          <p className="mobile:text-sm text-gray-400">+12%</p>
        </figure>
        <figure className="flex flex-col items-center">
          <div className="flex justify-end items-end">
            <div className="bg-gray-light h-8 w-5 rounded-sm mr-[2px]" />
            <div className="bg-orange h-12 w-5 rounded-sm" />
          </div>
          <p className="text-xs font-medium text-gray-400 mobile:text-sm mt-1">
            Dec
          </p>
          <p className="mobile:text-sm text-gray-400">+12%</p>
        </figure>
        <figure className="flex flex-col items-center">
          <div className="flex justify-end items-end">
            <div className="bg-gray-light h-8 w-5 rounded-sm mr-[2px]" />
            <div className="bg-orange h-12 w-5 rounded-sm" />
          </div>
          <p className="text-xs font-medium text-gray-400 mobile:text-sm mt-1">
            Jan
          </p>
          <p className="text-[10px] mobile:text-sm text-gray-400">+12%</p>
        </figure>
        <figure className="flex flex-col items-center">
          <div className="flex justify-end items-end">
            <div className="bg-gray-light h-8 w-5 rounded-sm mr-[2px]" />
            <div className="bg-orange h-12 w-5 rounded-sm" />
          </div>
          <p className="text-xs font-medium text-gray-400 mobile:text-sm mt-1">
            Feb
          </p>
          <p className="text-[10px] mobile:text-sm text-gray-400">+12%</p>
        </figure>
      </section>
      <section className="flex justify-start"></section>
    </div>
  );
};

export default Monthly;
