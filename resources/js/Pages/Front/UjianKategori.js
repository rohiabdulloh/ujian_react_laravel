import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';

import Layout from './../../Shared/FrontLayout';


export default (props) => {
  return (
    <Layout>
      <Helmet>
        <title>Kategori Ujian</title>
      </Helmet>
      <div className="row">

    { props.data.map((data) => (
        <div key={data.kategori.id} className="col-md-4">
            <div className="card">
                <div className="card-body">
                  <h4>{data.kategori.nama_kategori}</h4><br/>
                    <table>
                      <tbody>
                        <tr><td valign="top">Mulai</td><td valign="top">: {data.kategori.mulai}</td></tr>
                        <tr><td valign="top">Selesai</td><td valign="top">: {data.kategori.selesai}</td></tr>
                      </tbody>
                    </table>   
                </div>
                <div className="card-footer">
                    {data.nilai.selesai==null ? (
                      <>
                        {(new Date() >= new Date(data.kategori.mulai) && new Date() <= new Date (data.kategori.selesai)) ? (
                          <>
                          {data.nilai.mulai == null ? (
                            <a onClick={()=>Inertia.get(route('ujian.konfirmasi', data.kategori.id))} className="btn btn-success btn-block">
                              Kerjakan
                            </a>
                          ):(
                            <a onClick={()=>Inertia.get(route('ujian.konfirmasi', data.kategori.id))} className="btn btn-warning btn-block">
                              Sedang Kerjakan
                            </a>
                          )}
                          </>
                        ):(
                          <>
                          { new Date() < new Date(data.kategori.mulai) && (
                            <a className="btn btn-secondary btn-block disabled">
                                Belum Mulai
                            </a>
                          )}

                          { new Date() > new Date(data.kategori.selesai) && (
                            <a className="btn btn-secondary btn-block disabled">
                                Waktu Terlewat
                            </a>
                          )}
                          </>
                        )}   
                      </>
                    ):(
                        <a className="btn btn-danger btn-block disabled">
                            {data.nilai.selesai}
                        </a> 
                    )}   
                </div>
            </div>
        </div>
    ))}

    </div>  
    </Layout>
  );
}