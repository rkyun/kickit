import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import SignIn from './auth/SignIn';
import Register from './auth/Register';

class App extends Component {

  render() {
    return (
      <div className="container">
        <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/auth/login" component={SignIn} />
          <Route exact path="/auth/register" component={Register} />
        </div>
       </BrowserRouter>
       
       </div>
    );
  }
}

export default App;
