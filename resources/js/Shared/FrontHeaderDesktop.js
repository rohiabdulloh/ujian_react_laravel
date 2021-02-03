import React, {useState} from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

import MenuDesktop from './FrontMenuDesktop';

export default (props) => {
  const {user} = usePage().props;
  const [openMenu, setOpenMenu] = useState(false);

  const style = {
      dropdown:{
          transform: openMenu ? 'scale(1)' : 'scale(0)'
      }
  }

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <header className="header-desktop3 d-none d-lg-block">
        <div className="section__content section__content--p35">
            <div className="header3-wrap">
                <div className="header__logo">
                    <a href="#">
                        <img src="images/icon/logo-white.png" alt="CoolAdmin"/>
                    </a>
                </div>
                <div className="header__navbar">
                 <MenuDesktop/>   
                </div>
                <div className="header__tool">
                    
{/* menu user */}  
<div className="account-wrap">
        <div className="account-item clearfix js-item-menu account-item--style2">
            <div className="image">
                <img src={'/images/icon/'+user.picture} alt={user.name} />
            </div>

            <div className="content">
                <a onClick={handleOpenMenu}>{user.name} <i className="fas fa-angle-down"></i></a>
            </div>

            <div className="account-dropdown" style={style.dropdown}>
                <div className="info clearfix">
                    <div className="image">
                        <a href="#">
                            <img src={'/images/icon/'+user.picture} alt={user.name}/>
                        </a>
                    </div>
                    <div className="content">
                        <h5 className="name">
                            <a href="#">{user.name}</a>
                        </h5>
                        <span className="email">{user.email}</span>
                    </div>
                </div>
                <div className="account-dropdown__body">
                    <div className="account-dropdown__item">
                        <a href="#" onClick={() => Inertia.get("/profil")}>
                            <i className="fa fa-user"></i>Profil
                        </a>
                    </div>
                    <div className="account-dropdown__item">
                        <a href="#" onClick={() => Inertia.post("/logout")}>
                            <i className="fa fa-sign-out-alt"></i>Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
                </div>
            </div>
        </div>
    </header>
   );
}
