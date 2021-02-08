import React, {useState} from 'react';

import FrontHeader from './FrontHeader';
import FrontMenuDesktop from './FrontMenuDesktop';
import FrontMenuMobile from './FrontMenuMobile';


export default function Layout({ children }) {
    const [openMenu, setOpenMenu] = useState(false);
  
    const handleOpenMenu = () => {
      setOpenMenu(!openMenu);
    }

  return (
    <div className="page-wrapper">
        <FrontMenuDesktop />

        <div className="page-container2">
            <FrontHeader openMenu={handleOpenMenu} />
            <FrontMenuMobile rightMargin={openMenu ? '0' : '-300px'}/>

            <div className="main-content">
                <div className="container-fluid">

                    {children}

                </div>
            </div>
        </div>
    </div>
   );
}
