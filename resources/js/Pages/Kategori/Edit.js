import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Layout from './../../Shared/Layout';

export default (props) => {
  const data = props.kategori;
  //state untuk nilai input form
  const [values, setValues] = useState({
    nama_kategori: data.nama_kategori || "",
    durasi: data.durasi || "",
    mulai: new Date(data.mulai) || "",
    selesai: new Date(data.selesai) || "",
    deskripsi: data.deskripsi || "",
  });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  //menangani perubahan nilai input pada form
  function handleChange(e){
    const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value,
    }))
  }

  function handleEditorChange(name, value){
    setValues(values => ({
      ...values,
      [name]: value,
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
    Inertia.put(route('kategori.update', data.id), values)
  }

  return (
    <Layout>
      <Helmet title="Edit Kategori Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Edit Kategori Ujian
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="nama_kategori" className=" form-control-label">Nama Kategori</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" id="nama_kategori" name="nama_kategori" placeholder="Nama Kategori" 
                            className={"form-control " + ('nama_kategori' in props.errors ? 'is-invalid' : '')}
                            value={values.nama_kategori}
                            onChange={handleChange}
                        />
                        {'nama_kategori' in props.errors && (
                            <small className="form-text text-danger">{props.errors.nama_kategori}</small>
                        )}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="mulai" className=" form-control-label">Mulai</label>
                    </div>
                    <div className="col-12 col-md-5">
                        <DatePicker  className="form-control"
                          showTimeSelect
                          dateFormat="yyyy-MM-dd HH:mm"
                          selected={values.mulai} 
                          onChange={date => handleEditorChange('mulai', date)} 
                        />
                        {'mulai' in props.errors && (
                            <small className="form-text text-danger">{props.errors.mulai}</small>
                        )}
                    </div>
                </div>
                
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="selesai" className=" form-control-label">Selesai</label>
                    </div>
                    <div className="col-12 col-md-5">
                        <DatePicker className="form-control"
                          showTimeSelect
                          dateFormat="yyyy-MM-dd HH:mm"
                          selected={values.selesai} 
                          onChange={date => handleEditorChange('selesai', date)}
                        />
                        {'selesai' in props.errors && (
                            <small className="form-text text-danger">{props.errors.selesai}</small>
                        )}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="durasi" className=" form-control-label">Durasi (menit)</label>
                    </div>
                    <div className="col-12 col-md-2">
                        <input type="number" id="durasi" name="durasi" placeholder="Durasi (menit)" 
                            className={"form-control " + ('durasi' in props.errors ? 'is-invalid' : '')}
                            value={values.durasi}
                            onChange={handleChange}
                        />
                        {'durasi' in props.errors && (
                            <small className="form-text text-danger">{props.errors.durasi}</small>
                        )}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="deskripsi" className=" form-control-label">Deskripsi</label>
                    </div>
                    <div className="col-12 col-md-10">
                        <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            value={values.deskripsi}
                            onChange={(value)=>handleEditorChange('deskripsi', value)}
                        />
                        {'deskripsi' in props.errors && (
                            <small className="form-text text-danger">{props.errors.deskripsi}</small>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>
                    <i className="fa fa-save"></i> Simpan
                </button>
                <InertiaLink href={route('kategori.index')} className="btn btn-danger">
                    <i className="fa fa-ban"></i> Batal
                </InertiaLink>
            </form>
            </div>  
          </div>
        </div>
      </div>
    </Layout>
  )
};
