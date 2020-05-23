import React from 'react';

type ContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  signupEmail: string;
  setSignupEmail: any;
  stock: string;
  setStock: any;
  userInputStock: string;
  setUserInputStock: any;
  theme: string;
  setTheme: any;
};

export const AppContext = React.createContext<Partial<ContextProps>>({});
