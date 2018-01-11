import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


class Header extends Component {

  renderLinks(){
    switch(false){
      case null:
        return;
      case false:
        return [
        <li key="1"><a href="/auth/login">Login</a></li>,
        <li key="2"><a href="/auth/register">Register</a></li>
        ];
      default:
        return [
            <li key="1"><a href="/">Matches</a></li>,
            <li key="2"><a href="/">Venues</a></li>,
            <li key="3"><a href="/">Players</a></li>
        ];
    }
  }
  render() {
    return (
       <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}


export default Header;
