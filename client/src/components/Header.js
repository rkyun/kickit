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
        <li><a href="/auth/login">Login</a></li>,
        <li><a href="/auth/register">Register</a></li>
        ];
      default:
        return [
            <li><a href="/">Matches</a></li>,
            <li><a href="/">Venues</a></li>,
            <li><a href="/">Players</a></li>
        ];
    }
  }
  render() {
    return (
       <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Logo</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}


export default Header;
