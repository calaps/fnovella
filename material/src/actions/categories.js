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
  LOADER_ADD_REQUEST,
  LOADER_REMOVE_REQUEST
} from './../constants/ActionTypes';

export function categoriesGetRequest() {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      // will be removed once API is ready
      // dispatch({
      //   type: PROGRAM_GET_REQUEST,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      dispatch({
        type: LOADER_ADD_REQUEST
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
            type: LOADER_REMOVE_REQUEST
          });
        })
    }})
  }
}

export function categoriesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
      // will be removed once API is ready
      // dispatch({
      //   type: CATEGORIES_ADD_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;

      dispatch({
        type: LOADER_ADD_REQUEST
      });
      // API
      HTTP('post', '/category/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: CATEGORIES_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: CATEGORIES_ADD_FAIL,
            error: error
          });
          reject(error);
        })
        .finally(()=>{
          dispatch({
            type: LOADER_REMOVE_REQUEST
          });
        })
    })
  }
}

export function categoriesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){

      // will be removed once API is ready
      // dispatch({
      //   type: CATEGORIES_UPDATE_SUCCESS,
      //   id
      // });
      // resolve(true);
      // return;

      dispatch({
        type: LOADER_ADD_REQUEST
      });
      // API
      HTTP('patch', '/category/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: CATEGORIES_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: CATEGORIES_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
        .finally(()=>{
          dispatch({
            type: LOADER_REMOVE_REQUEST
          });
        })
    })
  }
}

export function categoriesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){

      // will be removed once API is ready
      // dispatch({
      //   type: CATEGORIES_DELETE_SUCCESS,
      //   id
      // });
      // resolve(true);
      // return;

      dispatch({
        type: LOADER_ADD_REQUEST
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
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: CATEGORIES_DELETE_FAIL,
            error: error
          });
          reject(error);
        })
        .finally(()=>{
          dispatch({
            type: LOADER_REMOVE_REQUEST
          });
        })
    })
  }
}
