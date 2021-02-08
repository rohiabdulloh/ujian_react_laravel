import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

export default (props) => {
    
   //state untuk nilai input form
  const [values, setValues] = useState({
    email: "",
    password: "",
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
    Inertia.post(route('login.attemp'), values)
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

    {/* form login */}    
    <div className="login-form">
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

            <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Password"
                    className={"au-input au-input--full " + ('password' in props.errors ? 'is-invalid' : '')}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
                {'password' in props.errors && (
                    <small className="form-text text-danger">{props.errors.password}</small>
                )}
            </div>

            <div className="login-checkbox">
                <label>
                    <input type="checkbox" name="remember"/>Remember Me
                </label>
                <label>
                    <InertiaLink href={route('password.emailform')}>Forgotten Password?</InertiaLink>
                </label>
            </div>

            <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">
                Login
            </button>
    
        </form>
        <div className="register-link">
            <p>
                Belum punya akun? 
                <InertiaLink href={route('register')} style={{marginLeft: 20}}> 
                    Buat akun
                </InertiaLink>
            </p>
        </div>
    </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

  )
};
