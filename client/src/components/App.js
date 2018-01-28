import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import SignIn from './auth/SignIn';
import Register from './auth/Register';
import Logout from './auth/Logout';
import Home from './Home';
import Venues from './venue/Venues';
import NewVenue from './venue/NewVenue';

class App extends Component {

  render() {
    return (
      <div className="container">
        <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/home" component={Home} />
          <Route exact path="/venues" component={Venues} />
          <Route exact path="/venues/new" component={NewVenue} />
          <Route exact path="/auth/login" component={SignIn} />
          <Route exact path="/auth/register" component={Register} />
          <Route exact path="/auth/logout" component={Logout} />
        </div>
       </BrowserRouter>
       
       </div>
    );
  }
}

export default App;
