import React, {useState} from 'react';

import MenuMobile from './FrontMenuMobile';

export default () => {
  const [openMenu, setOpenMenu] = useState(false);
  
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <header className="header-mobile header-mobile-2 d-block d-lg-none">
        <div className="header-mobile__bar">
            <div className="container-fluid">
                <div className="header-mobile-inner">
                    {/* logo */}  
                    <a className="logo" href="index.html">
                        <img src="/images/icon/logo-white.png" alt="CoolAdmin" />
                    </a>
                    {/* tombol menu */}  
                    <button onClick={handleOpenMenu} 
                        className={'hamburger hamburger--slider' + (openMenu ? ' is-active':'') }>
                        <span className="hamburger-box">
                            <i style={{color: '#fff'}} className={openMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </span>
                    </button>

                </div>
            </div>
        </div>   
            
        <MenuMobile display={openMenu ? 'block' : 'none'}/>

    </header>
   );
}
