import React, {useState, useRef} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './../../Shared/FrontLayout';

export default (props) => {
  const {flash} = usePage().props;

  const user = props.user;
  const siswa = props.siswa;

  if(flash.message) toast(flash.message);

  //state untuk nilai input form
  const [values, setValues] = useState({
    id : siswa.id,
    nama_siswa: siswa.nama_siswa || "",
    nis: siswa.nis || "",
    no_ujian: siswa.no_ujian || "",
    alamat: siswa.alamat || "",
    kelas: siswa.kelas || "",
    asal_sekolah: siswa.asal_sekolah || "",
    jenis_kelamin: siswa.jenis_kelamin || "",
    picture: user.picture || "",
    url_picture: "/images/icon/"+user.picture|| "",
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

  const inputLeft = [
    {label: 'Email', name: 'email', value:user.email, readonly: true},
    {label: 'No. Peserta', name: 'no_ujian', readonly: true},
    {label: 'Nama', name: 'nama_siswa'},
    {label: 'NIS', name: 'nis'},
    {label: 'Kelas', name: 'kelas'},
  ];
  const inputRight = [
    {label: 'Alamat', name: 'alamat'},
    {label: 'Asal Sekolah', name: 'asal_sekolah'},
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

    let formdata= new FormData;
    for (let key in values){
      formdata.append(key, values[key]);
    }
    formdata.append('_method', 'put');   
    Inertia.post(route('peserta.update'), formdata)
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
                <div className="row">
                    <div className="col-md-6">
                        {inputLeft.map((inp)=>(
                            <div key={inp.name} className="row form-group">
                                <div className="col col-md-3">
                                    <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" id={inp.name} name={inp.name} placeholder={inp.label} 
                                        className={"form-control " + (inp.name in props.errors ? 'is-invalid' : '')}
                                        value={'value' in inp ? inp.value : values[inp.name]}
                                        onChange={handleChange}
                                        {...('readonly' in inp && {readOnly: true})}
                                    />
                                    {inp.name in props.errors && (
                                        <small className="form-text text-danger">{props.errors[inp.name]}</small>
                                    )}
                                </div>
                            </div>
                        )) }

                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="jenis_kelamin" className=" form-control-label">Jenis Kelamin</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select type="text" id="jenis_kelamin" name="jenis_kelamin" 
                                    className={"form-control " + ("jenis_kelamin" in props.errors ? 'is-invalid' : '')}
                                    value={values.jenis_kelamin}
                                    onChange={handleChange}
                                >
                                  <option value="">-Jenis Kelamin-</option>
                                  <option value="L">Laki-laki</option>
                                  <option value="P">Perempuan</option>
                                </select>
                                {'jenis_kelamin' in props.errors && (
                                    <small className="form-text text-danger">{props.errors.jenis_kelamin}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {inputRight.map((inp)=>(
                            <div key={inp.name} className="row form-group">
                                <div className="col col-md-3">
                                    <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                                </div>
                                <div className="col-12 col-md-9">
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
                            <div className="col col-md-3">
                                <label htmlFor="picture" className=" form-control-label">Foto User</label>
                            </div>
                            <div className="col-12 col-md-9">
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
                                    <img src={values.url_picture} width="150" />
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

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
