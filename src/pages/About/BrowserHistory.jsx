import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ComingSoon from '../Coming/ComingSoon';

const BrowserHistory = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState('');

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      setPrevLocation('');
    }
  }, [location]);

  return (
    <div className="text-center">
      <div className="text-2xl uppercase font-semibold">Browsing history</div>
      <div className="text-gray-400 text-sm">
        Places and items you recently viewed and visited
      </div>
     
<ComingSoon />
    </div>
  );
};

export default BrowserHistory;
