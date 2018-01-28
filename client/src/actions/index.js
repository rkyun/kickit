import axios from 'axios';


import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_VENUES, ADD_VENUE, ADD_VENUE_ERROR } from './types';



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
      .catch((error)=>{
         dispatch(authError('Bad credentials'));
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
      .catch((error)=>{
        console.log(error);
         dispatch(authError(error.response.data.error))
      });
  }
}

export function Logout(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function authError(error) {
  console.log('error', error);
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchVenues(){
  return function(dispatch) {
    axios.get('/api/venues')
      .then(venues => {
        console.log(venues , 'dasdas');
        dispatch({
          type: FETCH_VENUES,
          payload: venues
        });
      });
  }
}

export function newVenueError(error) {
  
  return {
    type: ADD_VENUE_ERROR,
    payload: error
  }
}

export function newVenue({name, address, description, coordinates}, history){
  const token = localStorage.getItem('token');
  return function(dispatch) {
    axios.post('/api/venues', {name, address, description, coordinates}, {
      headers: {Authorization: token }
    })
      .then(response => {
        dispatch({
          type: ADD_VENUE,
        });

        history.push('/venues')
      }).catch(error => {
        dispatch(newVenueError(error.response.data.error))
      });
  }
}