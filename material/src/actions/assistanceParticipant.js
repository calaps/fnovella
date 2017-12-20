
import {HTTP} from './../utils/HTTP';

import {
  ASSISTANCE_PARTICIPANT_ADD_REQUEST,
  ASSISTANCE_PARTICIPANT_ADD_SUCCESS,
  ASSISTANCE_PARTICIPANT_ADD_FAIL,
  ASSISTANCE_PARTICIPANT_DELETE_FAIL,
  ASSISTANCE_PARTICIPANT_DELETE_REQUEST,
  ASSISTANCE_PARTICIPANT_DELETE_SUCCESS,
  ASSISTANCE_PARTICIPANT_GET_FAIL,
  ASSISTANCE_PARTICIPANT_GET_REQUEST,
  ASSISTANCE_PARTICIPANT_GET_SUCCESS,
  ASSISTANCE_PARTICIPANT_UPDATE_FAIL,
  ASSISTANCE_PARTICIPANT_UPDATE_REQUEST,
  ASSISTANCE_PARTICIPANT_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function assistanceParticipantGetRequest(number, size, sort) {
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
        HTTP('get', '/assistance_participant/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: ASSISTANCE_PARTICIPANT_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: ASSISTANCE_PARTICIPANT_GET_FAIL,
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

export function assistanceParticipantAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/assistance_participant/', data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: ASSISTANCE_PARTICIPANT_ADD_SUCCESS,
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

export function assistanceParticipantUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/assistance_participant/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: ASSISTANCE_PARTICIPANT_UPDATE_SUCCESS,
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

export function assistanceParticipantDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {

      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/assistance_participant/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch({
              type: ASSISTANCE_PARTICIPANT_DELETE_SUCCESS,
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
