import React from 'react';
import {FocusModeProvider} from '../context/focusMode';

export default function Root({children}) {
  React.useEffect(() => {
    const maxShift = 200;
    const getNavbar = () => document.querySelector('.navbar');

    const updateNavbarState = () => {
      const navbar = getNavbar();
      const path = window.location.pathname || '/';
      const scrollY = window.scrollY || window.pageYOffset;
      const shouldFuse = path === '/' && scrollY <= 10;
      if (navbar) {
        navbar.classList.toggle('navbarFused', shouldFuse);
      }
    };

    const handleScroll = () => {
      const navbar = getNavbar();
      const scrollY = window.scrollY || window.pageYOffset;
      const shift = Math.max(-maxShift, Math.min(maxShift, scrollY * 0.2));
      document.documentElement.style.setProperty('--scroll-shift', `${shift}px`);
      updateNavbarState();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('popstate', updateNavbarState);
    const originalPushState = window.history.pushState;
    const patchedPushState = function patchedPushState(...args) {
      const result = originalPushState.apply(this, args);
      updateNavbarState();
      return result;
    };
    window.history.pushState = patchedPushState;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', updateNavbarState);
      window.history.pushState = originalPushState;
    };
  }, []);

  return <FocusModeProvider>{children}</FocusModeProvider>;
}
