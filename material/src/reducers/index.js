import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import auth from './auth';


const reducers = {
  routing: routerReducer,
  settings,
  auth
};

module.exports = combineReducers(reducers);
