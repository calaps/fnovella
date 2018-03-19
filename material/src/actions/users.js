import {HTTP} from './../utils/HTTP';

import {
  USERS_ADD_REQUEST,
  USERS_ADD_SUCCESS,
  USERS_CSV_UPLOAD,
  USERS_ADD_FAIL,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_GET_FAIL,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_UPDATE_FAIL,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; import snackBarMessages from '../constants/SnackBarMessages';

export function usersGetRequestBySearch(id,firstName,appCode) {
  return function (dispatch) {
      return new Promise(async function(resolve, reject){{
        let params= {
        id,
        firstName,
        appCode
        };
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/user/search', null, {authorization:localStorage.getItem('@fnovella:token')},params)
          .then(function (response) {
            if(response.data.errors === null){
               dispatch({
                type: USERS_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            }
            else{
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: USERS_GET_FAIL,
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

export function usersGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_GET_REQUEST,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/user/users', null, {authorization: localStorage.getItem('@fnovella:token') }, params)
        .then(function (response) {
          if(response.data.errors === null){
             dispatch({
              type: USERS_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: USERS_GET_FAIL,
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

export function usersAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/user/signup', data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: USERS_ADD_SUCCESS,
              data: response.data.user
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_ADDED
              }
            });
            resolve(response.data);
          }
          else {
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
        });
    }});
  }
}


export function usersUploadRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/user/load', data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: USERS_CSV_UPLOAD,
              data: response.data.user
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_UPLOADED
              }
            });
            resolve(response.data);
          }
          else {
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
        });
    }});
  }
}

export function usersUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/user/update/'+data.id, data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: USERS_UPDATE_SUCCESS,
              data: response.data.data.content
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_UPDATED
              }
            });
            resolve(response.data);
          }
          else {
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
        });
    }})
  }
}

export function usersDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/user/delete/'+id, null, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: USERS_DELETE_SUCCESS,
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
          }
          else {
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
