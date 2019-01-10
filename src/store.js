/*  @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reduxReducers';


const middleware = [
  thunk
];


const composedEnhancers = compose(
  applyMiddleware(...middleware),
);

const store = createStore(
  rootReducer,
  composedEnhancers
);


export default store;
