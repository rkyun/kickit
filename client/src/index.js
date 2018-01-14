import 'bootstrap/dist/css/bootstrap.css';
import './lib/flat-ui/dist/css/flat-ui.css';
import 'jquery/src/jquery.js';


import 'bootstrap/dist/js/bootstrap.min.js';




import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import actions from './actions';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
<Provider store={store}><App /></Provider>,
 document.getElementById('root'));

