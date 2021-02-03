import React from 'react';
import Helmet from 'react-helmet';

import Layout from './../../Shared/FrontLayout';

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
const Home = (props) => {
  
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

                                              
    </div>
  );
}

Home.layout = page => <Layout children={page} />

export default Home;
