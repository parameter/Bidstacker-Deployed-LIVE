'use client';

import React, { useState, useEffect, useRef } from 'react';
import BoxIcon from '../../../public/assets/svg/BoxIcon';
import DeliveryIcon from '../../../public/assets/svg/DeliveryIcon';
import PercentIcon from '../../../public/assets/svg/PercentIcon';

const WhyUs = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollListener = useRef();

  const onScroll = () => {
    const winScroll =
      document.documentElement.scrollTop - scrollListener.current.offsetTop;
    const height = scrollListener.current.offsetHeight;

    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="py-[100px] bg-white dark:bg-gray-dark overflow-hidden"
      ref={scrollListener}
    >
      <div className="px-10">
        <div className="flex flex-col items-center gap-20 desktop:flex-row desktop:items-start justify-center">
          <div className="flex flex-1 flex-col text-center max-w-[350px]">
            <PercentIcon
              width="100px"
              height="100px"
              className="mb-4 mx-auto text-yellow"
            />
            <h3 className="text-yellow dark:text-yellow font-bold mb-4">
              Jämför Offerter
            </h3>
            <p className="text-[18px] mb-2">
              Hämta in flera offerter på byggvaror genom en förfrågan. Schyssta
              priser och villkor av verifierade handlare.
            </p>
          </div>
          <div className="flex flex-1 flex-col text-center max-w-[350px]">
            <BoxIcon
              width="100px"
              height="100px"
              fill="#f9b100"
              className="mb-4 mx-auto"
            />
            <h3 className="text-yellow dark:text-yellow font-bold mb-4">
              Handla Överskottspartier
            </h3>
            <p className="text-center text-[18px]">
              Bidra till att reducera materialhandels påverkan på miljön och få
              kanondeals på byggmaterial.
            </p>
          </div>
          <div className="flex flex-1 flex-col text-center mb-[150px] max-w-[350px]">
            <DeliveryIcon
              width="100px"
              height="100px"
              fill="#f9b100"
              className="mb-4 mx-auto"
            />
            <h3 className="text-yellow dark:text-yellow font-bold mb-4">
              Klimatvänliga leveranser
            </h3>
            <p className="text-center text-[18px]">
              Välj rätt bud för rätt typ av leverans, med vår lösning kan ni
              minimera er klimatinverkan.
            </p>
          </div>
        </div>
      </div>
      <div className="relative ">
        <div className='w-full h-[50px] bg-[url("../public/assets/svg/road.svg")] bg-contain' />
        <img
          src="/assets/svg/truckIcon.svg"
          className="absolute bottom-[3px] w-[150px]"
          style={{ left: `${scrollTop}%` }}
        />
      </div>
    </div>
  );
};

export default WhyUs;
