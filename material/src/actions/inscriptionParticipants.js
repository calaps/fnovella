import {HTTP} from './../utils/HTTP';
import {
  INSCRIPTION_PARTICIPANT_ADD_REQUEST,
  INSCRIPTION_PARTICIPANT_ADD_SUCCESS,
  INSCRIPTION_PARTICIPANT_ADD_FAIL,
  INSCRIPTION_PARTICIPANT_DELETE_FAIL,
  INSCRIPTION_PARTICIPANT_DELETE_REQUEST,
  INSCRIPTION_PARTICIPANT_DELETE_SUCCESS,
  INSCRIPTION_PARTICIPANT_GET_FAIL,
  INSCRIPTION_PARTICIPANT_GET_REQUEST,
  INSCRIPTION_PARTICIPANT_GET_SUCCESS,
  INSCRIPTION_PARTICIPANT_UPDATE_FAIL,
  INSCRIPTION_PARTICIPANT_UPDATE_REQUEST,
  INSCRIPTION_PARTICIPANT_UPDATE_SUCCESS,
  INSCRIPTION_PARTICIPANT_LOAD_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function inscriptionParticipantsGetRequestByParticipant(participant) {
  return function (dispatch) {
      return new Promise(async function(resolve, reject){{
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/inscription_participant/by-participant/'+participant, null, {authorization:localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if(response.data.errors === null){
               dispatch({
                type: INSCRIPTION_PARTICIPANT_GET_SUCCESS,
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
              type: INSCRIPTION_PARTICIPANT_GET_FAIL,
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

  export function inscriptionParticipantsGetRequestByInscription(inscription) {
    return function (dispatch) {
        return new Promise(async function(resolve, reject){{
          dispatch({
            type: PROGRESS_ADD_REQUEST
          });
          // API
          HTTP('get', '/inscription_participant/by-inscription/'+inscription, null, {authorization:localStorage.getItem('@fnovella:token')})
            .then(function (response) {
              if(response.data.errors === null){
                 dispatch({
                  type: INSCRIPTION_PARTICIPANT_GET_SUCCESS,
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
                type: INSCRIPTION_PARTICIPANT_GET_FAIL,
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

export function inscriptionParticipantGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;

  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/inscription_participant/',null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: INSCRIPTION_PARTICIPANT_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: INSCRIPTION_PARTICIPANT_GET_FAIL,
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

export function inscriptionParticipantGetRequestById(id,number,size) {
  let params = {};
  params.page = number;
  params.size = size;

  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/inscription_participant/'+id,null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
          if(response.data.errors === null){
            resolve(response.data);
          }else{
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
    }})
  }
}

export function inscriptionParticipantGetByGroupId(id,number, size) {
  let params = {};
  params.page = number;
  params.size = size;

  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/inscription_participant/by-group/'+id,null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: INSCRIPTION_PARTICIPANT_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: INSCRIPTION_PARTICIPANT_GET_FAIL,
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


export function getInscriptionParticipantByInscriptionId(id,number,size) {
  let params = {};
  params.page = number;
  params.size = size;
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/inscription_participant/by-inscription/'+id,null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
          if(response.data.errors === null){
            resolve(response.data);
          }else{
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
    }})
  }
}


export function inscriptionParticipantAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/inscription_participant/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: INSCRIPTION_PARTICIPANT_ADD_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_ADDED
              }
            });
            resolve(response.data);
          }else{
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: "Error: " + response.data.errors.join(', ')
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
    }})
  }
}

export function inscriptionParticipantUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/inscription_participant/'+data.id, data , { authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: INSCRIPTION_PARTICIPANT_UPDATE_SUCCESS,
              data: response.data.data
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ENTITY_UPDATED
              }
            });
            resolve(response.data);
          }else {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: "Error: " + response.data.errors.join(', ')
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
    }})
  }
}

export function inscriptionParticipantDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('delete', '/inscription_participant/'+id, null, { authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: INSCRIPTION_PARTICIPANT_DELETE_SUCCESS,
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
          }else{
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: "Error: " + response.data.errors.join(', ')
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
    }})
  }
}
