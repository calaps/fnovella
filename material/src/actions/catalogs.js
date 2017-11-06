import {HTTP} from './../utils/HTTP';

import {
  CATALOGS_ADD_REQUEST,
  CATALOGS_ADD_SUCCESS,
  CATALOGS_ADD_FAIL,
  CATALOGS_DELETE_FAIL,
  CATALOGS_DELETE_REQUEST,
  CATALOGS_DELETE_SUCCESS,
  CATALOGS_GET_FAIL,
  CATALOGS_GET_REQUEST,
  CATALOGS_GET_SUCCESS,
  CATALOGS_UPDATE_FAIL,
  CATALOGS_UPDATE_REQUEST,
  CATALOGS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function catalogsGetRequest(number, size, sort) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  params.sort = 'category';
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;

        // API
        HTTP('get', '/catalog/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: CATALOGS_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: CATALOGS_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function catalogsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      // will be removed once API is ready
      // dispatch({
      //   type: CATALOGS_ADD_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;

      // API
      HTTP('post', '/catalog/', data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (!response.data.errors) {
            dispatch({
              type: CATALOGS_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          } else {
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_ADD_FAIL,
            error: error
          });
          reject(error);
        })
    })
  }
}

export function catalogsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      // will be removed once API is ready
      // dispatch({
      //   type: CATALOGS_UPDATE_SUCCESS,
      //   id
      // });
      // resolve(true);
      // return;

      // API
      HTTP('patch', '/catalog/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (!response.data.errors) {
            dispatch({
              type: CATALOGS_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          } else {
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
    })
  }
}

export function catalogsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      // will be removed once API is ready
      // dispatch({
      //   type: CATALOGS_DELETE_SUCCESS,
      //   id
      // });
      // resolve(true);
      // return;

      // API
      HTTP('delete', '/catalog/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: CATALOGS_DELETE_SUCCESS,
              data: {
                id
              }
            });
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: CATALOGS_DELETE_FAIL,
            error: error
          });
          reject(error);
        })
    })
  }
}
