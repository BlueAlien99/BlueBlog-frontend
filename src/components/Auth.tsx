import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import UserContext from './../contexts/user';

import url from '../api-url';

import LabelTextInput from './_LabelTextInput';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setValues(prevVals => ({
      ...prevVals,
      [name]: value
    }));
  }

  return (
    <div className="route">
      <div className="container page-small-width">
        <h1 className="form-title">{props.mode === 'register' ? 'Create an account' : 'Welcome back!'}</h1>
        <form onSubmit={handleSubmit}>
          {props.mode === 'register' &&
            <LabelTextInput type="text" name="username" value={values.username} onChange={handleChange} autoComplete="off" />
          }
          <LabelTextInput type="email" name="email" value={values.email} onChange={handleChange} />
          <LabelTextInput type="password" name="password" value={values.password} onChange={handleChange} />
          <button type="submit" className="btn btn-submit w100">{props.mode === 'register' ? 'Register' : 'Login'}</button>
        </form>
        {props.mode === 'register'
          ? <p className="mt1em fs085rem muted">Already have an account? <Link to='/login'>Login</Link></p>
          : <p className="mt1em fs085rem muted">Need an account? <Link to='/register'>Register</Link></p>
        }
      </div>
      {user.isLoggedin &&
        <Redirect to="/" />
      }
    </div>
  );
}

export default Auth;
