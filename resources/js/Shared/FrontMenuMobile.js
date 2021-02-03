import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default (props) => {
  //buat array data menu
  const menu = [
    {title: "Home", link: "/"},
    {title: "Ujian",  link: "/ujian"},
  ];

  return (
    <nav className="navbar-mobile" style={{display: props.display}}>
      <div className="container-fluid">
        <ul className="navbar-mobile__list list-unstyled">
            { menu.map((item) => (
            <li key={item.title}>
                <InertiaLink className="js-arrow" href={item.link}>
                    <i className={'fas '+item.icon}></i> {item.title}
                </InertiaLink>
            </li>
            ))}
        </ul>
      </div>
    </nav>
   );
}
