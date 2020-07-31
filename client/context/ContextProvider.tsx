import React from 'react'

export const AppContext = React.createContext<Partial<ContextProps>>({})

const ContextProvider = ({ children }: any) => {
  const [signupEmail, setSignupEmail] = React.useState<string>('')
  const [stock, setStock] = React.useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false)
  const [resetPassSuccess, setResetPassSuccess] = React.useState<boolean>(false)

  const contextProps: Partial<ContextProps> = {
    signupEmail,
    setSignupEmail,
    stock,
    setStock,
    isDarkTheme,
    setIsDarkTheme,
    resetPassSuccess,
    setResetPassSuccess,
  }

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
}

type ContextProps = {
  signupEmail: string
  setSignupEmail: any
  stock: string
  setStock: any
  isDarkTheme: boolean
  setIsDarkTheme: any
  resetPassSuccess: boolean
  setResetPassSuccess: any
}

export default ContextProvider
