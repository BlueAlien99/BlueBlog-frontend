import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Register from './components/Register';

function App(){
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
