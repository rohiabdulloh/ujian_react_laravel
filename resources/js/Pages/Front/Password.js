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
    password: "",
    password1: "",
    password2: "",
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

  const input = [
    {label: 'Password Lama', name: 'password'},
    {label: 'Password', name: 'password1'},
    {label: 'Konfirmasi Password', name: 'password2'},
  ];

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
  
    Inertia.put(route('password.update'), values).then(()=>{
      setValues({
        password: "",
        password1: "",
        password2: "",
      });
    });
  }

  return (
    <Layout>
      <Helmet title="Ubah Password" />
      <div className="row">
        <div className="col-lg-8">
          <div className="user-data">
            <h3 className="title-3">
                Ubah Password
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                {input.map((inp)=>(
                    <div key={inp.name} className="row form-group">
                        <div className="col col-md-4">
                            <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                        </div>
                        <div className="col-12 col-md-8">
                            <input type="password" id={inp.name} name={inp.name} placeholder={inp.label} 
                                className={"form-control " + (inp.name in props.errors ? 'is-invalid' : '')}
                                value={values[inp.name]}
                                onChange={handleChange}
                            />
                            {inp.name in props.errors && (
                                <small className="form-text text-danger">{props.errors[inp.name]}</small>
                            )}
                        </div>
                    </div>
                )) }

                
                <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>
                    <i className="fa fa-save"></i> Simpan
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
