import React, {useState} from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default (props) => {
  const {user} = usePage().props;
  const [openSub, setOpenSub] = useState(false);

  function handleOpenSub(){
    setOpenSub(!openSub);
  }

  //buat array data menu
  const menu = [
    {title: "Home", link: "/", sub:[]},
    {title: "User", link: "#", sub: [
      {title: "Profil User", link:'/peserta'},
      {title: "Ubah Password", link: '/password'}
    ]},
    {title: "Ujian",  link: "/ujian", sub:[]},
    {title: "Kontak", link: "/kontak", sub:[]}
  ];

  return (
    <aside className="menu-sidebar2">
      <div className="logo">
          <a href="#">
              <img src="/images/icon/logo-white.png" alt="Logo"/>
          </a>
      </div>
      <div className="menu-sidebar2__content js-scrollbar1 ps">
          <div className="account2">
              <div className="image img-cir img-120">
                  <img src={"/images/icon/"+user.picture} alt={user.name}  width="100%" height="100%"/>
              </div>
              <h4 className="name">{user.name}</h4>
              <a href="#" onClick={()=>Inertia.post("logout")}>Sign out</a>
          </div>
          <nav className="navbar-sidebar2">
              <ul className="list-unstyled navbar__list">
              { menu.map((item) => (
                (item.sub.length==0) ?
                  (<li key={item.title}>
                      <InertiaLink href={item.link}>
                          {item.title}
                      </InertiaLink>
                  </li>)
                : 
                  (<li className="has-sub" key={item.title}>
                      <a onClick={handleOpenSub} href='#'>
                          {item.title}
                          <span className="arrow">
                              <i className={openSub ? 'fas fa-angle-down' : 'fas fa-angle-right'}></i>
                          </span>
                      </a>
                      <ul  style={{display: openSub ? 'block' : 'none'}} className="list-unstyled navbar__sub-list js-sub-list">
                      { item.sub.map((subitem) => (
                        <li key={subitem.title}>
                            <InertiaLink href={subitem.link}>
                                {subitem.title}
                            </InertiaLink>
                        </li>
                      )) }
                      </ul>
                    </li>)
                
              ))}
              </ul>
          </nav>
      </div>
    </aside>
   );
}
