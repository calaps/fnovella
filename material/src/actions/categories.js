import {HTTP} from './../utils/HTTP';

import {
  CATEGORIES_ADD_REQUEST,
  CATEGORIES_ADD_SUCCESS,
  CATEGORIES_ADD_FAIL,
  CATEGORIES_DELETE_FAIL,
  CATEGORIES_DELETE_REQUEST,
  CATEGORIES_DELETE_SUCCESS,
  CATEGORIES_GET_FAIL,
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_UPDATE_FAIL,
  CATEGORIES_UPDATE_REQUEST,
  CATEGORIES_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function categoriesGetRequest() {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/category/',null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: CATEGORIES_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: CATEGORIES_GET_FAIL,
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

export function categoriesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/category/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: CATEGORIES_ADD_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_ADDED
              }
            });
            resolve(response.data);
          }else{
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: "Error: " + response.data.errors.join(', ')
              }
            });
            reject(response.data)
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

export function categoriesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/category/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: CATEGORIES_UPDATE_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_UPDATED
              }
            });
            resolve(response.data);
          }else{
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: "Error: " + response.data.errors.join(', ')
              }
            });
            reject(response.data)
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

export function categoriesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/category/'+id,null, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors===null){
            dispatch({
              type: CATEGORIES_DELETE_SUCCESS,
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
          }else{
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
