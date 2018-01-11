import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import SignIn from './auth/SignIn';

class App extends Component {

  render() {
    return (
      <div className="container">
        <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/auth/login" component={SignIn} />
        </div>
       </BrowserRouter>
       
       </div>
    );
  }
}

export default App;
