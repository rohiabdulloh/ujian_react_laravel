import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const [values, setValues] = useState({
    nama_kategori: "",
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

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
    Inertia.post(route('kategori.store'), values)
  }

  return (
    <Layout>
      <Helmet title="Tambah Kategori Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Tambah Kategori Ujian
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
