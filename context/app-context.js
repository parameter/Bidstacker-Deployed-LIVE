'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const pathname = usePathname();
  const [notices, setNotices] = useState([]);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [hotjarAllowed, setHotjarAllowed] = useState(false);
  const [navDownBg, setNavDownBg] = useState('');
  const [logoColor, setLogoColor] = useState({
    main: '#FFC519',
    second: '#FFFFFF'
  });
  const [radioButtonsTextColorUp, setRadioButtonsTextColorUp] = useState(undefined);
  const [radioButtonsTextColorDown, setRadioButtonsTextColorDown] = useState(undefined);
  const [isSticky, setIsSticky] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // sticky
      if (window.scrollY >= navbarHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // scrolled down
      if (window.scrollY > 0) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarHeight]);

  const switchBrandingScheme = (pathname) => {

    console.log('setting logoColor', pathname);

    switch (pathname) {

      case '/': 
        setLogoColor({
          main: '#FFC519', // yellow 
          second: '#FCFCFC', // white
          mobile: '#FFC519'
        });
        setNavDownBg('rgba(75,61,48,1)');
        setRadioButtonsTextColorUp('rgb(252 252 252)');
        setRadioButtonsTextColorDown('rgb(252 252 252)');
      break;

      case '/hitta-byggvaror': 
        setLogoColor({
          main: '#FFC519',
          second: '#FCFCFC',
          mobile: '#FFC519'
        });
        setNavDownBg('rgba(40, 38, 35, 0.9)');
        setRadioButtonsTextColorUp('#FCFCFC');
        setRadioButtonsTextColorDown('#FCFCFC');
      break;

      case '/bli-byggvaruhandlare': 
        setLogoColor({
          main: '#FFC519',
          second: '#FCFCFC',
          mobile: '#FFC519'
        });
        setNavDownBg('rgba(69, 90, 100, 0.9)');
        setRadioButtonsTextColorUp('#FCFCFC');
        setRadioButtonsTextColorDown('#FCFCFC');
      break;

      case '/leverera-byggvaror': 
        setLogoColor({
          main: '#FFC519',
          second: '#FCFCFC',
          mobile: '#FFC519'
        });
        setNavDownBg('rgba(109, 163, 111, 0.94)');
        setRadioButtonsTextColorUp('#FCFCFC');
        setRadioButtonsTextColorDown('#FCFCFC');
      break;

      case '/kundservice': 
        setLogoColor({
          main: '#282623', // green-cta
          second: '#282623',
          mobile: '#282623'
        });
        setNavDownBg('rgba(252, 252, 252, 0.94)'); 
        setRadioButtonsTextColorUp('#282623');
        setRadioButtonsTextColorDown('#282623');
      break;

      default: 
        setLogoColor({
          main: '#282623', // green-cta
          second: '#282623',
          mobile: '#282623'
        });
        setNavDownBg('rgba(252, 252, 252, 0.94)'); 
        setRadioButtonsTextColorUp('#282623');
        setRadioButtonsTextColorDown('#282623');
      break;

    }
  }

  useEffect(() => {

    switchBrandingScheme(pathname);

  }, [pathname]);

  const newNotice = useCallback((note) => {
    setNotices([...notices, note]);
  }, []);

  const removeNote = (index) => {
    notices.splice(index, 1);
    setNotices([...notices]);
  };

  return (
    <AppContext.Provider
      value={{
        notices,
        newNotice,
        removeNote,
        scrolledDown,
        navDownBg,
        logoColor,
        radioButtonsTextColorUp,
        radioButtonsTextColorDown,
        analyticsAllowed,
        setAnalyticsAllowed,
        hotjarAllowed,
        setHotjarAllowed,
        isSticky,
        navbarHeight,
        setNavbarHeight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
