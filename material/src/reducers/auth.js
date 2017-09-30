
/* Actions */
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  SET_USER_TYPE,
  LOG_OUT
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const auth_reducer = (state = initialState.auth, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      console.log(LOGIN_SUCCESS)
      localStorage.setItem('@fnovella:token', action.data.token);
      return Object.assign(
        {},
        state,
        {
          user: action.data.user
        }
      );
    case LOGIN_FAIL:
      // TODO: some alert may be
      return state;

    case SIGNUP_SUCCESS:
      console.log(SIGNUP_SUCCESS)
      localStorage.setItem('@fnovella:token', action.data.token);
      return Object.assign(
        {},
        state,
        {
          user: action.data.user
        }
      );
    case SIGNUP_FAIL:
      // TODO: some alert may be
      return state;
    case GETUSER_SUCCESS:
      console.log(GETUSER_SUCCESS);
      return Object.assign(
        {},
        state,
        {
          user: action.data
        }
      );
    case GETUSER_FAIL:
      return state;
    case SET_USER_TYPE:
      return Object.assign(
        {},
        state,
        {}
      );
    case LOG_OUT:
      console.log(LOG_OUT)
      localStorage.removeItem('@fnovella:token');
      return Object.assign(
        {},
        state,
        {
          user: null
        }
      );
    default:
      return state;
  }
}

export default auth_reducer;
