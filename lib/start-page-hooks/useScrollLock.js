import { useCallback, useEffect } from 'react';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    // document.body.style.paddingRight = 'var(--scrollbar-compensation)';
    document.body.dataset.scrollLock = 'true';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    // document.body.style.paddingRight = '';
    delete document.body.dataset.scrollLock;
  }, []);

  useEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      '--scrollbar-compensation',
      `${scrollBarCompensation}px`
    );
    // Cleanup function
    return () => {
      document.body.style.removeProperty('--scrollbar-compensation');
    };
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
