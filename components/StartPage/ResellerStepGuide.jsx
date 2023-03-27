"use client";

import { useEffect, useRef } from 'react';

const Step = ({ item, index, nrSteps }) => {
  const heightRef = useRef(null);
  const greyPillarRef = useRef(null);

  useEffect(() => {
    if (greyPillarRef.current !== null) {
      greyPillarRef.current.style.height = `${heightRef.current.offsetHeight}px`;
      greyPillarRef.current.style.display = 'block';
    }
  },[])

  return <div ref={heightRef} className="grow relative mb-8 pl-[70px] desktop:pl-[0]">
    <div className="absolute flex justify-center items-center w-12 h-12 left-[10px] desktop:left-[-70px] top-[-4px] rounded-3xl bg-[#d0d0d0] dark:bg-gray-dark text-3xl">
      <span>{index + 1}</span>
      {index < (nrSteps-1) && 
        <div ref={greyPillarRef} style={{display:'none'}} className="absolute w-2 h-32 top-[95%] bg-[#d0d0d0] dark:bg-gray-dark"></div>
      }
    </div>
    <h3 className="text-2xl text-gray-dark dark:text-gray-dark font-extrabold mb-4">{item.title}</h3>
    <ul>
      {item.descriptions.map((desc, index) => {
        return <li key={index}>
          <p className="text-xl mb-1 dark:text-gray-dark whitespace-nowrap">{desc}</p>
        </li>
      })}
    </ul>
  </div>
}

const StepGuide = ({ complimentary_svg, steps }) => {
  return (
    <div className='bg-white dark:bg-gray-lighter py-[50px]'>
      <div className='flex flex-col items-center container mx-auto'>
        <div className="relative flex flex-col mobile:flex-row w-max-w-[700px] ">
          <div className="relative flex-1 flex flex-col w-full">
              {steps.map((item, index) => {
                return <Step key={index} item={item} index={index} nrSteps={steps.length} />
              })}
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <img className="ml-5" src={complimentary_svg} alt="Anslutet bud hos Bidstacker" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepGuide;