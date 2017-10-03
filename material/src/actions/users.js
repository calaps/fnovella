import {HTTP} from './../utils/HTTP';

import {
  USERS_ADD_REQUEST,
  USERS_ADD_SUCCESS,
  USERS_ADD_FAIL,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_GET_FAIL,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_UPDATE_FAIL,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function usersGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: USERS_GET_REQUEST,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/users', data)
        .then(function (response) {
          dispatch({
            type: USERS_GET_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: USERS_GET_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function usersAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: USERS_ADD_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/users', data)
        .then(function (response) {
          dispatch({
            type: USERS_ADD_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: USERS_ADD_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function usersUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: USERS_UPDATE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('put', '/users', data)
        .then(function (response) {
          dispatch({
            type: USERS_UPDATE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: USERS_UPDATE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function usersDeleteRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: USERS_DELETE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('delete', '/users', data)
        .then(function (response) {
          dispatch({
            type: USERS_DELETE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: USERS_DELETE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}
