import {AsyncStorage} from 'react-native';
import {
    USER_GET_SUCCESS,
    USER_GET_FAIL
} from './../constants/actionTypes';
import {HTTP} from '../utils/HTTP';
export function usersGetRequestBySearch(id,firstName,appCode) {
  return function (dispatch) {
      return new Promise(async function(resolve, reject){{
        let params= {
        id,
        firstName,
        appCode
        }
        // will be removed once API is ready
        // dispatch({
        //   type: USERS_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;
        
        let authToken;
        var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
            authToken= gettoken;
        });
        // API
        HTTP('post', '/user/search', null, {authorization:authToken },params)
          .then(function (response) {
            if(response.data.errors === null){
               dispatch({
                type: USER_GET_SUCCESS,
                data: response.data.data.content
              });
              resolve(response.data);
            }
            else{
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: USER_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }})
    }
  }