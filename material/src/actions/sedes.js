import {HTTP} from './../utils/HTTP';

import {
  SEDES_ADD_REQUEST,
  SEDES_ADD_SUCCESS,
  SEDES_ADD_FAIL,
  SEDES_DELETE_FAIL,
  SEDES_DELETE_REQUEST,
  SEDES_DELETE_SUCCESS,
  SEDES_GET_FAIL,
  SEDES_GET_REQUEST,
  SEDES_GET_SUCCESS,
  SEDES_UPDATE_FAIL,
  SEDES_UPDATE_REQUEST,
  SEDES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function sedesGetRequest(params) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: SEDES_GET_REQUEST,
      //   data
      // });
      // resolve(true);
      // return;

      // API
      HTTP('get', '/location/', null,{authorization: localStorage.getItem('@fnovella:token'),params})
        .then(function (response) {
        if(response.data.errors===null){
          dispatch({
            type: SEDES_GET_SUCCESS,
            data: response.data.data.content
          });
          console.log(response.data)
          resolve(response.data);
        }else{
          reject(response.data)
        }
        })
        .catch(error => {
          dispatch({
            type: SEDES_GET_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function sedesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: SEDES_ADD_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;

      // API
      HTTP('post', '/location/', data,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: SEDES_ADD_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }else{
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: SEDES_ADD_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function sedesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: SEDES_UPDATE_SUCCESS,
      //   data: {
      //     id
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('patch', '/location/'+data.id, data,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: SEDES_UPDATE_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: SEDES_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function sedesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: SEDES_DELETE_SUCCESS,
      //   data: {
      //     id
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('delete', '/location/'+id, null,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(!response.data.errors)  {
            dispatch({
              type: SEDES_DELETE_SUCCESS,
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
            type: SEDES_DELETE_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}
