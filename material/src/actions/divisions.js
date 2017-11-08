import {HTTP} from './../utils/HTTP';

import {
  DIVISIONS_ADD_REQUEST,
  DIVISIONS_ADD_SUCCESS,
  DIVISIONS_ADD_FAIL,
  DIVISIONS_DELETE_FAIL,
  DIVISIONS_DELETE_REQUEST,
  DIVISIONS_DELETE_SUCCESS,
  DIVISIONS_GET_FAIL,
  DIVISIONS_GET_REQUEST,
  DIVISIONS_GET_SUCCESS,
  DIVISIONS_UPDATE_FAIL,
  DIVISIONS_UPDATE_REQUEST,
  DIVISIONS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function divisionsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: DIVISIONS_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;

        // API
        HTTP('get', '/division/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: DIVISIONS_GET_SUCCESS,
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
              type: DIVISIONS_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function divisionsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: DIVISIONS_ADD_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;


        // API
        HTTP('post', '/division/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: DIVISIONS_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: DIVISIONS_ADD_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function divisionsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: DIVISIONS_UPDATE_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;

        // API
        HTTP('patch', '/division/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: DIVISIONS_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: DIVISIONS_UPDATE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function divisionsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: DIVISIONS_DELETE_SUCCESS,
        //   id: id
        // });
        // resolve(true);
        // return;

        // API
        HTTP('delete', '/division/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: DIVISIONS_DELETE_SUCCESS,
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
              type: DIVISIONS_DELETE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}
