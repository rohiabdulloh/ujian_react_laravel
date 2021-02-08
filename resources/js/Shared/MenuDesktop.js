import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default () => {
  //buat array data menu
  const menu = [
    {icon: 'fa-tachometer-alt', title: "Dashboard", link: "/dashboard"},
    {icon: 'fa-book', title: "Kategori Ujian",  link: "/kategori"},
    {icon: 'fa-question-circle', title: "Soal Ujian", link: "/soal"},
    {icon: 'fa-user-circle', title: "Peserta Ujian", link: "/siswa"},
    {icon: 'fa-check-square', title: "Hasil Ujian", link: "/nilai"},
    {icon: 'fa-envelope', title: "Pesan", link: "/pesan"},
  ];

  return (
    <nav className="navbar-sidebar">
        <ul className="list-unstyled navbar__list">
            { menu.map((item) => (
            <li key={item.title}>
                <InertiaLink className="js-arrow" href={item.link}>
                    <i className={'fas '+item.icon}></i> {item.title}
                </InertiaLink>
            </li>
            ))}
        </ul>
    </nav>
   );
}
