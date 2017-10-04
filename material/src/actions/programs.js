import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_ADD_REQUEST,
  PROGRAM_ADD_SUCCESS,
  PROGRAM_ADD_FAIL,
  PROGRAM_DELETE_FAIL,
  PROGRAM_DELETE_REQUEST,
  PROGRAM_DELETE_SUCCESS,
  PROGRAM_GET_FAIL,
  PROGRAM_GET_REQUEST,
  PROGRAM_GET_SUCCESS,
  PROGRAM_UPDATE_FAIL,
  PROGRAM_UPDATE_REQUEST,
  PROGRAM_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function programGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PROGRAM_GET_REQUEST,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('get', '/program', data)
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PROGRAM_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_GET_FAIL,
            error: error
          });
          reject(response.data);
        })
    }})
  }
}

export function programAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PROGRAM_ADD_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/program', data)
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PROGRAM_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_ADD_FAIL,
            error: error
          });
          reject(response.data);
        })
    }})
  }
}

export function programUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PROGRAM_UPDATE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/', data)
        .then(function (response) {
          dispatch({
            type: PROGRAM_UPDATE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_UPDATE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}

export function programDeleteRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PROGRAM_DELETE_SUCCESS,
        data: {
        }
      });
      resolve(true);
      return;

      // API
      HTTP('post', '/', data)
        .then(function (response) {
          dispatch({
            type: PROGRAM_DELETE_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_DELETE_FAIL,
            error: error
          });
          reject(false);
        })
    }})
  }
}
