import {HTTP} from './../utils/HTTP';

import {
  DIVISIONS_ADD_REQUEST,
  DIVISIONS_ADD_SUCCESS,
  DIVISIONS_ADD_FAIL,
  DIVISIONS_DELETE_FAIL,
  DIVISIONS_DELETE_REQUEST,
  DIVISIONS_DELETE_SUCCESS,
  DIVISIONS_GET_FAIL,
  DIVISIONS_GET_REQUEST,
  DIVISIONS_GET_SUCCESS,
  DIVISIONS_UPDATE_FAIL,
  DIVISIONS_UPDATE_REQUEST,
  DIVISIONS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function divisionsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/division/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: DIVISIONS_GET_SUCCESS,
                data: response.data.data
              });
              // console.log(response.data.data);
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: DIVISIONS_GET_FAIL,
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

export function divisionsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/division/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: DIVISIONS_ADD_SUCCESS,
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

export function divisionsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('patch', '/division/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: DIVISIONS_UPDATE_SUCCESS,
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

export function divisionsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('delete', '/division/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: DIVISIONS_DELETE_SUCCESS,
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

export function divisionGetByIdRequest(divisionId) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/division/' + divisionId, null,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(response.data.errors===null){
            resolve(response.data);
          }else{
            reject(response.data)
          }
        })
        .catch(error => {
          reject(error);
        })
        .finally(()=>{
          dispatch({
            type: PROGRESS_REMOVE_REQUEST
          });
        })
    }})
  }
}
