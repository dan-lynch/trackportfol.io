import React from 'react';
import Router from './Router';
import Layout from 'layout/MainLayout';
import { AppContext } from 'context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { userService } from 'services/userService';

const lightTheme = createMuiTheme({
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends React.Component {
  state = {
    isLoggedIn: !!userService.loggedInUser,
    setIsLoggedIn: (value: boolean) => this.setState({ isLoggedIn: value }),
    stock: '',
    setStock: (value: string) => this.setState({ stock: value }),
    userInputStock: '',
    setUserInputStock: (value: string) => this.setState({ userInputStock: value }),
    theme: 'light',
    setTheme: (value: string) => this.setState({ theme: value }),
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <BrowserRouter>
        <ThemeProvider theme={this.state.theme === 'dark' ? darkTheme : lightTheme}>
          <Layout>
            <Router />
          </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

export default App;
