import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';

import Layout from './../../Shared/FrontLayout';

export default (props) => {
  return (
    <Layout>
      <Helmet>
        <title>Konfirmasi Ujian</title>
      </Helmet>
      <div className="row">
      {(props.siswa.nama_siswa == '-' || props.siswa.nis == '-') ? (
        <div className="col-md-12">  
            <div className="card">
                <div className="card-body">
                    <p>Data peserta belum lengkap. Lengkapi dulu data peserta sebelum mengerjakan ujian!</p>
                    <br/>
                    <a onClick={()=>Inertia.get(route('peserta'))} className="btn btn-success">
                        Lengkapi sekarang
                    </a>
                </div>
            </div>
        </div>
       ):(
        <>
        <div className="col-md-6">
            
            <div className="card">
                <div className="card-header">
                    Identitas Peserta
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                        <tr><td><b>No.Peserta</b></td><td>: {props.siswa.no_ujian}</td></tr>
                        <tr><td><b>NIS</b></td><td>: {props.siswa.nis}</td></tr>
                        <tr><td><b>Nama</b></td><td>: {props.siswa.nama_siswa}</td></tr>
                        <tr><td><b>Kelas</b></td><td>: {props.siswa.kelas}</td></tr>
                        <tr><td><b>Nama Ujian</b></td><td>: {props.kategori.nama_kategori}</td></tr>
                        <tr><td><b>Mulai</b></td><td>: {props.kategori.mulai}</td></tr>
                        <tr><td><b>Selesai</b></td><td>: {props.kategori.selesai}</td></tr>
                        <tr><td></td><td></td></tr>
                        </tbody>
                    </table>   
                </div>
            </div>
        </div>

        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    Deskripsi Ujian
                </div>
                <div dangerouslySetInnerHTML={{__html: props.kategori.deskripsi}}  
                    style={{height: 360, overflowY: 'auto'}} className="card-body"
                ></div>
                <div className="card-footer">
                    {props.nilai.selesai==null ? (
                        <a onClick={()=>Inertia.post(route('ujian.mulai', props.kategori.id))} className="btn btn-success btn-block">
                            Kerjakan
                        </a>    
                    ):(
                        <a className="btn btn-primary btn-block disabled">
                            Sudah Mengerjakan
                        </a> 
                    )}
                </div>
            </div>
        </div>
        </>
        )}
    </div>  
    </Layout>
  );
}