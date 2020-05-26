import React from 'react';

type ContextProps = {
  signupEmail: string;
  setSignupEmail: any;
  stock: string;
  setStock: any;
  theme: string;
  setTheme: any;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  userService: any;
};

export const AppContext = React.createContext<Partial<ContextProps>>({});
