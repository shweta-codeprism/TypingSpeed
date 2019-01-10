import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from 'store';
import TypeSpeed from 'views/typeSpeed';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TypeSpeed />
      </Provider>
    );
  }
}

export default App;
