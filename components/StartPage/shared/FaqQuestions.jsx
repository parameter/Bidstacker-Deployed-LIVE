'use client';

import React, { useState } from 'react';
import MinusIcon from '../../../public/assets/svg/MinusIcon';
import PlusIcon from '../../../public/assets/svg/PlusIcon';

const FaqQuestions = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="bg-white dark:bg-gray-light-dark rounded-b-xl p-8">
        <h3 className="mb-10 text-center">Vanliga frågor</h3>
        {questions.map((question, index) => (
          <div key={index} className="my-4 border-b border-slate-400">
            <div
              className="flex items-center justify-between pb-4 cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <h3 className="text-base font-bold tablet:font-normal tablet:text-xl">
                {question.question}
              </h3>
              <div>
                {openIndex === index ? (
                  <MinusIcon className="ml-2 w-[10px] h-[10px] tablet:w-[15px] tablet:h-[15px]" />
                ) : (
                  <PlusIcon className="ml-2 w-[10px] h-[10px] tablet:w-[15px] tablet:h-[15px]" />
                )}
              </div>
            </div>

            {openIndex === index && (
              <p className={`answer text-gray-dark dark:text-gray-light pb-4`}>
                {question.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqQuestions;
