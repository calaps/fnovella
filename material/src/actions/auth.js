import {HTTP} from './../utils/HTTP';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  SET_USER_TYPE
} from './../constants/ActionTypes';

// example action
export function loginRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: LOGIN_SUCCESS,
        data: {
          user: {
            firstName: 'Foo',
            lastName: 'Bar',
            username: 'foobar',
            email: 'foo@bar.com'
          },
          token: 'SomeEncryptedJWT'
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/login', data)
        .then(function (response) {
          dispatch({
            type: LOGIN_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: LOGIN_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function signUpRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: SIGNUP_SUCCESS,
        data: {
          user: {
            firstName: 'Foo',
            lastName: 'Bar',
            username: 'foobar',
            email: 'foo@bar.com'
          },
          token: 'SomeEncryptedJWT'
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/signup', data)
        .then(function (response) {
          dispatch({
            type: SIGNUP_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: SIGNUP_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function getUserDetails(token){
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: GETUSER_SUCCESS,
        data: {
          firstName: 'Foo',
          lastName: 'Bar',
          username: 'foobar',
          email: 'foo@bar.com'
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/getUser', null, {authorization: "Bearer "+token})
        .then(function (response) {
          dispatch({
            type: GETUSER_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: GETUSER_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function setUserType(isOwner){
  return function (dispatch) {
    dispatch({
      type: SET_USER_TYPE,
      data: {
        isOwner
      }
    });
  }
}
