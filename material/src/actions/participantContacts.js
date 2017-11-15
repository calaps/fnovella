import {HTTP} from './../utils/HTTP';
import {
  PARTICIPANT_CONTACT_ADD_REQUEST,
  PARTICIPANT_CONTACT_ADD_SUCCESS,
  PARTICIPANT_CONTACT_ADD_FAIL,
  PARTICIPANT_CONTACT_UPDATE_REQUEST,
  PARTICIPANT_CONTACT_UPDATE_SUCCESS,
  PARTICIPANT_CONTACT_UPDATE_FAIL,
  PARTICIPANT_CONTACT_DELETE_REQUEST,
  PARTICIPANT_CONTACT_DELETE_SUCCESS,
  PARTICIPANT_CONTACT_DELETE_FAIL,
  PARTICIPANT_CONTACT_GET_REQUEST,
  PARTICIPANT_CONTACT_GET_SUCCESS,
  PARTICIPANT_CONTACT_GET_FAIL,
  PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_REQUEST,
  PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_SUCCESS,
  PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_FAIL,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; import snackBarMessages from '../constants/SnackBarMessages';

export function participantContactAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/participant_contacts/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            console.log("response: ", response);
            if (response.data.errors === null) {
              dispatch({
                type: PARTICIPANT_CONTACT_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PARTICIPANT_CONTACT_ADD_FAIL,
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

export function participantContactByParticipantIdGetRequest(id) {

  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/participant_contacts/'+ id +'/participant_id',null,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_FAIL,
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
