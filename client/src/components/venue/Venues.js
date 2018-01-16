import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchVenues } from '../../actions';

class Venues extends Component {

  componentDidMount(){
    this.props.fetchVenues();
  }

  renderVenues() {
    console.log(this.props.venues)
    return this.props.venues.map(venue => {
      return (
        <li className="list-group-item" key={venue._id}>
          {venue.name}
        </li>
      );
    });
  } 

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <ul className="list-group">
            {this.renderVenues()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { venues: state.venues.list}
}

export default connect(mapStateToProps, {fetchVenues})(Venues);