import {HTTP} from './../utils/HTTP';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  SET_USER_TYPE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  APP_USER_UPDATE_REQUEST,
  APP_USER_UPDATE_SUCCESS,
  APP_USER_UPDATE_FAIL,
  APP_USER_PASSWORD_UPDATE_REQUEST,
  APP_USER_PASSWORD_UPDATE_SUCCESS,
  APP_USER_PASSWORD_UPDATE_FAIL,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
} from './../constants/ActionTypes';

export function loginRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: LOGIN_SUCCESS,
      //   data: {
      //     user:  {
      //       "id": 24,
      //       "firstName": "Shahnawaz",
      //       "secondName": "abc",
      //       "firstLastName": "Ali",
      //       "secondLastName": "Kausar",
      //       "privilege": 1,
      //       "documentType": "abc",
      //       "documentValue": "abc",
      //       "nationality": "abc",
      //       "department": "abc",
      //       "profession": "abc",
      //       "address": "abc",
      //       "email": "mr_shah@live.com",
      //       "password": "123",
      //       "municipality": "abc",
      //       "comunity": "abc",
      //       "cellphone": 0,
      //       "cemproCode": "abc",
      //       "appCode": "abc",
      //       "gender": "male",
      //       "bornDate": "2017-10-01",
      //       "phon": 1
      //     },
      //     token: 't4DUgxbSbKs1NGEB4WbsB'
      //   }
      // });
      // resolve(true);
      // return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/user/login', data)
        .then(function (response) {
          console.log("response: ",response);
          if(response.data.errors === null){
            dispatch({
              type: LOGIN_SUCCESS,
              data: response.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          console.log("error: ",error);
          dispatch({
            type: LOGIN_FAIL,
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

export function signUpRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      dispatch({
        type: SIGNUP_SUCCESS,
        data: {
          user: {
            firstName: 'Foo',
            lastName: 'Bar',
            username: 'foobar',
            email: 'foo@bar.com'
          },
          token: 'SomeEncryptedJWT'
        }
      });
      resolve(true);
      return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('post', '/user/signup', data)
        .then(function (response) {
          dispatch({
            type: SIGNUP_SUCCESS,
            data: response.data.data
          });
          resolve(true);
        })
        .catch(error => {
          dispatch({
            type: SIGNUP_FAIL,
            error: error
          });
          reject(false);
        })
        .finally(()=>{
          dispatch({
            type: PROGRESS_REMOVE_REQUEST
          });
        })
    }})
  }
}

export function getUserDetails(token){
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: GETUSER_SUCCESS,
      //   data: {
      //     "id": 24,
      //     "firstName": "Shahnawaz",
      //     "secondName": "abc",
      //     "firstLastName": "Ali",
      //     "secondLastName": "Kausar",
      //     "privilege": 1,
      //     "documentType": "abc",
      //     "documentValue": "abc",
      //     "nationality": "abc",
      //     "department": "abc",
      //     "profession": "abc",
      //     "address": "abc",
      //     "email": "mr_shah@live.com",
      //     "password": "",
      //     "municipality": "abc",
      //     "comunity": "abc",
      //     "cellphone": 0,
      //     "cemproCode": "abc",
      //     "appCode": "abc",
      //     "gender": "male",
      //     "bornDate": "2017-10-01",
      //     "phon": 1
      //   }
      // });
      // resolve(true);
      // return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('get', '/user/userDetails', null, {authorization: token})
        .then(function (response) {
          console.log("response: ",response);
          if(response.data.errors === null){
            dispatch({
              type: GETUSER_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          console.log("error: ",error);
          dispatch({
            type: GETUSER_FAIL,
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

export function logOut(){
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: LOG_OUT,
      //   data: {}
      // });
      // resolve(true);
      // return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API - in case we have Logout API
      HTTP('get', '/user/logout', null, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          console.log("response: ",response);
          if(response.data.errors === null){
            dispatch({
              type: LOG_OUT_SUCCESS,
              data: response.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          console.log("error: ",error);
          dispatch({
            type: LOG_OUT_FAIL,
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

export function setUserType(isOwner){
  return function (dispatch) {
    dispatch({
      type: SET_USER_TYPE,
      data: {
        isOwner
      }
    });
  }
}

export function forgotPasswordRequest(data){
  return function (dispatch) {
    return new Promise(function(resolve, reject){{
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      HTTP('post', '/user/forgot_password', data)
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: FORGOT_PASSWORD_SUCCESS,
              data: response.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: FORGOT_PASSWORD_FAIL,
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

export function appUserUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_UPDATE_SUCCESS,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/user/update/'+data.id, data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: APP_USER_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: APP_USER_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
        .finally(()=>{
          dispatch({
            type: PROGRESS_REMOVE_REQUEST
          });
        });
    }})
  }
}

export function appUserPasswordUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: USERS_UPDATE_SUCCESS,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;
      dispatch({
        type: PROGRESS_ADD_REQUEST
      });
      // API
      HTTP('patch', '/user/'+data.id+'/password', data, {authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          if(response.data.errors === null){
            dispatch({
              type: APP_USER_PASSWORD_UPDATE_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }
          else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: APP_USER_PASSWORD_UPDATE_FAIL,
            error: error
          });
          reject(error);
        })
        .finally(()=>{
          dispatch({
            type: PROGRESS_REMOVE_REQUEST
          });
        });
    }})
  }
}
