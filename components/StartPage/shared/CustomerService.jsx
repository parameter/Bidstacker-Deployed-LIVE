import Link from 'next/link';
import React from 'react';

import SendIcon from '../../../public/assets/svg/SendIcon';

const CustomerService = ({ info }) => {
  return (
    <>
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white dark:bg-gray-light-dark rounded-t-xl p-5 tablet:p-8">
          <h3 className="my-6 flex justify-start desktop:justify-center items-center gap-2">
            <span className="wave text-4xl">👋</span>Välkommen {info.user}!
          </h3>
          <p className="text-base tablet:text-lg leading-relaxed">
            {info.text}
          </p>
          <div className="mt-10 border-2 border-[#F9B300] rounded-xl p-8">
            <h3 className="text-xl tablet:text-2xl tablet:font-medium mb-5 leading-snug">
              Exempel på vad vi kan hjälpa med!
            </h3>
            <div className="flex flex-col desktop:flex-row gap-1 desktop:gap-10">
              <div className="flex flex-col gap-1">
                {info.helpText.slice(0, 3).map((help, index) => (
                  <p
                    key={index}
                    className="flex items-center gap-2 text-base tablet:text-lg mb-2"
                  >
                    <SendIcon
                      width="15px"
                      height="15px"
                      className="text-[#f9b100]"
                    />
                    {help}
                  </p>
                ))}
              </div>
              <div>
                {info.helpText.slice(3, 5).map((help, index) => (
                  <p
                    key={index}
                    className="flex items-center gap-2 text-base tablet:text-lg mb-2"
                  >
                    <SendIcon
                      width="15px"
                      height="15px"
                      className="text-[#f9b100]"
                    />
                    {help}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
