import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_LOCATION_ADD_REQUEST,
  PROGRAM_LOCATION_ADD_SUCCESS,
  PROGRAM_LOCATION_ADD_FAIL,
  PROGRAM_LOCATION_DELETE_FAIL,
  PROGRAM_LOCATION_DELETE_REQUEST,
  PROGRAM_LOCATION_DELETE_SUCCESS,
  PROGRAM_LOCATION_GET_FAIL,
  PROGRAM_LOCATION_GET_REQUEST,
  PROGRAM_LOCATION_GET_SUCCESS,
  PROGRAM_LOCATION_UPDATE_FAIL,
  PROGRAM_LOCATION_UPDATE_REQUEST,
  PROGRAM_LOCATION_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function programLocationGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;
  
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_LOCATION_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;

        // API
        HTTP('get', '/program_location/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_LOCATION_GET_SUCCESS,
                data: response.data.data
              });
              // console.log(response.data.data);
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PROGRAM_LOCATION_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function programLocationAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_LOCATION_ADD_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;


        // API
        HTTP('post', '/program_location/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_LOCATION_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PROGRAM_LOCATION_ADD_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function programLocationUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_LOCATION_UPDATE_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;

        // API
        HTTP('patch', '/program_location/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_LOCATION_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: PROGRAM_LOCATION_UPDATE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function programLocationDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_LOCATION_DELETE_SUCCESS,
        //   id: id
        // });
        // resolve(true);
        // return;

        // API
        HTTP('delete', '/program_location/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_LOCATION_DELETE_SUCCESS,
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
              type: PROGRAM_LOCATION_DELETE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}
