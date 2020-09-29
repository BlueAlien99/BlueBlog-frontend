import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import url from './../api-url';

import stylesForm from './_form.module.css';
import styles from './Register.module.css';


function Register(){

  const history = useHistory();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/auth/register`, {
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
    history.push('/');
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
        <h1>Create an account</h1>
        <form id={stylesForm.form} onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <input type="text" name="username" id="username" value={values.username} onChange={handleChange} />
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={handleChange} />
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={values.password} onChange={handleChange} />
          <button type="submit" className="btn btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
