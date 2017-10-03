import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import auth from './auth';
import programs from './programs';

const reducers = {
  routing: routerReducer,
  settings,
  auth,
  programs
};

module.exports = combineReducers(reducers);
