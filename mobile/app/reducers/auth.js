
import { AsyncStorage } from 'react-native';
import initialState from '../store/initialState';
/* Actions */
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GETUSER_SUCCESS,
    GETUSER_FAIL,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    SET_USER_TYPE
} from './../constants/actionTypes';

  
const auth_reducer = (state = initialState.auth, action) => {    
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS")
            // store token in asyncstorage
            AsyncStorage.setItem('@Axle:token', action.data.token);
            console.log(action.data.token);
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

            case LOG_OUT_SUCCESS:
            console.log(LOG_OUT_SUCCESS)
            AsyncStorage.removeItem('@Axle:token');
            return Object.assign(
              {},
              state,
              {
                user: null
              }
            );
          case LOG_OUT_FAIL:
            return state;
          
        case SIGNUP_SUCCESS:
            console.log("SIGNUP_SUCCESS")
            return Object.assign(
                {},
                state,
                {
                    isLoggedIn: true,
                    user: action.data.user,
                    token: action.data.token
                }
            );
        case SIGNUP_FAIL:
            // TODO: some alert may be
            return state;
        case GETUSER_SUCCESS:
            console.log('GETUSER_SUCCESS');
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
                {
                    isOwner: action.data.isOwner
                }
            );
        default:
            return state;
    }
}

export default auth_reducer;