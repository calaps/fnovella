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
        return new Promise(function(resolve, reject){{
            HTTP('get', '/getUser', null, {authorization: "Bearer "+token})
                .then(function (response) {
                    dispatch({
                        type: GETUSER_SUCCESS,
                        data: response.data.data
                    });
                    resolve(true);
                })
                .catch(error => {
                    dispatch({
                        type: GETUSER_FAIL,
                        error: error
                    });
                    reject(false);
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