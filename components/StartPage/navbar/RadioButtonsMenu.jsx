'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const RadioButtonsMenu = ({ scrolledDown, isNavbarOpen, mainMenuItems, radioButtonsTextColorUp, radioButtonsTextColorDown }) => {
  const pathname = usePathname();

  return (
    <div
      // className={`${
      //   bgColor || isNavbarOpen ? 'text-[#000]' : 'text-[#fff]'
      // } font-bold nav-container relative flex justify-between py-[5px] px-[10px] w-[450px] rounded-full`}
      className='font-bold nav-container relative flex justify-between w-[510px]'
    >
      {mainMenuItems.map((item, i) => {
        return (
          <Link
            key={i}
            href={item.path}
            className={`flex flex-row justify-center nav-item w-[150px] h-[58px] py-[10px] px-[20px] text-center rounded-full cursor-pointer z-[2] border-solid border-2 border-transparent focus-within:border-yellow focus:border-yellow item-${i} ${
              item.path === pathname ? 'active text-black' : ''
            }`}
          >  
            <button tabIndex="-1" className="transition-colors duration-500" style={{color: (item.path === pathname ? '#000' : (scrolledDown ? radioButtonsTextColorDown : radioButtonsTextColorUp) ) }}>{item.text}</button>
          </Link>
        ); 
      })}
      <div className='nav-item-highlighter w-[150px] h-[58px] py-[10px] rounded-full absolute top-[50%] bg-yellow' />
    </div>
  );
};

export default RadioButtonsMenu;