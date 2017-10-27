import {AsyncStorage} from 'react-native';
import {HTTP} from './../utils/HTTP';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GETUSER_SUCCESS,
    GETUSER_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    SET_USER_TYPE
} from './../constants/actionTypes';

// example action

export function loginRequest(data) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
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
        }})
    }
}

export function forgotPassword(data) {
  return function (dispatch) {
      return new Promise(function(resolve, reject){{
          HTTP('post','/user/forgot_password', data)
          .then(function (response) {
            console.log("response: ",response);
            if(response.data.errors === null){
              // dispatch({
              //   type: FORGOT_PASSWORD_SUCCESS,
              //   data: response.data
              // });
              resolve(response.data);
            }
            else{
              reject(response.data);
            }
          })
          .catch(error => {
            console.log("error: ",error);
            // dispatch({
            //   type: FORGOT_PASSWORD_FAIL,
            //   error: error
            // });
            reject(error);
          })
      }})
  }
}


export  function logOut(){
    return async function (dispatch) {
      return  new  Promise(async function(resolve, reject){{        
        var authToken;
        var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
            authToken= gettoken;
        });
        console.log('tok is: ',authToken);
        // API - in case we have Logout API
        HTTP('get', '/user/logout', null, {authorization: authToken})
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
      }})
    }
  }
  

export function signUpRequest(data) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            HTTP('post', '/driver/register_from_email', data)
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
        }})
    }
}

export function getUserDetails(token){
    return function (dispatch) {
        return new Promise(async function(resolve, reject){{
            var authToken;
            var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
                authToken= gettoken;
            });
            HTTP('get', '/user/userDetails', null, {authorization: authToken})
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