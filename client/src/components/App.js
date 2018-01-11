import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';

class App extends Component {

  render() {
    return (
       <Header />
    );
  }
}

export default App;
