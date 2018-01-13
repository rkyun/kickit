import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

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
        </div>
      </div>
    )
  }

  handleFormSubmit({ username, password }) {
    const { history } = this.props;
    this.props.signInUser({ username, password }, history);
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

export default reduxForm({
    form: 'signin'
  })(
    connect(mapStateToProps, actions)((withRouter(SignIn)))
  );