import {AsyncStorage} from 'react-native';
import {
    PROGRAM_GET_SUCCESS,
    PROGRAM_GET_FAIL
} from './../constants/actionTypes';
import {HTTP} from '../utils/HTTP';
export function programGetRequest() {
    // currentPage = number;
    let params = {};
    // params.number = number * size;
    // params.size = size;
    params.type = 2;
    
  
    return function (dispatch) {
      return new Promise(async function(resolve, reject){{
        // will be removed once API is ready
        // dispatch({
        //   type: PROGRAM_GET_REQUEST,
        //   data: {
        //   }
        // });
        // resolve(true);
        // return;
        var authToken;
        var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
            authToken= gettoken;
        });
        // API
          HTTP('get', '/program/',null,{authorization: authToken}, params)
          .then(function (response) {
            if(response.data.errors === null){
              dispatch({
                type: PROGRAM_GET_SUCCESS,
                data: response.data.data
              });
              console.log(response.data.data);
              resolve(response.data);
            }else{
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: PROGRAM_GET_FAIL,
              error: error
            });
            reject(error);
          })
      }})
    }
  }
  