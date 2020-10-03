import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserContext from './contexts/user';

import Nav from './components/Nav';
import Auth from './components/Auth';

import url from './api-url';

function App(){
  const [user, setUser] = useState({
    username: 'Guest',
    isLoggedin: false
  });

  useEffect(() => {
    async function refreshTokenAndLogin(){
      const token = localStorage.getItem('authToken');
      if(!token){
        return;
      }
      const response = await fetch(`${url}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authToken: token })
      });
      if(response.status !== 200){
        return;
      }
      const body = await response.json();
      localStorage.setItem('authToken', body.authToken);
      setUser({
        username: body.username,
        isLoggedin: true
      });
    }
    refreshTokenAndLogin();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <h1>Homepage</h1>
          </Route>
          <Route exact path="/articles">
            <h1>articles</h1>
          </Route>
          <Route exact path="/about">
            <h1>about</h1>
          </Route>
          <Route exact path="/user/:username">
            <h1>user page</h1>
          </Route>
          <Route exact path="/register">
            <Auth mode="register" />
          </Route>
          <Route exact path="/login">
            <Auth mode="login" />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
