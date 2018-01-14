
import { AUTH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {}, action) {
  console.log(action.type, action.payload, 'reducer');
  switch(action.type){
    case AUTH_USER:
      return {...state, authenticated: true, error: ''}
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload};
    default:
      return state;
  }
}