import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';

import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';

import { connect } from 'react-redux';

class Register extends Component {

  

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

  handleFormSubmit({ username, password }) {
    const { history } = this.props;
    this.props.registerUser({ username, password, provider:'local' }, history);
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            label="Username"
            name="username"
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

          

          <button className="btn btn-primary" action="submit">Sign up</button>
          </form>
        </div>
      </div>
    )
  }


}

function validate(values) {
  const errors = {};
  const { username, password, confirmPassword } = values;

  if(!username){
    errors.username = 'Username is required!';
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