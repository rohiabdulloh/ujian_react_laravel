import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default () => {
  //buat array data menu
  const menu = [
    {title: "Home", link: "/"},
    {title: "Ujian",  link: "/ujian"},
    ];

  return (
    <ul className="list-unstyled">
        { menu.map((item) => (
        <li key={item.title}>
            <InertiaLink href={item.link}>
                {item.title}
            </InertiaLink>
        </li>
        ))}
    </ul>
   );
}
