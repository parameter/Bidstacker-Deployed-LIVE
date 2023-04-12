"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import RadioButtonsMenu from '@/components/StartPage/navbar/RadioButtonsMenu';
import Link from 'next/link';
import MenuOverlay from '@/components/StartPage/navbar/MenuOverlay';
import UserMenu from '@/components/Layout/UserMenu';
import LogoDesktop from '@/components/Layout/LogoDesktop';
import LogoMobile from '@/components/Layout/LogoMobile';
import { useAppContext } from 'context/app-context';
import MobileFooter from './MobileFooter';
import Hamburger from 'hamburger-react';

const mainMenuItems = [
  {
    text: 'Inköpare',
    path: '/hitta-byggvaror',
  },
  {
    text: 'Återförsäljare',
    path: '/bli-byggvaruhandlare',
  },
  {
    text: 'Åkare',
    path: '/leverera-byggvaror',
  }
];

const Navbar = ({ params }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const mainNavRef = useRef();
  const mobileMenuRef = useRef();
  const [scrollbarWidth, setScrollbarWidth] = useState(null);
  const { scrolledDown, navDownBg, logoColor, isSticky, isMobile, radioButtonsTextColorUp, radioButtonsTextColorDown, pathname } = useAppContext();

  useEffect(() => {

    setTimeout(() => {
      setIsNavbarOpen(false);
    },300)
  
  }, [pathname]); 

  return(<>
    <MenuOverlay 
      isNavbarOpen={isNavbarOpen}
    />
    <div 
      ref={mainNavRef}
      style={{
        backgroundColor: isMobile ? '' : (scrolledDown && !isNavbarOpen ? navDownBg : ''),
      }}
      className={`bg-yellow tablet:bg-transparent transition-colors w-full absolute tablet:fixed top-0 right-0 py-2 z-40 ${
        scrolledDown &&
        `tablet:shadow-sm tablet:ease-in z-40`
      } ${isNavbarOpen && '!shadow-none'}`}
    >
      <div className="flex flex-row justify-between items-center px-3 py-1 tablet:px-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="mobile:block desktop:hidden">
              <LogoMobile color={logoColor} isNavbarOpen={isNavbarOpen} isMobile={isMobile} />
            </div>
            <div className="hidden mobile:hidden desktop:block">
              <LogoDesktop color={logoColor} isNavbarOpen={isNavbarOpen} />
            </div>
          </Link>
        </div>
        <div className={`hidden tablet:flex transition-opacity duration-500 ${!isNavbarOpen ? 'tablet:opacity-100 delay-300' : 'opacity-0'}`}>
          <RadioButtonsMenu
            radioButtonsTextColorUp={radioButtonsTextColorUp}
            radioButtonsTextColorDown={radioButtonsTextColorDown}
            scrolledDown={scrolledDown}
            isNavbarOpen={isNavbarOpen}
            mainMenuItems={mainMenuItems}
          />
        </div>
        <div className={` flex items-center gap-8`}>

          <div className="absolute right-0 flex flex-row items-center gap-2">

            <div className="mx-6">
              <Hamburger
                size={30}
                duration={0.8}
                toggled={isNavbarOpen}
                toggle={setIsNavbarOpen}
                color={isMobile ? '#282623' : (isNavbarOpen ? '#FFFFFF' : radioButtonsTextColorUp)}
                className="text-black dark:text-white"
              />
            </div>
          
          </div>

        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={`${
          isNavbarOpen ? 'hidden' : 'block'
        } absolute tablet:hidden desktop:hidden bg-[#795e28] top-full py-4 px-10 overflow-hidden z-[9999] w-full ${
          isSticky ? 'sticky shadow-sm ease-in' : `absolute`
        }`}
      >
        <ul className="flex justify-around">
          {mainMenuItems.map((item, i) => {
            return (
              <li key={i}>
                <Link
                  href={item.path} 
                  className={`nav-item text-white text-center text-base tablet:text-xl rounded-[5px] cursor-pointer z-[2] item-${i} ${
                    item.path === pathname
                      ? 'active text-black dark:text-white font-bold'
                      : ' font-normal'
                  }`}
                >
                  <button className="uppercase font-medium">{item.text}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    {/* <div className={`${isNavbarOpen ? 'hidden' : 'block tablet:hidden'}`}> */}
    <div className="hidden">
      <MobileFooter />
    </div>
  </>)

};

export default Navbar;