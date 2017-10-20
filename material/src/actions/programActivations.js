import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_ACTIVATIONS_GET_REQUEST,
  PROGRAM_ACTIVATIONS_GET_SUCCESS,
  PROGRAM_ACTIVATIONS_GET_FAIL,
  PROGRAM_ACTIVATIONS_ADD_REQUEST,
  PROGRAM_ACTIVATIONS_ADD_SUCCESS,
  PROGRAM_ACTIVATIONS_ADD_FAIL
} from './../constants/ActionTypes';

export function programActivationsGetRequest() {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      // will be removed once API is ready
      // dispatch({
      //   type: PROGRAM_GET_REQUEST,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      // API
      HTTP('get', '/program_activation/',null,{authorization: localStorage.getItem('@fnovella:token')})
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: PROGRAM_ACTIVATIONS_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_ACTIVATIONS_GET_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}

export function programActivationsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PROGRAM_ACTIVATIONS_ADD_REQUEST,
      //   data
      // });
      // resolve(true);
      // return;


      // API
      HTTP('post', '/program_activation/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(!response.data.errors){
            dispatch({
              type: PROGRAM_ACTIVATIONS_ADD_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PROGRAM_ACTIVATIONS_ADD_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}
