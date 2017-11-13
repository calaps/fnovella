import {HTTP} from './../utils/HTTP';

import {
  PROGRAM_INSTRUCTOR_ADD_REQUEST,
  PROGRAM_INSTRUCTOR_ADD_SUCCESS,
  PROGRAM_INSTRUCTOR_ADD_FAIL,
  PROGRAM_INSTRUCTOR_DELETE_FAIL,
  PROGRAM_INSTRUCTOR_DELETE_REQUEST,
  PROGRAM_INSTRUCTOR_DELETE_SUCCESS,
  PROGRAM_INSTRUCTOR_GET_FAIL,
  PROGRAM_INSTRUCTOR_GET_REQUEST,
  PROGRAM_INSTRUCTOR_GET_SUCCESS,
  PROGRAM_INSTRUCTOR_UPDATE_FAIL,
  PROGRAM_INSTRUCTOR_UPDATE_REQUEST,
  PROGRAM_INSTRUCTOR_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
} from './../constants/ActionTypes';

export function programInstructorGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_INSTRUCTOR_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/program_instructor/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: PROGRAM_INSTRUCTOR_GET_SUCCESS,
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
              type: PROGRAM_INSTRUCTOR_GET_FAIL,
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

export function programInstructorAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_INSTRUCTOR_ADD_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;

        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/program_instructor/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_INSTRUCTOR_ADD_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PROGRAM_INSTRUCTOR_ADD_FAIL,
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

export function programInstructorUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_INSTRUCTOR_UPDATE_SUCCESS,
        //   data
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('patch', '/program_instructor/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_INSTRUCTOR_UPDATE_SUCCESS,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: PROGRAM_INSTRUCTOR_UPDATE_FAIL,
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

export function programInstructorDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {

        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_INSTRUCTOR_DELETE_SUCCESS,
        //   id: id
        // });
        // resolve(true);
        // return;
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('delete', '/program_instructor/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (!response.data.errors) {
              dispatch({
                type: PROGRAM_INSTRUCTOR_DELETE_SUCCESS,
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
              type: PROGRAM_INSTRUCTOR_DELETE_FAIL,
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
