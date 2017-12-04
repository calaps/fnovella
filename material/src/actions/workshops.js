import {HTTP} from './../utils/HTTP';

import {
  WORKSHOPS_ADD_REQUEST,
  WORKSHOPS_ADD_SUCCESS,
  WORKSHOPS_ADD_FAIL,
  WORKSHOPS_DELETE_FAIL,
  WORKSHOPS_DELETE_REQUEST,
  WORKSHOPS_DELETE_SUCCESS,
  WORKSHOPS_GET_FAIL,
  WORKSHOPS_GET_REQUEST,
  WORKSHOPS_GET_SUCCESS,
  WORKSHOPS_UPDATE_FAIL,
  WORKSHOPS_UPDATE_REQUEST,
  WORKSHOPS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; import snackBarMessages from '../constants/SnackBarMessages';

export function workshopsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: WORKSHOPS_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/workshop/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: WORKSHOPS_GET_SUCCESS,
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
              type: WORKSHOPS_GET_FAIL,
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

export function workshopsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {      
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/workshop/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: WORKSHOPS_ADD_SUCCESS,
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
    })
  }
}

export function workshopsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('patch', '/workshop/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: WORKSHOPS_UPDATE_SUCCESS,
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

export function workshopsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('delete', '/workshop/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: WORKSHOPS_DELETE_SUCCESS,
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

export function workshopGetByIdRequest(workshopId) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/workshop/' + workshopId, null,{authorization: localStorage.getItem('@fnovella:token')})
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
