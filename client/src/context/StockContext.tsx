import React from 'react';

type ContextProps = {
  stock: string;
  setStock: any;
  userInputStock: string;
  setUserInputStock: any;
  theme: string;
  setTheme: any;
};

export const StockContext = React.createContext<Partial<ContextProps>>({});
