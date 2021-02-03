import React, {useState} from 'react';
import Helmet from 'react-helmet';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';

export default (props) => {
    const nilai = props.nilai;
    const [kategori, setKategori] = useState(props.id);

    //menangani kategori diubah
    const changeKategori = (e) =>{
      setKategori(e.target.value);
    };

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'NIS', field: 'nis', width: 100 },
        { label: 'Nama Siswa', field: 'nama', width: 200 },
        { label: 'Nilai', field: 'nilai', width: 50 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    nilai.map( (kat, index) => {
      data.rows.push(
        { 
          no: index+1,
          nis: kat.nis,
          nama: kat.nama_siswa,
          nilai: kat.nilai,
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
