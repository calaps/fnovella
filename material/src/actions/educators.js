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
  EDUCATORS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

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
    }})
  }
}
