import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import venueReducer from './venueReducer';

export default combineReducers({
  auth: authReducer,
  venues: venueReducer,
  form: reduxForm
})