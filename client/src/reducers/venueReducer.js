import { FETCH_VENUES } from '../actions/types';

export default function(state = {list: []}, action) {
  switch(action.type) {
    case FETCH_VENUES:
      return {...state, list: action.payload.data }
    default:
      return state
  }
}