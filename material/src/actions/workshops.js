import {HTTP} from './../utils/HTTP';

import {
  WORKSHOPS_ADD_REQUEST,
  WORKSHOPS_ADD_SUCCESS,
  WORKSHOPS_ADD_FAIL,
  WORKSHOPS_DELETE_FAIL,
  WORKSHOPS_DELETE_REQUEST,
  WORKSHOPS_DELETE_SUCCESS,
  WORKSHOPS_GET_FAIL,
  WORKSHOPS_GET_REQUEST,
  WORKSHOPS_GET_SUCCESS,
  WORKSHOPS_UPDATE_FAIL,
  WORKSHOPS_UPDATE_REQUEST,
  WORKSHOPS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
} from './../constants/ActionTypes';

export function workshopsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: WORKSHOPS_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/workshop/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: WORKSHOPS_GET_SUCCESS,
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
              type: WORKSHOPS_GET_FAIL,
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

export function workshopsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: WORKSHOPS_ADD_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;

        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/workshop/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: WORKSHOPS_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: WORKSHOPS_ADD_FAIL,
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

export function workshopsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: WORKSHOPS_UPDATE_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('patch', '/workshop/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: WORKSHOPS_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: WORKSHOPS_UPDATE_FAIL,
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

export function workshopsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: WORKSHOPS_DELETE_SUCCESS,
        //   id: id
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('delete', '/workshop/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: WORKSHOPS_DELETE_SUCCESS,
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
              type: WORKSHOPS_DELETE_FAIL,
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
