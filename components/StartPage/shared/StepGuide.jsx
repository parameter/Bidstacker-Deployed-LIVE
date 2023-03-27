import Image from 'next/image';
import SendIcon from 'public/assets/svg/SendIcon';
import React from 'react';

const StepGuide = ({ textColor, stepGuide, svgImage }) => {
  return (
    <div className="flex gap-6 pt-10 desktop:pt-0">
      <div className="flex flex-col">
        <div className="flex flex-col mobile:flex-row gap-5">
          <div className="flex flex-col mobile:items-center">
            <div className="bg-white dark:bg-gray-light-dark w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <h3>1</h3>
            </div>
          </div>
          <div className="mb-12 mobile:mb-6 mt-2">
            <h3 className={'mb-2 text-2xl text-' + textColor}>{stepGuide[0].title}</h3>
            {stepGuide[0].subTitle.map((title, index) => (
              <div key={index} className="flex gap-2 mb-3 items-center">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-white dark:text-yellow-dark"
                />
                <p className="leading-normal font-medium whitespace-nowrap">{title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mobile:flex-row gap-5">
          <div className="flex flex-col mobile:items-center">
            <div className="bg-white dark:bg-gray-light-dark  w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <h3>2</h3>
            </div>
          </div>
          <div className="mb-12 mobile:mb-6 mt-2">
            <h3 className={'mb-2 text-xl text-' + textColor}>{stepGuide[1].title}</h3>
            {stepGuide[1].subTitle.map((title, index) => (
              <div key={index} className="flex gap-2 mb-3 items-center">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-white dark:text-yellow-dark"
                />
                <p className="leading-normal font-medium whitespace-nowrap">{title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mobile:flex-row gap-5">
          <div className="flex flex-col mobile:items-center">
            <div className="bg-white dark:bg-gray-light-dark  w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <h3>3</h3>
            </div>
          </div>
          <div className="mb-12 mobile:mb-6 mt-2">
            <h3 className={'mb-2 text-xl text-' + textColor}>{stepGuide[2].title}</h3>
            {stepGuide[2].subTitle.map((title, index) => (
              <div key={index} className="flex gap-2 mb-3 items-center">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-white dark:text-yellow-dark"
                />
                <p className="leading-normal font-medium whitespace-nowrap">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden tablet:flex justify-center">
        <Image src={svgImage} width={200} height={200} alt="Mobile" />
      </div>
    </div>
  );
};

export default StepGuide;
