import React from 'react';
import Helmet from 'react-helmet';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Layout from './../../Shared/Layout';

const InfoDashboard = (props) => {
  return (
    <div className="col-sm-6 col-lg-6">
        <div style={{paddingBottom: 30}} className={"overview-item overview-item--"+props.style}>
            <div className="overview__inner">
                <div className="overview-box clearfix">
                    <div className="icon">
                        <i className={"fas "+props.icon}></i>
                    </div>
                    <div className="text">
                        <h2>{props.number}</h2>
                        <span>{props.title}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
const Dashboard = (props) => {
  
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="row m-t-25">
        <InfoDashboard 
          style='c1' 
          icon='fa-user-circle'
          number={props.siswa}
          title="Jumlah Peserta"
        />

        <InfoDashboard 
          style='c2' 
          icon='fa-check-square'
          number={props.nilai}
          title="Peserta Mengerjakan"
        />
      </div> 

      <div className="row">
        <div className="col-lg-12">
          <div className="au-card recent-report">
              <div className="au-card-inner">
                <h3 className="title-2">Grafik</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={props.data}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="kat" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="jumlah" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          </div>
        </div>
      </div>                                              
    </div>
  );
}

Dashboard.layout = page => <Layout children={page} />

export default Dashboard;
