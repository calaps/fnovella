import {HTTP} from './../utils/HTTP';

import {
  PARTICIPANT_ADDTIONAL_FIELD_GET_REQUEST,
  PARTICIPANT_ADDTIONAL_FIELD_GET_SUCCESS,
  PARTICIPANT_ADDTIONAL_FIELD_GET_FAIL,
  PARTICIPANT_ADDTIONAL_FIELD_ADD_REQUEST,
  PARTICIPANT_ADDTIONAL_FIELD_ADD_SUCCESS,
  PARTICIPANT_ADDTIONAL_FIELD_ADD_FAIL,
  PARTICIPANT_ADDTIONAL_FIELD_DELETE_REQUEST,
  PARTICIPANT_ADDTIONAL_FIELD_DELETE_SUCCESS,
  PARTICIPANT_ADDTIONAL_FIELD_DELETE_FAIL,
  PARTICIPANT_ADDTIONAL_FIELD_UPDATE_REQUEST,
  PARTICIPANT_ADDTIONAL_FIELD_UPDATE_SUCCESS,
  PARTICIPANT_ADDTIONAL_FIELD_UPDATE_FAIL,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; 
import snackBarMessages from '../constants/SnackBarMessages';

export function participantAdditionalFieldsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        HTTP('post', '/participant_aditional_fields/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PARTICIPANT_ADDTIONAL_FIELD_ADD_SUCCESS,
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
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PARTICIPANT_ADDTIONAL_FIELD_ADD_FAIL,
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