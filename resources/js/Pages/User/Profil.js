import React, {useState, useRef} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Layout from './../../Shared/Layout';

export default (props) => {
  const data = props.user;
  //state untuk nilai input form
  const [values, setValues] = useState({
    name: data.name || "",
    email: data.email || "",
    password1: "",
    password2: "",
    picture: data.picture || "",
    url_picture: "/images/icon/"+data.picture|| "",
  });

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
    {label: 'Username', name: 'name'},
    {label: 'Email', name: 'email'},
    {label: 'Password', name: 'password1'},
    {label: 'Konfirmasi Password', name: 'password2'},
  ];

  //menangani upload file
  const inputFile = useRef(null);
  function buttonClick(){
    inputFile.current.click();
  }

  function handleUpload(e){
    let file = e.target.files[0];
    let imgsrc = URL.createObjectURL(e.target.files[0]);

    setValues(values => ({
      ...values,
      picture: file,
      url_picture: imgsrc, //ubah foto yang ditampilkan dg yg akan diupload
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()

    let formdata = new FormData;
    for (let key in values){
      formdata.append(key, values[key]);
    }
    formdata.append('_method', 'put');   
    Inertia.post(route('user.update', data.id), formdata)
  }

  return (
    <Layout>
      <Helmet title="Profil User" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Profil User
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                {input.map((inp)=>(
                    <div key={inp.name} className="row form-group">
                        <div className="col col-md-2">
                            <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                        </div>
                        <div className="col-12 col-md-10">
                            <input type="text" id={inp.name} name={inp.name} placeholder={inp.label} 
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

                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="picture" className=" form-control-label">Foto User</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input style={{display: 'none'}}
                            accept="image/*" 
                            ref={inputFile}
                            id="picture" 
                            type="file" 
                            onChange={handleUpload}
                        />

                        <button onClick={buttonClick} type="button" className="btn btn-primary">
                            Upload Foto
                        </button>

                        {(values.url_picture!="") && (
                        <div style={{marginTop: 15}}> 
                            <img src={values.url_picture} width="200" />
                        </div>
                        )}
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>
                    <i className="fa fa-save"></i> Simpan Perubahan
                </button>
            </form>
            </div>  
          </div>
        </div>
      </div>
    </Layout>
  )
};
