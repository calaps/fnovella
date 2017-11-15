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
  CATALOGS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function catalogsGetRequest(number, size, sort) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  params.sort = 'category';
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
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
          .finally(()=>{
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function catalogsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/catalog/', data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: CATALOGS_ADD_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_ADDED
              }
            });
            resolve(response.data);
          } else {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: response.data.errors.join(', ')
              }
            });
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: SNACKBAR_SHOW,
            data: {
              message: snackBarMessages.ERROR
            }
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

export function catalogsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/catalog/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: CATALOGS_UPDATE_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_UPDATED
              }
            });
            resolve(response.data);
          } else {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: response.data.errors.join(', ')
              }
            });
            reject(response.data)
          }
        })
        .catch(error => {
          dispatch({
            type: SNACKBAR_SHOW,
            data: {
              message: snackBarMessages.ERROR
            }
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

export function catalogsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
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
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_DELETED
              }
            });
            resolve(response.data);
          } else {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: response.data.errors.join(', ')
              }
            });
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: SNACKBAR_SHOW,
            data: {
              message: snackBarMessages.ERROR
            }
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
export function catalogsGetByCategoryRequest(category_id) {

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/catalog/search/'+category_id, null, {authorization: localStorage.getItem('@fnovella:token')})
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
            reject(error);
          })
          .finally(()=>{
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}
