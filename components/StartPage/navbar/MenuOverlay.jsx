'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useScrollLock } from '@/lib/start-page-hooks/useScrollLock';
import FacebookIcon from '../../../public/assets/svg/FacebookIcon';
import LinkedinIcon from '../../../public/assets/svg/LinkedinIcon';
import InstagramIcon from '../../../public/assets/svg/InstagramIcon';
import TwittedIcon from '../../../public/assets/svg/TwittedIcon';
import { useCurrentUser } from '@/lib/user';
import { usePathname } from 'next/navigation';
import general_settings from '@/content-json/general-settings-json';

const menyArray = {
  left_column: [
    {
      pathname: '/hitta-byggvaror',
      title: 'Inköpare'
    },
    {
      pathname: '/bli-byggvaruhandlare',
      title: 'Återförsäljare'
    },
    {
      pathname: '/leverera-byggvaror',
      title: 'Åkare'
    }
  ],
  right_column: [
    {
      pathname: '/hur-bidstacker-grundades',
      title: 'Om bidstacker'
    },
    {
      pathname: '/kundservice',
      title: 'Vanliga frågor'
    },
    {
      pathname: '/kontakta-oss',
      title: 'Kontakta Oss'
    }
  ]
}

const MenuOverlay = ({ isNavbarOpen }) => {
  const pathname = usePathname();
  const { lockScroll, unlockScroll } = useScrollLock();
  const { data: { user } = {} } = useCurrentUser();
 
  useEffect(() => {
    if (isNavbarOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isNavbarOpen, lockScroll, unlockScroll]);

  console.log('isNavbarOpen',isNavbarOpen);
 
  return (
    <nav
      className={`fixed flex top-0 left-0 w-full z-30 h-screen bg-gray-creamy-dark delay-100 -translate-x-full transition-all duration-700 ${
        isNavbarOpen
          ? 'translate-x-0'
          : '-translate-x-full'
      }`}
    >
      <ul className="w-full flex flex-col items-center justify-center mx-8">
        <div className="max-w-[800px]  w-full flex flex-col  gap-5 tablet:flex-row tablet:justify-around border-b border-gray-200 pb-14">
          <div className="flex flex-col gap-5 tablet:gap-8">
            {menyArray.left_column.map((item, index) => {
              return <li key={index} className="">
                        <Link
                          href={item.pathname}
                          className={"font-bold text-2xl tablet:text-4xl text-white target:border-b-4 active:border-b-4 focus:border-b-4 hover:border-b-4  " + (item.pathname === pathname ? 'border-b-4' :'') }
                        >
                          {item.title}
                        </Link>
                      </li>
              })}
          </div>
          <div className="flex flex-col gap-5 tablet:gap-8">
            {menyArray.right_column.map((item, index) => {
              return <li key={index} className="">
                        <Link
                          href={item.pathname}
                          className={"font-bold text-2xl tablet:text-4xl text-white target:border-b-4 active:border-b-4 focus:border-b-4 hover:border-b-4 " + (item.pathname === pathname ? 'border-b-4' :'') }
                        >
                          {item.title}
                        </Link>
                      </li>
            })}
          </div>
        </div>
        <div className="h-[50px] flex justify-center gap-10 items-center mt-4">
          <p className="hidden tablet:block text-base font-bold text-gray-400">
            Bidstacker
          </p>
          <li className="hidden tablet:block">
            <a
              href={"tel:" + general_settings.telephone}
              className="text-base font-bold text-white hover:underline"
            >
              {general_settings.telephone}
            </a>
          </li>
          <li className="hidden tablet:block">
            <a
              href=""
              className="text-base font-bold text-white hover:underline"
            >
              info@bidstacker.se
            </a>
          </li>
          <div className="flex flex-row gap-2 pb-1">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/bidstacker-se"
            >
              <LinkedinIcon
                className="text-gray-400 dark:text-gray-dark hover:text-[#0e76a8] dark:hover:hover:text-[#0e76a8] cursor-pointer ease-in duration-300"
                width="30px"
                height="30px"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/bidstacker"
            >
              <FacebookIcon
                className="text-gray-400 dark:text-gray-dark hover:text-[#4267B2] dark:hover:text-[#4267B2] cursor-pointer ease-in duration-300"
                width="30px"
                height="30px"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/bidstacker/"
            >
              <InstagramIcon
                className="text-gray-400 dark:text-gray-dark hover:text-[#833AB4] dark:hover:text-[#833AB4] cursor-pointer ease-in duration-300"
                width="30px"
                height="30px"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/bidstacker"
            >
              <TwittedIcon
                className="text-gray-400 hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2] cursor-pointer ease-in duration-300"
                width="30px"
                height="30px"
              />
            </a>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default MenuOverlay;
