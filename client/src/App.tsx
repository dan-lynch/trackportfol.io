import React from 'react';
import Router from './Router';
import Layout from 'layout/MainLayout';
import { StockContext } from 'context/StockContext';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  state = {
    stock: '',
    setStock: (value: string) => this.setState({ stock: value }),
    userInputStock: '',
    setUserInputStock: (value: string) => this.setState({ userInputStock: value }),
    theme: 'dark',
    setTheme: (value: string) => this.setState({ theme: value }),
  };

  render() {
    return (
      <StockContext.Provider value={this.state}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </StockContext.Provider>
    );
  }
}

export default App;
