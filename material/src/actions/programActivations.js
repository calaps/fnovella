import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_ACTIVATIONS_GET_REQUEST,
  PROGRAM_ACTIVATIONS_GET_SUCCESS,
  PROGRAM_ACTIVATIONS_GET_FAIL,
  PROGRAM_ACTIVATIONS_ADD_REQUEST,
  PROGRAM_ACTIVATIONS_ADD_SUCCESS,
  PROGRAM_ACTIVATIONS_ADD_FAIL,
  PROGRAM_ACTIVATIONS_DELETE_REQUEST,
  PROGRAM_ACTIVATIONS_DELETE_SUCCESS,
  PROGRAM_ACTIVATIONS_DELETE_FAIL,
  PROGRAM_ACTIVATIONS_UPDATE_REQUEST,
  PROGRAM_ACTIVATIONS_UPDATE_SUCCESS,
  PROGRAM_ACTIVATIONS_UPDATE_FAIL,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; import snackBarMessages from '../constants/SnackBarMessages';

export function programActivationsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/program_activation/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PROGRAM_ACTIVATIONS_GET_FAIL,
              error: error
            });
            reject(error);
          })
          .finally(()=>{
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function programActivationsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/program_activation/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_ADD_SUCCESS,
                data: response.data.data
              });
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: snackBarMessages.ENTITY_ADDED
                }
              });
              resolve(response.data);
            } else {
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: "Error: " + response.data.errors.join(', ')
                }
              });
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ERROR
              }
            });
            reject(error);
          })
          .finally(()=>{
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function programActivationsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('delete', '/program_activation/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_DELETE_SUCCESS,
                data: {
                  id
                }
              });
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: snackBarMessages.ENTITY_DELETED
                }
              });
              resolve(response.data);
            } else {
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: "Error: " + response.data.errors.join(', ')
                }
              });
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ERROR
              }
            });
            reject(error);
          })
          .finally(()=>{
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function programActivationsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // API
        HTTP('patch', '/program_activation/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_UPDATE_SUCCESS,
                data: response.data.data
              });
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: snackBarMessages.ENTITY_UPDATED
                }
              });
              resolve(response.data);
            } else {
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: "Error: " + response.data.errors.join(', ')
                }
              });
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ERROR
              }
            });
            reject(error);
          })
          .finally(()=>{
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}
