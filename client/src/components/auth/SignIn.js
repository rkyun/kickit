import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import validator from 'validator';

import {withRouter} from 'react-router-dom';

import * as actions from '../../actions';

import { connect } from 'react-redux';



class SignIn extends Component {
  
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div className="row">
        <div className='form-group col-md-12'>
          <label>{field.label}</label>
          <input
            type={field.type}
            {...field.input}
            className="form-control"
          />   
          {touched && error && <small style={{color: 'red'}}>{error}</small>}      
        </div>
      </div>
    )
  }

  handleFormSubmit({ email, password }) {
    const { history } = this.props;
    this.props.signInUser({ email, password }, history);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Upss!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
      <div className="col-md-6 col-md-offset-3">

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="col s12">

          <Field
            label="Email"
            name="email"
            type="text"
            component={this.renderField}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            component={this.renderField}
          />
            {this.renderAlert()}
          <button className="btn btn-primary" action="submit">Sign In</button>

        </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

function validate(values){
  const errors = {}


  const { email, password } = values;

  
  if(!email){
    errors.email ='Type your email!';
  }

  if(email){
    console.log(validator.isEmail(email));
  }

  if(email && !validator.isEmail(email)){
    errors.email='It\'s not corrent email address';
  }

  if(!password) {
    errors.password = 'Type your password!';
  }

  console.log(values);

  return errors;

}

export default reduxForm({
    form: 'signin',
    validate
  })(
    connect(mapStateToProps, actions)((withRouter(SignIn)))
  );