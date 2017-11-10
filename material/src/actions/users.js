import {HTTP} from './../utils/HTTP';

import {
  USERS_ADD_REQUEST,
  USERS_ADD_SUCCESS,
  USERS_ADD_FAIL,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_GET_FAIL,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_UPDATE_FAIL,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function usersGetRequestBySearch(id,firstName,appCode) {
  return function (dispatch) {
      return new Promise(async function(resolve, reject){{
        let params= {
        id,
        firstName,
        appCode
        }
        // API
        HTTP('post', '/user/search', null, {authorization:localStorage.getItem('@fnovella:token')},params)
          .then(function (response) {
            if(response.data.errors === null){
               dispatch({
                type: USERS_GET_SUCCESS,
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
              type: USERS_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }})
    }
  }

export function usersGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_GET_REQUEST,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('get', '/user/users', null, {authorization: localStorage.getItem('@fnovella:token') }, params)
        .then(function (response) {
          if(response.data.errors === null){
             dispatch({
              type: USERS_GET_SUCCESS,
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
            type: USERS_GET_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function usersAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_ADD_SUCCESS,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('post', '/user/signup', data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: USERS_ADD_SUCCESS,
              data: response.data.user
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch ({
            type: USERS_ADD_FAIL ,
            error: error,
          });
          reject(error);
        });
    }});
  }
}

export function usersUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_UPDATE_SUCCESS,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('patch', '/user/update/'+data.id, data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: USERS_UPDATE_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: USERS_UPDATE_FAIL,
            error: error
          });
          reject(error);
        });
    }})
  }
}

export function usersDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_DELETE_SUCCESS,
      //   data: {
      //     id: id
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('delete', '/user/delete/'+id, null, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: USERS_DELETE_SUCCESS,
              data: {
                id
              }
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: USERS_DELETE_FAIL,
            error: error
          });
          reject(error);
        });
    }})
  }
}
