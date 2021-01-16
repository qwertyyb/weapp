const reduxLogger = require('redux-logger').createLogger();
const { createStore, combineReducers, applyMiddleware } = require('../lib/redux');
const { thunk } = require('./middlewares');
const { userinfoReducer, runtimeReducer } = require('./reducers');

module.exports = createStore(
  combineReducers({
    userinfo: userinfoReducer,
    runtime: runtimeReducer,
  }),
  applyMiddleware(thunk, reduxLogger),
);
