import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import UserContext from './../contexts/user';

import styles from './cssModules/Nav.module.css';

function Nav(){
  
  const {user, setUser} = useContext(UserContext);

  const handleLogout = () => {
    setUser({
      username: 'Guest',
      isLoggedin: false
    });
    localStorage.removeItem('authToken');
  }

  return (
    <nav id={styles.nav}>
      <div id={styles.blogName}>BlueBlog</div>
      <ul id={styles.menu}>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/posts">Posts</NavLink></li>
        <li><NavLink exact to="/about">About</NavLink></li>
        {user.isLoggedin &&
          <li><NavLink exact to={`/user/${user.username}`}>My Profile</NavLink></li>
        }
      </ul>
      <div id={styles.accountControl}>
        {user.isLoggedin &&
          <>
            <p id={styles.username}>{user.username}</p>
            <button id={styles.logoutBtn} className="a" onClick={handleLogout}>Log out</button>
          </>
        }
        {!user.isLoggedin &&
          <NavLink exact to="/login" id={styles.loginBtn}>Login</NavLink>
        }
      </div>
    </nav>
  );
}

export default Nav;