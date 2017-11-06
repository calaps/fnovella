import {HTTP} from './../utils/HTTP';
import {AsyncStorage} from 'react-native';
import {
  DASHBOARD_STATBOXES_GET_FAIL,
  DASHBOARD_STATBOXES_GET_REQUEST,
  DASHBOARD_STATBOXES_GET_SUCCESS
} from '../constants/actionTypes';

export function dashboardStatBoxesGetRequest() {
  return function (dispatch) {
    return new Promise(async function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: DASHBOARD_STATBOXES_GET_REQUEST,
      //   data: {
      //   }
      // });
      // resolve(true);
      // return;

      var authToken;
      var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
          authToken= gettoken;
      });
      console.log('token: ',authToken);
      // API
      HTTP('get', '/dashboard/', null,{authorization: authToken})
        .then(function (response) {
          if(response.data.errors===null){
            dispatch({
              type: DASHBOARD_STATBOXES_GET_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          }else {
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: DASHBOARD_STATBOXES_GET_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}