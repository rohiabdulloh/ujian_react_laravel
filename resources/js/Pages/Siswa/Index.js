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
        { label: 'Foto', field: 'foto', sort: 'asc', width: 100 },
        { label: 'Email', field: 'email', sort: 'asc', width: 50 },
        { label: 'NIS', field: 'nis', width: 100 },
        { label: 'Nama Siswa', field: 'nama', width: 200 },
        { label: 'Jenis Kelamin', field: 'jk', width: 50 },
        { label: 'Kelas', field: 'kelas', width: 50 },
        { label: 'No. Ujian', field: 'no_ujian', width: 100 },
        { label: 'Alamat', field: 'alamat', width: 200 },
        { label: 'Asal Sekolah', field: 'asal', width: 200 },
        { label: '', field: 'aksi', width: 100 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    siswa.map( (sis, index) => {
      data.rows.push(
        { 
          no: index+1,
          foto: (<img src={'/images/icon/'+sis.picture} width="60" />),
          email: sis.email,
          nis: sis.nis,
          nama: sis.nama_siswa,
          jk: sis.jenis_kelamin,
          kelas: sis.kelas,
          no_ujian: sis.no_ujian,
          alamat: sis.alamat,
          asal: sis.asal_sekolah,
          aksi: (
            <div className="table-data-feature">            
              <button className="item danger"  onClick={()=>handleDialogOpen(route('siswa.destroy', sis.id))}> 
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
