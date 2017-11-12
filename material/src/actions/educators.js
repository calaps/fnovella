import {HTTP} from './../utils/HTTP';

import {
  EDUCATORS_ADD_REQUEST,
  EDUCATORS_ADD_SUCCESS,
  EDUCATORS_ADD_FAIL,
  EDUCATORS_DELETE_FAIL,
  EDUCATORS_DELETE_REQUEST,
  EDUCATORS_DELETE_SUCCESS,
  EDUCATORS_GET_FAIL,
  EDUCATORS_GET_REQUEST,
  EDUCATORS_GET_SUCCESS,
  EDUCATORS_UPDATE_FAIL,
  EDUCATORS_UPDATE_REQUEST,
  EDUCATORS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
} from './../constants/ActionTypes';


export function educatorsGetRequestBySearch(id,firstName,appCode) {
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
        HTTP('post', '/instructor/search', null, {authorization:localStorage.getItem('@fnovella:token')},params)
          .then(function (response) {
            if(response.data.errors === null){
               dispatch({
                type: EDUCATORS_GET_SUCCESS,
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
              type: EDUCATORS_GET_FAIL,
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
export function educatorsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: EDUCATORS_GET_REQUEST,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/instructor/', null,{authorization: localStorage.getItem('@fnovella:token') },params)
        .then(function (response) {
          if(response.data.errors===null){
            dispatch({
              type: EDUCATORS_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_GET_FAIL,
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

export function educatorsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: EDUCATORS_ADD_SUCCESS,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/instructor/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.error){
            dispatch({
              type: EDUCATORS_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_ADD_FAIL,
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

export function educatorsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: EDUCATORS_UPDATE_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/instructor/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: EDUCATORS_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: EDUCATORS_UPDATE_FAIL,
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

export function educatorsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: EDUCATORS_DELETE_SUCCESS,
      //   data: {
      //     id
      //   }
      // });
      // resolve(true);
      // return;

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/instructor/'+id, null,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: EDUCATORS_DELETE_SUCCESS,
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
            type: EDUCATORS_DELETE_FAIL,
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
