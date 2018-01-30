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
import courses from './courses';
import grades from './grades';
import workshops from './workshops';
import dashboard from './dashboard';
import categories from './categories';
import divisions from './divisions';
import sections from './sections';
import programLocations from './programLocations';
import programInstructors from './programInstructors';
import progress from './progress';
import snackBar from './snackBar';
import programAdditionalFields from './programAdditionalFields';
import groups from './groups';
import participantAdditionalFiels from './participantAdditionalFields';
import inscriptions from './inscriptions';
import inscriptionParticipants from './inscriptionParticipants';
import assistance from './assistance';
import assistanceParticipant from './assistanceParticipant';
import indicators from './indicators';

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
  participantContacts,
  courses,
  grades,
  workshops,
  dashboard,
  categories,
  divisions,
  sections,
  programLocations,
  programInstructors,
  progress,
  snackBar,
  programAdditionalFields,
  groups,
  indicators,
  participantAdditionalFiels,
  inscriptions,
  inscriptionParticipants,
  assistance,
  assistanceParticipant
};

module.exports = combineReducers(reducers);
