import { FETCH_VENUES, ADD_VENUE, ADD_VENUE_ERROR } from '../actions/types';

export default function(state = {list: []}, action) {
  console.log(action.payload, 'reducer');
  switch(action.type) {
    case FETCH_VENUES:
      return {...state, list: action.payload.data }
    case ADD_VENUE_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}