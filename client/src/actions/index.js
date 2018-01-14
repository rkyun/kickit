import axios from 'axios';


import { AUTH_USER } from './types';



export function signInUser({email, password}, history) {
  console.log(email, password, 'history');
  return function(dispatch) {

    axios.post('/api/auth/login', {email, password})
      .then(response => {
        console.log(response);

        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);

        history.push('/');
      })
      .catch((err)=>{
        console.log(err,'error :(');
      });

  }
}

export function registerUser({email, password, provider}, history) {
  return function(dispatch) {
    axios.post('/api/auth/register', {email, password, provider})
      .then(response => {
        dispatch({type: AUTH_USER});
        
        localStorage.setItem('token', response.data.token);

        history.push('/')
      })
      .catch(()=>{
        console.log('error :(');
      })
  }
}