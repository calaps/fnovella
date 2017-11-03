import {HTTP} from './../utils/HTTP';

import {
  GRADES_ADD_REQUEST,
  GRADES_ADD_SUCCESS,
  GRADES_ADD_FAIL,
  GRADES_DELETE_FAIL,
  GRADES_DELETE_REQUEST,
  GRADES_DELETE_SUCCESS,
  GRADES_GET_FAIL,
  GRADES_GET_REQUEST,
  GRADES_GET_SUCCESS,
  GRADES_UPDATE_FAIL,
  GRADES_UPDATE_REQUEST,
  GRADES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

export function gradesGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: GRADES_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;

        // API
        HTTP('get', '/grade/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: GRADES_GET_SUCCESS,
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
              type: GRADES_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function gradesAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: GRADES_ADD_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;


        // API
        HTTP('post', '/grade/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: GRADES_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: GRADES_ADD_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function gradesUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: GRADES_UPDATE_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;

        // API
        HTTP('patch', '/grade/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: GRADES_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: GRADES_UPDATE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}

export function gradesDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: GRADES_DELETE_SUCCESS,
        //   id: id
        // });
        // resolve(true);
        // return;

        // API
        HTTP('delete', '/grade/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: GRADES_DELETE_SUCCESS,
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
              type: GRADES_DELETE_FAIL,
              error: error
            });
            reject(error);
          })
      }
    })
  }
}
