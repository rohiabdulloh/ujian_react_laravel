import React from 'react';

export default ({openMenu}) => {

  return (
    <header className="header-desktop2">
        <div className="section__content section__content--p30">
            <div className="container-fluid">
                <div className="header-wrap2">
                    <div className="logo d-block d-lg-none">
                        <a href="#">
                            <img src="/images/icon/logo-white.png" alt="CoolAdmin"/>
                        </a>
                    </div>
                    <div className="header-button2">
                        
                        <div onClick={openMenu} className="header-button-item d-block d-lg-none">
                            <i className="fas fa-bars"></i>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </header>
   );
}
