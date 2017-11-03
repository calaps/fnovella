import { combineReducers } from 'redux';
import auth from './auth';
import dashboard from './dashboard';
import programs from './program';
import users from './user';

export default combineReducers({
    auth,
    dashboard,
    programs,
    users,
});
