import React, { createContext } from 'react';

interface User{
  username: string,
  isLoggedin: boolean
}

interface UserContextInterface{
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const userContext: UserContextInterface = {
  user: {
    username: '',
    isLoggedin: false
  },
  setUser: () => {}
};

const UserContext = createContext(userContext);

export default UserContext;