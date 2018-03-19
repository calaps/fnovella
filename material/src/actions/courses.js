import {HTTP} from './../utils/HTTP';

import {
  COURSES_ADD_REQUEST,
  COURSES_ADD_SUCCESS,
  COURSES_ADD_FAIL,
  COURSES_DELETE_FAIL,
  COURSES_DELETE_REQUEST,
  COURSES_DELETE_SUCCESS,
  COURSES_GET_FAIL,
  COURSES_GET_REQUEST,
  COURSES_GET_SUCCESS,
  COURSES_UPDATE_FAIL,
  COURSES_UPDATE_REQUEST,
  COURSES_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function coursesGetRequest(number, size) {
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
      HTTP('get', '/course/', null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
          if(response.data.errors===null){
            dispatch({
              type: COURSES_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data);
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

export function coursesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/course/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: COURSES_ADD_SUCCESS,
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
    }})
  }
}

export function coursesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/course/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: COURSES_UPDATE_SUCCESS,
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
    }})
  }
}

export function coursesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/course/'+id, null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: COURSES_DELETE_SUCCESS,
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
    }})
  }
}

export function courseGetByIdRequest(courseId) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/course/' + courseId, null,{authorization: localStorage.getItem('@fnovella:token')})
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
