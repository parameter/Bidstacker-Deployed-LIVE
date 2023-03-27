'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const Newsletter = ({ source }) => {
  const [email, setEmail] = useState('');
  const [elementOffsetTop, setElementOffsetTop] = useState(false);
  const [elementHeight, setElementHeight] = useState(false);
  const [activeHref, setActiveHref] = useState(null);
  const ref = useRef();

  useEffect(() => {

    const onScroll = () => {
      if (elementOffsetTop === false || elementHeight === false || activeHref !== null) { return; }
      if (window.scrollY >= (elementOffsetTop - elementHeight)) {
        setActiveHref(source);
      }
    }

    var elmTop = ref.current.getBoundingClientRect().top + window.scrollY;

    setElementOffsetTop(elmTop);
    setElementHeight(ref.current.clientHeight);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  },[setElementOffsetTop, elementOffsetTop, elementHeight, setElementHeight, activeHref, setActiveHref, source])

  return (
    <div ref={ref} className="relative w-full bg-yellow dark:bg-gray-dark h-[400px] tablet:h-[600px]">
      <div className="hidden tablet:block absolute top-0 left-0 w-full h-full dark:bg-black/70"></div>
      <video
        src={activeHref}
        type="video/mp4"
        className="hidden tablet:block tablet:w-full h-full object-cover"
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center">
        <div className="bg-yellow dark:bg-gray-dark rounded-3xl w-full tablet:w-[600px] h-[270px] flex flex-col justify-center items-center">
          <h3 className="font-bold text-2xl uppercase">Nyhetsbrev !</h3>
          <p className="text-lg text-center px-3 mt-2">
            Följ oss och få nyheter direkt !
          </p>

          <div className="flex flex-col tablet:flex-row justify-between items-center bg-white w-[75%] rounded-xl mt-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din epost adress"
              className="w-[95%] tablet:w-auto flex-grow outline-0 text-md text-[#223645] px-4 py-2  mt-4 tablet:mt-2 tablet:mb-2 ml-2"
            />

            <Link
              href={{
                pathname: '/newsletter',
                query: { email: email },
              }}
              className="flex w-full tablet:w-auto"
            >
              <button className="w-full tablet:w-auto flex justify-center gap-2 flex-row items-center font-bold rounded-xl bg-black dark:bg-yellow px-8 py-2.5 text-white mx-3 mb-5 tablet:mr-3 tablet:mt-3 tablet:mb-3">
                <AiOutlineHeart />
                Följ oss
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
