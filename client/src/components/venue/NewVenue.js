import React , { Component } from 'react';

import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form';

import * as actions from '../../actions';

import { withRouter } from 'react-router-dom';

import GoogleMapReact from 'google-map-react';

const { googleMapLoader }  = GoogleMapReact;


const bootstrapURLKeys = {
  libraries: ['places'].join(','),
}


const Marker = () => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 20, width: 20, top: -20, left: -30,
    borderRadius: 50   
  }}>
  </div>
);


class NewVenue extends Component {

  

  constructor(props){
    super(props);
    this.state = {
      center: {lat: 50.79646, lng: 19.12409}
    }

    this.onPlacesChanged = () => {
      const place = this.autocomplete.getPlace();
      this.setState({center: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }});
      
    }

    googleMapLoader(bootstrapURLKeys)
        .then((maps) => {
          this.autocomplete = new maps.places.Autocomplete(document.getElementById('ac'));
          this.autocomplete.addListener('place_changed', this.onPlacesChanged);
        });
  }

  renderField(field){
    const { meta: { touched, error } } = field;

    return (
      <div className="row">
        <div className="form-group col-md-12">
          <label>{field.label}</label>
          <input 
            type={field.type}
            {...field.input}
            id={field.id}
            className="form-control"
            />
            {touched && error && <small style={{color: 'red'}}>{error}</small>}
        </div>
      </div>
    );
  }

  renderTextArea(field){
    const { meta: { touched, error } } = field;

    return (
      <div className="row">
        <div className="form-group col-md-12">
          <label>{field.label}</label>
          <textarea 
            type={field.type}
            {...field.input}
            className="form-control"
            >
          </textarea>
          {touched && error && <small style={{color: 'red'}}>{error}</small>}
        </div>
      </div>
    );
  }

  renderAlert() {

    console.log(this.props.errorMessage);
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Upss!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSubmit({name, address, description}){
    const { history } = this.props;
    this.props.newVenue({name, address, description, coordinates: {lat: this.state.center.lat, long: this.state.center.lng}}, history);
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            label="Name"
            name="name"
            type="text"
            component={this.renderField}
          />
          <Field 
            label="Address"
            name="address"
            type="text"
            id="ac"
            component={this.renderField}
          />
          <Field
            label="Description"
            name="description"
            type="text"
            component={this.renderTextArea}
          />

          {this.renderAlert()}
          <button className="btn btn-primary" action="submit">
            Save
          </button>
          </form>
        </div>
        
        <div className="col-md-8" style={ {height: '400px'}}>
          <GoogleMapReact
            center={this.state.center}
            defaultZoom={16}
          >
           {this.props.venues.map(venue => {
             return (
               <Marker lat={venue.coordinates.lat} lng={venue.coordinates.long} />
             )
           })}
          <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
           
          </GoogleMapReact>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return { errorMessage: state.venues.error,
          venues: state.venues.list }
}


export default reduxForm({
form: 'new-venue'
})(
  connect(mapStateToProps, actions)(withRouter(NewVenue))
);