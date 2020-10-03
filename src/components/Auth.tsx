import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import UserContext from './../contexts/user';

import url from '../api-url';

import stylesForm from './_form.module.css';
import styles from './Auth.module.css';

interface Props{
  mode: 'login' | 'register'
}


function Auth(props: Props){

  const {user, setUser} = useContext(UserContext);

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchUrl = props.mode === 'login' ? `${url}/api/auth/login` : `${url}/api/auth/register`;

    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    if(response.status !== 200){
      const msg = await response.text();
      return alert(msg);
    }
    if(props.mode === 'login'){
      const body = await response.json();
      localStorage.setItem('authToken', body.authToken);
      setUser({
        username: body.username,
        isLoggedin: true
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValues(prevVals => ({
      ...prevVals,
      [name]: value
    }));
  }

  return (
    <div id={styles.root} className="route">
      <div className="container">
        <h1>{props.mode === 'register' ? 'Create an account' : 'Welcome back!'}</h1>
        <form id={stylesForm.form} onSubmit={handleSubmit}>
          {props.mode === 'register' &&
            <>
              <label htmlFor="username">username</label>
              <input type="text" name="username" id="username" value={values.username} onChange={handleChange} autoComplete="off" />
            </>
          }
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={handleChange} />
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={values.password} onChange={handleChange} />
        <button type="submit" className="btn btn-submit">{props.mode === 'register' ? 'Register' : 'Login'}</button>
        </form>
        {props.mode === 'register'
          ? <p id={styles.switchMode} className="muted">Already have an account? <Link to='/login'>Login</Link></p>
          : <p id={styles.switchMode} className="muted">Need an account? <Link to='/register'>Register</Link></p>
        }
      </div>
      {user.isLoggedin &&
        <Redirect to="/" />
      }
    </div>
  );
}

export default Auth;
