import {HTTP} from './../utils/HTTP';

import {
  SEDES_ADD_REQUEST,
  SEDES_ADD_SUCCESS,
  SEDES_ADD_FAIL,
  SEDES_DELETE_FAIL,
  SEDES_DELETE_REQUEST,
  SEDES_DELETE_SUCCESS,
  SEDES_GET_FAIL,
  SEDES_GET_REQUEST,
  SEDES_GET_SUCCESS,
  SEDES_UPDATE_FAIL,
  SEDES_UPDATE_REQUEST,
  SEDES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function sedesGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: SEDES_GET_REQUEST,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/sedes', data)
        .then(function (response) {
          dispatch({
            type: SEDES_GET_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: SEDES_GET_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function sedesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: SEDES_ADD_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/sedes', data)
        .then(function (response) {
          dispatch({
            type: SEDES_ADD_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: SEDES_ADD_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function sedesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: SEDES_UPDATE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('put', '/sedes', data)
        .then(function (response) {
          dispatch({
            type: SEDES_UPDATE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: SEDES_UPDATE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function sedesDeleteRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: SEDES_DELETE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('delete', '/sedes', data)
        .then(function (response) {
          dispatch({
            type: SEDES_DELETE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: SEDES_DELETE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}
