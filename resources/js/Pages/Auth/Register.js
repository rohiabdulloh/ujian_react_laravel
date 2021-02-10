import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

export default (props) => {
   //state untuk nilai input form
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    Inertia.post(route('register.attemp'), values)
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
            <img src="images/icon/logo.png" alt="CoolAdmin"/>
        </a>
    </div>

    {/* form register */} 
    <div className="login-form">
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Username"
                    className={"au-input au-input--full " + ('name' in props.errors ? 'is-invalid' : '')}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                />
                {'name' in props.errors && (
                    <small className="form-text text-danger">{props.errors.name}</small>
                )}
            </div>

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

            <div className="form-group">
                <label>Konfirmasi Password</label>
                <input className="au-input au-input--full" 
                    type="password" placeholder="Konfirmasi Password"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                />
            </div>

            <div className="login-checkbox">
                <label>
                    <input type="checkbox" name="aggree"/>Agree the terms and policy
                </label>
            </div>
            <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">
                Register
            </button>
        </form>

        <div className="register-link">
            <p>
                Sudah punya akun? 
                <InertiaLink href={route('login')} style={{marginLeft: 20}}> 
                    Login
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
