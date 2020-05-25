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

export const gaService = {
  loginSuccessEvent,
  loginFailedEvent,
  registerSuccessEvent,
  registerFailedEvent
};
