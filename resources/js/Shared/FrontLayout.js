import React from 'react';
import Helmet from 'react-helmet';
import { usePage } from '@inertiajs/inertia-react';

import HeaderMobile from './FrontHeaderMobile';
import HeaderDesktop from './FrontHeaderDesktop';

export default function Layout({ children }) {
  
  return (
    <div className="page-wrapper">
        <HeaderDesktop />
        <HeaderMobile />

        <div className="page-container">
            
            
            <div className="main-content">
                <div className="container-fluid">

                    {children}

                </div>
            </div>
        </div>
    </div>
   );
}
