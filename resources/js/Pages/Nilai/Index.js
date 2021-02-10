import React, {useRef, useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';

export default (props) => {
    const isMount = useRef(false);

    const nilai = props.nilai;
    const [kategori, setKategori] = useState(props.id);

    //menangani kategori diubah
    const changeKategori = (e) =>{
      setKategori(e.target.value);
    };
    
    //Ke halaman kategori/show jika nilai kategori diubah
    useEffect(()=>{
      if(isMount.current) Inertia.get(route('nilai.show', kategori));
      else isMount.current = true;
    }, [kategori]);

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'NIS', field: 'nis', width: 100 },
        { label: 'Nama Siswa', field: 'nama', width: 200 },
        { label: 'Mulai', field: 'mulai', width: 100 },
        { label: 'Selesai', field: 'selesai', width: 100 },
        { label: 'Jml. Benar', field: 'benar', width: 200 },
        { label: 'Nilai', field: 'nilai', width: 50 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    nilai.map( (nil, index) => {
      data.rows.push(
        { 
          no: index+1,
          nis: nil.nis,
          nama: nil.nama_siswa,
          mulai: nil.mulai,
          selesai: nil.selesai,
          benar: nil.jml_benar,
          nilai: nil.nilai,
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Nilai" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Hasil Ujian
            </h3>

            <div  style={{padding: 30}}>

              {/* tombol bawah judul */}
              <div className="table-data__tool">
                <div className="table-data__tool-left">
                  {/* pilihan kategori */}
                    <select name="kategori" id="kategori"       
                        className="form-control-lg form-control"
                        value={kategori}
                        onChange={changeKategori}
                    >
                        <option value="0">Semua Kategori</option>
                        {props.kategori.map((kat)=>(
                            <option key={kat.no} value={kat.id}>{kat.nama_kategori}</option>
                        ))}
                    </select>
                </div>

                <div className="table-data__tool-right">
                  <a href={route('nilai.export')} target="_blank" className="au-btn au-btn-icon au-btn--green au-btn--small">
                      <i className="fas fa-file-excel"></i> Export
                  </a>
                </div>
              </div>

              {/* tabel data responsive */}
              <div className="table-responsive table-data">            
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={data}
                />            
              </div>

            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
};
