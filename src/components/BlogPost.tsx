import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import url from '../api-url';

import styles from './cssModules/BlogPost.module.css';

function BlogPost(){

  const history = useHistory();
  const params: {id: string} = useParams();

  const [values, setValues] = useState({
    title: 'Title',
    subtitle: 'Subtitle',
    markdown: 'Markdown'
  });

  useEffect(() => {
    async function fetchBlogPost(){
      const res = await fetch(`${url}/api/blog/get/${params.id}`);
      if(res.status !== 200){
        // TODO: see below
        alert('TODO: Blog post not found or another error');
        return;
      }
      const body = await res.json();
      if(body && body.slug){
        setValues(body);
        history.replace(`/post/${params.id}/${body.slug}`);
      }
    }
    fetchBlogPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="route">
      <div className="container page-max-width page-max-height">
        <h1>{values.title}</h1>
        <h2>{values.subtitle}</h2>
        <div id={styles.markdown} dangerouslySetInnerHTML={{__html: values.markdown}}></div>
      </div>
    </div>
  );
}

export default BlogPost;