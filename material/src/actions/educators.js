import {HTTP} from './../utils/HTTP';

import {
  EDUCATORS_ADD_REQUEST,
  EDUCATORS_ADD_SUCCESS,
  EDUCATORS_ADD_FAIL,
  EDUCATORS_DELETE_FAIL,
  EDUCATORS_DELETE_REQUEST,
  EDUCATORS_DELETE_SUCCESS,
  EDUCATORS_GET_FAIL,
  EDUCATORS_GET_REQUEST,
  EDUCATORS_GET_SUCCESS,
  EDUCATORS_UPDATE_FAIL,
  EDUCATORS_UPDATE_REQUEST,
  EDUCATORS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function educatorsGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: EDUCATORS_GET_REQUEST,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/educators', data)
        .then(function (response) {
          dispatch({
            type: EDUCATORS_GET_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_GET_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function educatorsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: EDUCATORS_ADD_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/educators', data)
        .then(function (response) {
          dispatch({
            type: EDUCATORS_ADD_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_ADD_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function educatorsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: EDUCATORS_UPDATE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('put', '/educators', data)
        .then(function (response) {
          dispatch({
            type: EDUCATORS_UPDATE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_UPDATE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function educatorsDeleteRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: EDUCATORS_DELETE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('delete', '/educators', data)
        .then(function (response) {
          dispatch({
            type: EDUCATORS_DELETE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_DELETE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}
