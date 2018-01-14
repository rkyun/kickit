import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class Header extends Component {

  renderLinks() {
    switch (this.props.authenticated) {
      case true:
        return [
          <li key="1"><Link to="/home">Profile</Link></li>,
          <li key="3"><Link to="/auth/logout">Logout</Link></li>
        ];
      case false:
        return [
          <li key="1"><Link to="/auth/login">Login</Link></li>,
          <li key="2"><Link to="/auth/register">Register</Link></li>
        ];
      default:
        return [
          <li key="1"><Link to="/auth/login">Login</Link></li>,
          <li key="2"><Link to="/auth/register">Register</Link></li>
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
                <Link className="navbar-brand" to="/home">KICKIT</Link>
              </div>
              <div className="collapse navbar-collapse" id="navbar-collapse-01">
                <ul className="nav navbar-nav navbar-left">
                   <li key="1"><Link to="#">Matches</Link></li>,
                   <li key="2"><Link to="#">Venues</Link></li>
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

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, null)(Header)
