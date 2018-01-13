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
      <div className="row">
        <div className="col-xs-12">
            <nav className="navbar navbar-inverse navbar-embossed" role="navigation">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
                  <span className="sr-only">Toggle navigation</span>
                </button>
                <a className="navbar-brand" href="#">KICKIT</a>
              </div>
              <div className="collapse navbar-collapse" id="navbar-collapse-01">
                <ul className="nav navbar-nav navbar-left">
                //app links
                </ul>
                <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
                </ul>
              </div>
            </nav>
          </div>
      </div>
    );
  }
}


export default Header;
