import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import { set } from 'lodash';

export default (props) => {
  const [isSend, setIsSend] = useState(false);

   //state untuk nilai input form
  const [values, setValues] = useState({
    email: "",
  });

  //menangani perubahan input pada form
  function handleChange(e){
          const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value,
    }))
  }

  //menangani ketika form di-submit
  function handleSubmit(e){
    e.preventDefault()
    Inertia.post(route('password.email'), values,{
        onSuccess: ()=>{
            setIsSend(true);
        }
    });
  }

  return (
    <div className="page-wrapper">
        <div className="page-content--bge5">
            <div className="container">
                <div className="login-wrap">
                    <div className="login-content">

    {/* logo */}                   
    <div className="login-logo">
        <a href="#">
            <img src="/images/icon/logo.png" alt="CoolAdmin" />
        </a>
    </div>

{isSend ? (
    <p align="center"> Kami telah mengirim link reset password ke email. Silakan cek email Anda!</p>
):(   
    <div className="login-form">
        {/* form login */} 
        <form onSubmit={handleSubmit}>            
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Email"
                    className={"au-input au-input--full " + ('email' in props.errors ? 'is-invalid' : '')}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
                {'email' in props.errors && (
                    <small className="form-text text-danger">{props.errors.email}</small>
                )}
            </div>

            <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">
                SUBMIT
            </button>
    
        </form>
    </div>
)}
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
};
