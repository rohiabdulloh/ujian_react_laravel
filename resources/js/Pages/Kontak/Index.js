import React, {useState} from 'react';
import Helmet from 'react-helmet';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';
import Dialog from './../../Shared/Dialog';

export default (props) => {
    const kontak = props.kontak;
    
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
        { label: 'Waktu', field: 'waktu', sort: 'asc', width: 100 },
        { label: 'Username', field: 'username', sort: 'asc', width: 150 },
        { label: 'Pesan', field: 'pesan', width: 500 },
        { label: '', field: 'aksi', width: 100 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    kontak.map( (ktk, index) => {
      data.rows.push(
        { 
          no: index+1,
          waktu: ktk.waktu,
          username: (
            <div>
              {ktk.name} <br/>
              <a href={"mailto:"+ktk.email} target="_blank">{ktk.email}</a>
            </div>
          ),
          pesan: ktk.pesan,
          aksi: (
            <div className="table-data-feature">            
              <button className="item danger"  onClick={()=>handleDialogOpen(route('pesan.destroy', ktk.id))}> 
                  <i className="fas fa-trash"></i>
              </button>
          </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Kontak" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Pesan Peserta
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
