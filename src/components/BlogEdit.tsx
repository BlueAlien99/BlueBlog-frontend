import React, {useState, useContext} from 'react';

import UserContext from '../contexts/user';

import url from '../api-url';

import LabelTextInput from './_LabelTextInput';

import styles from './cssModules/BlogEdit.module.css';
import { useHistory } from 'react-router-dom';

function BlogEdit(){

  const history = useHistory();

  const {user} = useContext(UserContext);

  const [values, setValues] = useState({
    title: '',
    subtitle: '',
    content: ''
  });

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');

    const res = await fetch(`${url}/api/blog/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ authToken, blog: values })
    });
    if(res.status !== 200){
      const msg = await res.text();
      return alert(msg);
    }
    const body = await res.json();
    if(body && body.id){
      history.push(`/post/${body.id}`);
    } else{
      alert('Something went wrong although everything went fine');
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
      <div className="container page-max-width page-max-height" id={styles.container}>
        <h1 className="form-title">Edit post</h1>
        <form onSubmit={handleSubmit}>
          <LabelTextInput type="text" name="title" value={values.title} onChange={handleChange} autoComplete="off" />
          <LabelTextInput textarea="true" name="subtitle" value={values.subtitle} onChange={handleChange} />
          <LabelTextInput textarea="true" inputClass="code" name="content" value={values.content} onChange={handleChange} />
          <div id={styles.buttons}>
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
            <button type="button" className="btn btn-submit">Preview</button>
            <button type="submit" className="btn btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogEdit;