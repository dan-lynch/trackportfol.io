import React from 'react';
import Router from './Router';
import { AppContext } from 'context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { userService } from 'services/userService';
import ReactGA from 'react-ga';
import { GA_ID } from 'helpers/constants';

const lightTheme = createMuiTheme({});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const trackingId = GA_ID;
ReactGA.initialize(trackingId);

class App extends React.Component {
  state = {
    signupEmail: '',
    setSignupEmail: (value: string) => this.setState({ signupEmail: value }),
    stock: '',
    setStock: (value: string) => this.setState({ stock: value }),
    theme: 'light',
    setTheme: (value: string) => this.setState({ theme: value }),
    isLoggedIn: userService.isLoggedIn,
    setIsLoggedIn: (value: boolean) => this.setState({ isLoggedIn: value }),
    userService: userService,
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <ThemeProvider theme={this.state.theme === 'dark' ? darkTheme : lightTheme}>
          <BrowserRouter>
              <Router />
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}

export default App;
