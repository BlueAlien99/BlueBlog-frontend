import React from 'react';
import styles from './Nav.module.css';

import UserContext from './../contexts/user';

function Nav(){
  return (
    <UserContext.Consumer>
      {({user, setUser}) => (
        <nav id={styles.nav}>
          <p style={{fontSize: '4rem', color: 'white'}}>{user.username}</p>
        </nav>
      )}
    </UserContext.Consumer>
  );
}

export default Nav;