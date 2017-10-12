import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_ADD_REQUEST,
  PROGRAM_ADD_SUCCESS,
  PROGRAM_ADD_FAIL,
  PROGRAM_DELETE_FAIL,
  PROGRAM_DELETE_REQUEST,
  PROGRAM_DELETE_SUCCESS,
  PROGRAM_GET_FAIL,
  PROGRAM_GET_REQUEST,
  PROGRAM_GET_SUCCESS,
  PROGRAM_UPDATE_FAIL,
  PROGRAM_UPDATE_REQUEST,
  PROGRAM_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function programGetRequest(currentPage,number,size) {
  currentPage = number;
  let params = {};
  params.number = number * size;
  params.size = size;
  params.type = 2;
  

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

      // API
        HTTP('get', '/program/',null,{authorization: localStorage.getItem('@fnovella:token')}, params)
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: PROGRAM_GET_SUCCESS,
              data: response.data.data
            });
            console.log(response.data.data);
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_GET_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function programAddRequest(data) {
      return function (dispatch) {
        return new Promise(function(resolve, reject){{

          // will be removed once API is ready
          // dispatch({
          //   type: PROGRAM_ADD_SUCCESS,
          //   data
          // });
          // resolve(true);
          // return;


      // API
      HTTP('post', '/program/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PROGRAM_ADD_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_ADD_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function programUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PROGRAM_UPDATE_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;

      // API
      HTTP('patch', '/program/'+data.id, data , { authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PROGRAM_UPDATE_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }else {
            reject(response.data);
          }

        })
        .catch(error => {
          dispatch({
            type: PROGRAM_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function programDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PROGRAM_DELETE_SUCCESS,
      //   id: id
      // });
      // resolve(true);
      // return;

      // API
      HTTP('delete', '/program/'+id, null, { authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PROGRAM_DELETE_SUCCESS,
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
            type: PROGRAM_DELETE_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}
