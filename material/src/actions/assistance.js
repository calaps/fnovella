
import {HTTP} from './../utils/HTTP';

import {
  ASSISTANCE_ADD_REQUEST,
  ASSISTANCE_ADD_SUCCESS,
  ASSISTANCE_ADD_FAIL,
  ASSISTANCE_DELETE_FAIL,
  ASSISTANCE_DELETE_REQUEST,
  ASSISTANCE_DELETE_SUCCESS,
  ASSISTANCE_GET_FAIL,
  ASSISTANCE_GET_REQUEST,
  ASSISTANCE_GET_SUCCESS,
  ASSISTANCE_UPDATE_FAIL,
  ASSISTANCE_UPDATE_SUCCESS,
  ASSISTANCE_UPDATE_REQUEST,
  assistance_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function assistanceGetRequest(number, size, sort) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  params.sort = null;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/assistance/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: ASSISTANCE_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: ASSISTANCE_GET_FAIL,
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

export function assistanceGetByGroupId(id,number, size, sort) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  params.sort = null;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/assistance/by-group/'+id, null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: ASSISTANCE_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: ASSISTANCE_GET_FAIL,
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


export function assistanceAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/assistance/', data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: ASSISTANCE_ADD_SUCCESS,
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

export function assistanceUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/assistance/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: ASSISTANCE_UPDATE_SUCCESS,
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

export function assistanceDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/assistance/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: ASSISTANCE_DELETE_SUCCESS,
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
