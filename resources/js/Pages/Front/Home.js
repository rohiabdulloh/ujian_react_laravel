import React from 'react';
import Helmet from 'react-helmet';

import Layout from './../../Shared/FrontLayout';

const InfoDashboard = (props) => {
  return (
    <div className="col-md-6 col-lg-3">
        <div className="statistic__item">
            <h2 className="title1">{props.title1}</h2>
            <span className="desc">{props.title2}</span>
            <div className="icon">
                <i className={"fas "+props.icon}></i>
            </div>
        </div>
    </div>
  );
}
const Home = (props) => {
  
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="row">
        <InfoDashboard  
          icon='fa-list-alt'
          title1={props.siswa.no_ujian}
          title2="No Ujian"
        />
        <InfoDashboard 
          icon='fa-user-circle'
          title1={props.siswa.nama_siswa}
          title2="Nama Peserta"
        />
        <InfoDashboard 
          icon='fa-list'
          title1={props.siswa.kelas}
          title2="Kelas"
        />
        <InfoDashboard 
          icon='fa-calendar'
          title1={props.waktu}
          title2="Tanggal"
        />
      </div>                                              
    </div>
  );
}

Home.layout = page => <Layout children={page} />

export default Home;
