import React, {useState, useRef} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './../../Shared/FrontLayout';

export default (props) => {
  const {flash} = usePage().props;

  const data = props.user;
  //state untuk nilai input form
  const [values, setValues] = useState({
    pesan: ""
  });

  if(flash.message) toast(flash.message);

  //menangani perubahan nilai input pada form
  function handleChange(e){
    const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value,
    }))
  }


  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
  
    Inertia.post(route('kontak.save'), values);
  }

  return (
    <Layout>
      <Helmet title="Ubah Password" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Hubungi Admin
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="pesan" className=" form-control-label">Pesan</label>
                    </div>
                    <div className="col-12 col-md-10">
                        <textarea id="pesan" name="pesan" placeholder="Tulis Pesan" 
                            className={"form-control " + ('pesan' in props.errors ? 'is-invalid' : '')}
                            value={values.pesan}
                            onChange={handleChange}
                        ></textarea>
                        {'pesan' in props.errors && (
                            <small className="form-text text-danger">{props.errors.pesan}</small>
                        )}
                    </div>
                </div>
               
                <button type="submit" className="btn btn-primary">
                    Kirim Pesan
                </button>
            </form>
            </div>  
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position='top-right'
        type='success'
        autoClose={5000}
      />
    </Layout>
  )
};
