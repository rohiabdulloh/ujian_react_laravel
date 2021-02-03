import React, {useRef, useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';
import Dialog from './../../Shared/Dialog';

export default (props) => {
    const soal = props.soal;
    const isMount = useRef(false);

    //state untuk dialog
    const [dialog, setDialog] = useState({
      open: false,
      route: null
    });
    const [kategori, setKategori] = useState(props.id);

    //menangani kategori diubah
    const changeKategori = (e) =>{
      setKategori(e.target.value);
    };

    //Ke halaman kategori/show jika nilai kategori diubah
    useEffect(()=>{
      if(isMount.current) Inertia.get(route('soal.show', kategori));
      else isMount.current = true;
    }, [kategori]);

    //buka dialog
    const handleDialogOpen = (route) => {
      setDialog({open: true, route: route});
    };

    //tutup dialog
    const handleDialogClose = () => {
      setDialog({open: false, route: null});
    };

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'Soal', field: 'soal', width: 500 },
        { label: '', field: 'aksi', width: 100 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    soal.map( (so, index) => {
      let pilihan = [
        {no: 1, teks: so.pilihan_1},
        {no: 2, teks: so.pilihan_2},
        {no: 3, teks: so.pilihan_3},
        {no: 4, teks: so.pilihan_4},
        {no: 5, teks: so.pilihan_5},
      ];

      data.rows.push(
        { 
          no: index+1,
          soal: (
            <div>
              <div dangerouslySetInnerHTML={{__html: so.soal}}></div>
              <ol type="A" style={{marginLeft: 20}}>
                  {pilihan.map((pil) => {
                    if(so.kunci==pil.no){
                      return (<li style={{color: 'blue', fontWeight:'bold'}} key={pil.no} dangerouslySetInnerHTML={{__html: pil.teks}}></li>)
                    }else{
                      return (<li key={pil.no} dangerouslySetInnerHTML={{__html: pil.teks}}></li>)
                    }
                  })}
              </ol>
            </div>
          ),
          aksi: (
            <div className="table-data-feature">            
              <button className="item primary" onClick={()=>Inertia.get(route('soal.edit', so.id))}>
                  <i className="fas fa-edit"></i>
              </button>
              <button className="item danger"  onClick={()=>handleDialogOpen(route('soal.destroy', so.id))}> 
                  <i className="fas fa-trash"></i>
              </button>
            </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Soal" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Soal Ujian
            </h3>

            <div  style={{padding: 30}}>

              
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
 
                {/* tombol tambah */}
                <div className="table-data__tool-right">
                  <InertiaLink href={route('soal.create')} className="au-btn au-btn-icon au-btn--green au-btn--small">
                      <i className="fas fa-plus-circle"></i> Tambah
                  </InertiaLink>
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

      <Dialog
        openDialog={dialog.open}
        closeDialog={handleDialogClose}
        route={dialog.route}
      />
    </Layout>
  )
};
