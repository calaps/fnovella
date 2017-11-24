import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_ADDTIONAL_FIELD_GET_REQUEST,
  PROGRAM_ADDTIONAL_FIELD_GET_SUCCESS,
  PROGRAM_ADDTIONAL_FIELD_GET_FAIL,
  PROGRAM_ADDTIONAL_FIELD_ADD_REQUEST,
  PROGRAM_ADDTIONAL_FIELD_ADD_SUCCESS,
  PROGRAM_ADDTIONAL_FIELD_ADD_FAIL,
  PROGRAM_ADDTIONAL_FIELD_DELETE_REQUEST,
  PROGRAM_ADDTIONAL_FIELD_DELETE_SUCCESS,
  PROGRAM_ADDTIONAL_FIELD_DELETE_FAIL,
  PROGRAM_ADDTIONAL_FIELD_UPDATE_REQUEST,
  PROGRAM_ADDTIONAL_FIELD_UPDATE_SUCCESS,
  PROGRAM_ADDTIONAL_FIELD_UPDATE_FAIL,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
,  SNACKBAR_REMOVE,  SNACKBAR_SHOW } from './../constants/ActionTypes'; import snackBarMessages from '../constants/SnackBarMessages';

export function programaAdditionalFieldsGetRequest() {
  let params = {};

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        HTTP('get', '/program_aditional_fields/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_ADDTIONAL_FIELD_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PROGRAM_ADDTIONAL_FIELD_GET_FAIL,
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