import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import WebsiteShowcasePage from './pages/WebsiteShowcasePage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);

    window.addEventListener('popstate', syncPath);
    window.addEventListener('locationchange', syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('locationchange', syncPath);
    };
  }, []);

  useEffect(() => {
    if (path === '/') {
      document.title = 'Bit Byte Technologies - Premium Website Designs';
    }
  }, [path]);

  if (path === '/website-showcase') return <WebsiteShowcasePage />;
  if (path === '/digital-market-showcase') return <DigitalMarketingPage />;

  return <HomePage />;
}
