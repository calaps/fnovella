import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import auth from './auth';
import programs from './programs';
import catalogs from './catalogs';
import educators from './educators';
import privileges from './privileges';
import sedes from './sedes';
import users from './users';
import participants from './participants';
import programActivations from './programActivations';
import participantContacts from './participantContacts';
const reducers = {
  routing: routerReducer,
  settings,
  auth,
  programs,
  catalogs,
  educators,
  privileges,
  participants,
  programActivations,
  sedes,
  users,
  participantContacts
};

module.exports = combineReducers(reducers);
