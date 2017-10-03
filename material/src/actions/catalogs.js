import {HTTP} from './../utils/HTTP';

import {
  CATALOGS_ADD_REQUEST,
  CATALOGS_ADD_SUCCESS,
  CATALOGS_ADD_FAIL,
  CATALOGS_DELETE_FAIL,
  CATALOGS_DELETE_REQUEST,
  CATALOGS_DELETE_SUCCESS,
  CATALOGS_GET_FAIL,
  CATALOGS_GET_REQUEST,
  CATALOGS_GET_SUCCESS,
  CATALOGS_UPDATE_FAIL,
  CATALOGS_UPDATE_REQUEST,
  CATALOGS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function catalogsGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: CATALOGS_GET_REQUEST,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/catalogs', data)
        .then(function (response) {
          dispatch({
            type: CATALOGS_GET_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_GET_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function catalogsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: CATALOGS_ADD_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/catalogs', data)
        .then(function (response) {
          dispatch({
            type: CATALOGS_ADD_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_ADD_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function catalogsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: CATALOGS_UPDATE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('put', '/catalogs', data)
        .then(function (response) {
          dispatch({
            type: CATALOGS_UPDATE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_UPDATE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function catalogsDeleteRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: CATALOGS_DELETE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('delete', '/catalogs', data)
        .then(function (response) {
          dispatch({
            type: CATALOGS_DELETE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_DELETE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}
