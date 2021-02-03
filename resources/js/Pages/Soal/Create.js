import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const [values, setValues] = useState({
    soal: "",
    id_kategori: "",
    pilihan_1: "",
    pilihan_2: "",
    pilihan_3: "",
    pilihan_4: "",
    pilihan_5: "",
    kunci: "",
  });

  const pilihan = [
    {val: 1, label: 'Pilihan 1', name: 'pilihan_1'},
    {val: 2, label: 'Pilihan 2', name: 'pilihan_2'},
    {val: 3, label: 'Pilihan 3', name: 'pilihan_3'},
    {val: 4, label: 'Pilihan 4', name: 'pilihan_4'},
    {val: 5, label: 'Pilihan 5', name: 'pilihan_5'},
  ];

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
    console.log(values)
    Inertia.post(route('soal.store'), values);
  }

  return (
    <Layout>
      <Helmet title="Tambah Soal Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Tambah Soal Ujian
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="id_kategori" className=" form-control-label">Kategori</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select type="text" id="id_kategori" name="id_kategori" placeholder="Kategori" 
                            className={"form-control " + ('id_kategori' in props.errors ? 'is-invalid' : '')}
                            value={values.id_kategori}
                            onChange={handleChange}
                        >
                          <option value="">-Pilih Kategori-</option>
                        {props.kategori.map((kat)=>(
                            <option key={kat.id} value={kat.id}>{kat.nama_kategori}</option>
                        ))}
                        </select>
                        {'id_kategori' in props.errors && (
                            <small className="form-text text-danger">{props.errors.id_kategori}</small>
                        )}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="soal" className=" form-control-label">Soal</label>
                    </div>
                    <div className="col-12 col-md-10">
                        <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            value={values.soal}
                            onChange={(value)=>handleEditorChange('soal', value)}
                        />
                        {'soal' in props.errors && (
                            <small className="form-text text-danger">{props.errors.soal}</small>
                        )}
                    </div>
                </div>

                {pilihan.map((pil)=>(
                    <div key={pil.val} className="row form-group">
                        <div className="col col-md-2">
                            <label htmlFor={pil.name} className=" form-control-label">{pil.label}</label>
                        </div>
                        <div className="col-12 col-md-10">
                            <ReactQuill theme="snow"
                                modules={modules}
                                formats={formats}
                                value={values[pil.name]}
                                onChange={(value)=>handleEditorChange(pil.name, value)}
                            />
                            {pil.name in props.errors && (
                                <small className="form-text text-danger">{props.errors[pil.name]}</small>
                            )}
                        </div>
                    </div>
                )) }
                
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="kunci" className=" form-control-label">Jawaban Benar</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select type="text" id="kunci" name="kunci" placeholder="Jawaban Benar" 
                            className={"form-control " + ('kunci' in props.errors ? 'is-invalid' : '')}
                            value={values.kunci}
                            onChange={handleChange}
                        >
                          <option value="">-Pilih Jawaban Benar-</option>
                        {pilihan.map((pil)=>(
                            <option key={pil.val} value={pil.val}>{pil.label}</option>
                        ))}
                        </select>
                        {'kunci' in props.errors && (
                            <small className="form-text text-danger">{props.errors.kunci}</small>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>
                    <i className="fa fa-save"></i> Simpan
                </button>
                <InertiaLink href={route('soal.index')} className="btn btn-danger">
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
