import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';

import { withRouter } from 'react-router-dom';

import validator from 'validator';

import * as actions from '../../actions';

import { connect } from 'react-redux';



class Register extends Component {

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">{this.props.errorMessage}</div>
      );
    }
    
  }

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
    this.props.registerUser({ email, password, provider:'local' }, history);
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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

          <Field
            label="Confirm password"
            name="confirmPassword"
            type="password"
            component={this.renderField}
          />
                 
          {this.renderAlert()}
          <button className="btn btn-primary" action="submit">Sign up</button>
          </form>
        </div>
      </div>
    )
  }


}

function validate(values) {
  const errors = {};
  const { email, password, confirmPassword } = values;

  if(!email){
    errors.email = 'Email is required!';
  }

  if (email && !validator.isEmail(email)){
    errors.email = 'It\'s not correct email address';
  }

  if(!password) {
    errors.password = 'Password is required!';
  }

  if(!password) {
    errors.password = 'Confirm your password!';
  }

  if(confirmPassword && password && password !== confirmPassword){
    errors.confirmPassword = 'Given passwords dont match';
  }

  return errors;

}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'register',
  validate
})(
  connect(mapStateToProps, actions)((withRouter(Register)))
);