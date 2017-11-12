import {HTTP} from './../utils/HTTP';

import {
  SECTIONS_ADD_REQUEST,
  SECTIONS_ADD_SUCCESS,
  SECTIONS_ADD_FAIL,
  SECTIONS_DELETE_FAIL,
  SECTIONS_DELETE_REQUEST,
  SECTIONS_DELETE_SUCCESS,
  SECTIONS_GET_FAIL,
  SECTIONS_GET_REQUEST,
  SECTIONS_GET_SUCCESS,
  SECTIONS_UPDATE_FAIL,
  SECTIONS_UPDATE_REQUEST,
  SECTIONS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
} from './../constants/ActionTypes';

export function sectionsGetRequest() {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/section/',null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: SECTIONS_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: SECTIONS_GET_FAIL,
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

export function sectionsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/section/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: SECTIONS_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: SECTIONS_ADD_FAIL,
            error: error
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

export function sectionsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/section/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: SECTIONS_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: SECTIONS_UPDATE_FAIL,
            error: error
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

export function sectionsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/section/'+id,null, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors===null){
            dispatch({
              type: SECTIONS_DELETE_SUCCESS,
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
            type: SECTIONS_DELETE_FAIL,
            error: error
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
