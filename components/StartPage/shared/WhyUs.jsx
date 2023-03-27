import React from 'react';

const WhyUs = ({whyUs}) => {
  return (
    <div className="py-20 bg-gray-light dark:bg-gray-light-dark px-10">
      <h2 className="text-start tablet:text-center leading-snug mb-12">{whyUs.title}</h2>
      <div className="flex flex-col justify-center items-center max-w-[820px] mx-auto">
        <div className="flex flex-col">
          {whyUs.subTitle}
        </div>
      </div>
      {whyUs.features && 
        <div className="max-w-[1200px] flex flex-row justify-center mt-10 mb-6 mx-auto">
          <div className="flex flex-row justify-center flex-wrap">
            {whyUs.features.map((feature, index) => (
              <div key={index} className="flex flex-col px-2 mb-8 mobile:w-1/2 tablet:w-1/4">
                {feature.icon}
                <h4 className="font-bold text-gray-creamy-dark text-base tablet:text-lg mb-1">
                  {feature.title}
                </h4>
                <p className="text-base text-gray-creamy-dark dark:text-gray-200">
                  {feature.subTitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default WhyUs;