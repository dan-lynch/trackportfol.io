import React, { useEffect } from 'react'
import { auth } from 'services/authService'

export const AppContext = React.createContext<Partial<ContextProps>>({})

const ContextProvider = ({ children }: any) => {
  const [signupEmail, setSignupEmail] = React.useState<string>('')
  const [stock, setStock] = React.useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
  const [resetPassSuccess, setResetPassSuccess] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<firebase.User | undefined | null>(null)

  const contextProps: Partial<ContextProps> = {
    signupEmail,
    setSignupEmail,
    stock,
    setStock,
    isDarkTheme,
    setIsDarkTheme,
    isLoggedIn,
    setIsLoggedIn,
    resetPassSuccess,
    setResetPassSuccess,
    user,
    setUser
  }

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      setUser(userAuth);
    });
  }, [])

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
}

type ContextProps = {
  signupEmail: string
  setSignupEmail: any
  stock: string
  setStock: any
  isDarkTheme: boolean
  setIsDarkTheme: any
  isLoggedIn: boolean
  setIsLoggedIn: any
  resetPassSuccess: boolean
  setResetPassSuccess: any,
  user: firebase.User | null,
  setUser: any
}

export default ContextProvider