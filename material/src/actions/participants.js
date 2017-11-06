import {HTTP} from './../utils/HTTP';
import {
  PARTICIPANT_ADD_REQUEST,
  PARTICIPANT_ADD_SUCCESS,
  PARTICIPANT_ADD_FAIL,
  PARTICIPANT_DELETE_FAIL,
  PARTICIPANT_DELETE_REQUEST,
  PARTICIPANT_DELETE_SUCCESS,
  PARTICIPANT_GET_FAIL,
  PARTICIPANT_GET_REQUEST,
  PARTICIPANT_GET_SUCCESS,
  PARTICIPANT_UPDATE_FAIL,
  PARTICIPANT_UPDATE_REQUEST,
  PARTICIPANT_UPDATE_SUCCESS
} from './../constants/ActionTypes';


export function participantsGetRequestBySearch(id,firstName,appCode) {
  return function (dispatch) {
      return new Promise(async function(resolve, reject){{
        let params= {
        id,
        firstName,
        appCode
        }
        // API
        HTTP('post', '/participant/search', null, {authorization:localStorage.getItem('@fnovella:token')},params)
          .then(function (response) {
            if(response.data.errors === null){
               dispatch({
                type: PARTICIPANT_GET_SUCCESS,
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
              type: PARTICIPANT_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }})
    }
  }

export function participantGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      // will be removed once API is ready
      // dispatch({
      //   type: PARTICIPANT_GET_REQUEST,
      //   data
      // });
      // resolve(true);
      // return;

      // API
      HTTP('get', '/participant/',null,{authorization: localStorage.getItem('@fnovella:token')},params)
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: PARTICIPANT_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PARTICIPANT_GET_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function participantAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PARTICIPANT_ADD_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;


      // API
      HTTP('post', '/participant/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PARTICIPANT_ADD_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PARTICIPANT_ADD_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function participantUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      /*dispatch({
        type: PARTICIPANT_UPDATE_SUCCESS,
        data
      });
      resolve(true);
      return true;*/

      // API
      HTTP('patch', '/participant/'+data.id, data , { authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PARTICIPANT_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data);
          }

        })
        .catch(error => {
          dispatch({
            type: PARTICIPANT_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function participantDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PARTICIPANT_DELETE_SUCCESS,
      //   data : {
      //     id
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('delete', '/participant/'+id, null, { authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PARTICIPANT_DELETE_SUCCESS,
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
            type: PARTICIPANT_DELETE_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}
