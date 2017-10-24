import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_ACTIVATIONS_GET_REQUEST,
  PROGRAM_ACTIVATIONS_GET_SUCCESS,
  PROGRAM_ACTIVATIONS_GET_FAIL,
  PROGRAM_ACTIVATIONS_ADD_REQUEST,
  PROGRAM_ACTIVATIONS_ADD_SUCCESS,
  PROGRAM_ACTIVATIONS_ADD_FAIL,
  PROGRAM_ACTIVATIONS_DELETE_REQUEST,
  PROGRAM_ACTIVATIONS_DELETE_SUCCESS,
  PROGRAM_ACTIVATIONS_DELETE_FAIL,
  PROGRAM_ACTIVATIONS_UPDATE_REQUEST,
  PROGRAM_ACTIVATIONS_UPDATE_SUCCESS,
  PROGRAM_ACTIVATIONS_UPDATE_FAIL
} from './../constants/ActionTypes';

export function programActivationsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

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
        HTTP('get', '/program_activation/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_GET_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
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
      }
    })
  }
}

export function programActivationsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_ACTIVATIONS_ADD_REQUEST,
        //   data
        // });
        // resolve(true);
        // return;


        // API
        HTTP('post', '/program_activation/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
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
      }
    })
  }
}

export function programActivationsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_ACTIVATIONS_DELETE_SUCCESS,
        //   id: id
        // });
        // resolve(true);
        // return;

        // API
        HTTP('delete', '/program_activation/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_DELETE_SUCCESS,
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
              type: PROGRAM_ACTIVATIONS_DELETE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function programActivationsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_ACTIVATIONS_UPDATE_FAIL,
        //   data
        // });
        // resolve(true);
        // return;

        // API
        HTTP('patch', '/program_activation/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_ACTIVATIONS_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: PROGRAM_ACTIVATIONS_UPDATE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}
