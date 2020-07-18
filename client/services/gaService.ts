import ReactGA from 'react-ga'

const loginSuccessEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'User successfully logged in',
  })
}

const loginFailedEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'User failed to login',
  })
}

const registerSuccessEvent = () => {
  ReactGA.event({
    category: 'Register',
    action: 'User successfully signed up',
  })
}

const registerFailedEvent = () => {
  ReactGA.event({
    category: 'Register',
    action: 'User failed to sign up',
  })
}

const addInstrumentSuccessEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User successfully added an instrument',
  })
}

const addInstrumentFailedEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User failed to add an instrument',
  })
}

const updateInstrumentSuccessEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User successfully updated an instrument',
  })
}

const updateInstrumentFailedEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User failed to update an instrument',
  })
}

const deleteInstrumentSuccessEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User successfully deleted an instrument',
  })
}

const deleteInstrumentFailedEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User failed to delete an instrument',
  })
}

const viewStockchartEvent = () => {
  ReactGA.event({
    category: 'Stockchart',
    action: 'User viewed a stockchart',
  })
}

const themeUpdateSuccessEvent = () => {
  ReactGA.event({
    category: 'Theme',
    action: 'User successfully updated theme',
  })
}

const themeUpdateFailedEvent = () => {
  ReactGA.event({
    category: 'Theme',
    action: 'User failed to update theme',
  })
}

const resetPasswordRequestEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User requested password reset email',
  })
}

const resetPasswordSuccessEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User successfully reset password',
  })
}

const resetPasswordFailedEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User failed to reset password',
  })
}

const usernameUpdatedSuccessEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User successfully changed username',
  })
}

const usernameUpdatedFailedEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User failed to changed username',
  })
}

const emailUpdatedSuccessEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User successfully updated email',
  })
}

const emailUpdatedFailedEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User failed to update email',
  })
}

const passwordUpdatedSuccessEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User successfully changed password',
  })
}

const passwordUpdatedFailedEvent = () => {
  ReactGA.event({
    category: 'Account',
    action: 'User failed to change password',
  })
}

export const gaService = {
  loginSuccessEvent,
  loginFailedEvent,
  registerSuccessEvent,
  registerFailedEvent,
  addInstrumentSuccessEvent,
  addInstrumentFailedEvent,
  updateInstrumentSuccessEvent,
  updateInstrumentFailedEvent,
  deleteInstrumentSuccessEvent,
  deleteInstrumentFailedEvent,
  viewStockchartEvent,
  themeUpdateSuccessEvent,
  themeUpdateFailedEvent,
  resetPasswordRequestEvent,
  resetPasswordSuccessEvent,
  resetPasswordFailedEvent,
  usernameUpdatedSuccessEvent,
  usernameUpdatedFailedEvent,
  emailUpdatedSuccessEvent,
  emailUpdatedFailedEvent,
  passwordUpdatedSuccessEvent,
  passwordUpdatedFailedEvent
}
