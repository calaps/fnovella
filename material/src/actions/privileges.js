import {HTTP} from './../utils/HTTP';

import {
  PRIVILEGES_ADD_REQUEST,
  PRIVILEGES_ADD_SUCCESS,
  PRIVILEGES_ADD_FAIL,
  PRIVILEGES_DELETE_FAIL,
  PRIVILEGES_DELETE_REQUEST,
  PRIVILEGES_DELETE_SUCCESS,
  PRIVILEGES_GET_FAIL,
  PRIVILEGES_GET_REQUEST,
  PRIVILEGES_GET_SUCCESS,
  PRIVILEGES_UPDATE_FAIL,
  PRIVILEGES_UPDATE_REQUEST,
  PRIVILEGES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function privilegesGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PRIVILEGES_GET_REQUEST,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/privileges', data)
        .then(function (response) {
          dispatch({
            type: PRIVILEGES_GET_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_GET_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function privilegesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PRIVILEGES_ADD_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/privileges', data)
        .then(function (response) {
          dispatch({
            type: PRIVILEGES_ADD_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_ADD_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function privilegesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PRIVILEGES_UPDATE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('put', '/privileges', data)
        .then(function (response) {
          dispatch({
            type: PRIVILEGES_UPDATE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_UPDATE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function privilegesDeleteRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PRIVILEGES_DELETE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('delete', '/privileges', data)
        .then(function (response) {
          dispatch({
            type: PRIVILEGES_DELETE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_DELETE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}
