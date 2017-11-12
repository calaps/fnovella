import {HTTP} from './../utils/HTTP';

import {
  PRIVILEGES_ADD_REQUEST,
  PRIVILEGES_ADD_SUCCESS,
  PRIVILEGES_ADD_FAIL,
  PRIVILEGES_DELETE_FAIL,
  PRIVILEGES_DELETE_REQUEST,
  PRIVILEGES_DELETE_SUCCESS,
  PRIVILEGES_GET_FAIL,
  PRIVILEGES_GET_REQUEST,
  PRIVILEGES_GET_SUCCESS,
  PRIVILEGES_GET_ALL_SUCCESS,
  PRIVILEGES_UPDATE_FAIL,
  PRIVILEGES_UPDATE_REQUEST,
  PRIVILEGES_UPDATE_SUCCESS,
  LOADER_ADD_REQUEST,
  LOADER_REMOVE_REQUEST
} from './../constants/ActionTypes';

export function privilegesGetRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: PRIVILEGES_GET_SUCCESS,
        data
      });
      resolve(true);
      return;

      dispatch({
        type: LOADER_ADD_REQUEST
      });
      // API
      HTTP('get', '/privilege/', null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors===null)  {
            dispatch({
              type: PRIVILEGES_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_GET_FAIL,
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

export function privilegesGetAllRequest() {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PRIVILEGES_GET_ALL_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;
      dispatch({
        type: LOADER_ADD_REQUEST
      });
      // API
      HTTP('get', '/privilege/all', null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors===null)  {
            dispatch({
              type: PRIVILEGES_GET_ALL_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_GET_FAIL,
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

export function privilegesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PRIVILEGES_ADD_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;
      dispatch({
        type: LOADER_ADD_REQUEST
      });
      // API
      HTTP('post', '/privilege/',data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PRIVILEGES_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PRIVILEGES_ADD_FAIL,
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

export function privilegesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PRIVILEGES_UPDATE_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;
        dispatch({
          type: LOADER_ADD_REQUEST
        });
// API
        HTTP('patch', '/privilege/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PRIVILEGES_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PRIVILEGES_UPDATE_FAIL,
              error: error
            });
            reject(error);
          })
          .finally(()=>{
            dispatch({
              type: LOADER_REMOVE_REQUEST
            });
          })
      } })
  }
}

export function privilegesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PRIVILEGES_DELETE_SUCCESS,
      //   data: {
      //     id
      //   }
      // });
      // resolve(true);
      // return;
      dispatch({
        type: LOADER_ADD_REQUEST
      });
      // API
      HTTP('delete', '/privilege/'+id, null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if (!response.data.errors) {
            dispatch({
              type: PRIVILEGES_DELETE_SUCCESS,
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
            type: PRIVILEGES_DELETE_FAIL,
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
