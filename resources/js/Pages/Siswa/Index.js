import React, {useState} from 'react';
import Helmet from 'react-helmet';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';
import Dialog from './../../Shared/Dialog';

export default (props) => {
    const siswa = props.siswa;
    
    //state untuk dialog
    const [dialog, setDialog] = useState({
      open: false,
      route: null
    });

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
        { label: 'NIS', field: 'nis', width: 100 },
        { label: 'Nama Siswa', field: 'nama', width: 200 },
        { label: 'Jenis Kelamin', field: 'jk', width: 50 },
        { label: 'Alamat', field: 'alamat', width: 200 },
        { label: 'Asal Sekolah', field: 'asal', width: 200 },
        { label: '', field: 'aksi', width: 100 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    siswa.map( (kat, index) => {
      data.rows.push(
        { 
          no: index+1,
          nis: kat.nis,
          nama: kat.nama_siswa,
          jk: kat.jenis_kelamin,
          alamat: kat.alamat,
          asal: kat.asal_sekolah,
          aksi: (
            <div className="table-data-feature">            
              <button className="item danger"  onClick={()=>handleDialogOpen(route('siswa.destroy', kat.id))}> 
                  <i className="fas fa-trash"></i>
              </button>
          </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Siswa" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Peserta Ujian
            </h3>

            <div  style={{padding: 30}}>

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
