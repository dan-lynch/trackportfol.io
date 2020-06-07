import ReactGA from 'react-ga';

const loginSuccessEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'User successfully logged in',
  });
};

const loginFailedEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'User failed to login',
  });
};

const registerSuccessEvent = () => {
  ReactGA.event({
    category: 'Register',
    action: 'User successfully signed up',
  });
};

const registerFailedEvent = () => {
  ReactGA.event({
    category: 'Register',
    action: 'User failed to sign up',
  });
};

const addInstrumentSuccessEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User successfully added an instrument',
  });
};

const addInstrumentFailedEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User failed to add an instrument',
  });
};

const updateInstrumentSuccessEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User successfully updated an instrument',
  });
};

const updateInstrumentFailedEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User failed to update an instrument',
  });
};

const deleteInstrumentSuccessEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User successfully deleted an instrument',
  });
};

const deleteInstrumentFailedEvent = () => {
  ReactGA.event({
    category: 'Instrument',
    action: 'User failed to delete an instrument',
  });
};

const viewStockchartEvent = () => {
  ReactGA.event({
    category: 'Stockchart',
    action: 'User searched a stock and loaded a stockchart',
  });
};

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
};
