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
  SEDES_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; import snackBarMessages from '../constants/SnackBarMessages';

export function sedesGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/location/', null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
        if(response.data.errors===null){
          dispatch({
            type: SEDES_GET_SUCCESS,
            data: response.data.data
          });
          // console.log(response.data);
          resolve(response.data);
        }else{
          reject(response.data)
        }
        })
        .catch(error => {
          dispatch({
            type: SEDES_GET_FAIL,
            error: error
          });
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

export function sedesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/location/', data,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: SEDES_ADD_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_ADDED
              }
            });
            resolve(response.data);
          }else {
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
    }})
  }
}

export function sedesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/location/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: SEDES_UPDATE_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_UPDATED
              }
            });
            resolve(response.data);
          }else {
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
    }})
  }
}

export function sedesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/location/'+id, null,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(response.data.errors === null)  {
            dispatch({
              type: SEDES_DELETE_SUCCESS,
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
          }else {
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
    }})
  }
}

export function sedesGetByIdRequest(locationId) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/location/'+locationId, null,{authorization: localStorage.getItem('@fnovella:token')})
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
