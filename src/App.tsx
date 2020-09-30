import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserContext from './contexts/user';

import Nav from './components/Nav';
import Auth from './components/Auth';

function App(){
  const [user, setUser] = useState({
    username: 'Guest',
    isLoggedin: false
  });

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Nav />
        <Switch>
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
