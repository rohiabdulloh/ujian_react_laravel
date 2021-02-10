import React, {useState} from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default function Layout({ children }) {
  const {siswa} = usePage().props;
  console.log(usePage().props)
  return (
    <div className="page-wrapper">
       <div className="page-container3">

            <header className="header-desktop2" style={{left: 0}}>
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                            <div style={{color: '#fff'}}>
                {siswa!==null && siswa.nis+" - "+siswa.nama_siswa}                
                            </div>
                    </div>
                </div>
            </header>
            
            <div className="main-content">
                <div className="container-fluid">

                    {children}

                </div>
            </div>
        </div>
    </div>
   );
}
