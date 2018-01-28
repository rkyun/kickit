import React , { Component } from 'react';

import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form';

import * as actions from '../../actions';

import { withRouter } from 'react-router-dom';

import GoogleMapReact from 'google-map-react';


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
    this.props.newVenue({name, address, description}, history);
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
            defaultCenter={this.state.center}
            defaultZoom={12}
          >
           
          <Marker lat={59.95} lng={30.33} />
           
          </GoogleMapReact>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return { errorMessage: state.venues.error}
}


export default reduxForm({
form: 'new-venue'
})(
  connect(mapStateToProps, actions)(withRouter(NewVenue))
);