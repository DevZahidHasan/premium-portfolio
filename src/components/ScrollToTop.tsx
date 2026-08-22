import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { lenis } = useLenis();

  useEffect(() => {
    // Scroll to top immediately when route changes
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
};
