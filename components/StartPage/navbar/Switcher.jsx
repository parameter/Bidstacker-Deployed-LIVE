'use client';

import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '@/lib/start-page-hooks/useDarkSide';

const Switcher = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        moonColor={'#fff'}
        sunColor={'#000'}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={25}
      />
    </>
  );
};

export default Switcher;
