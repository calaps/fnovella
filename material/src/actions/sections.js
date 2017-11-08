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
  SECTIONS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function sectionsGetRequest() {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
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
    }})
  }
}

export function sectionsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
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
    })
  }
}

export function sectionsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
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
    })
  }
}

export function sectionsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){
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
    })
  }
}
