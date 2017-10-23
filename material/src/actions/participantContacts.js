import {HTTP} from './../utils/HTTP';
import {
  PARTICIPANT_CONTACT_ADD_REQUEST,
  PARTICIPANT_CONTACT_ADD_SUCCESS,
  PARTICIPANT_CONTACT_ADD_FAIL
} from './../constants/ActionTypes';



export function participantContactAddRequest(data) {
  return function (dispatch) {
    return new Promise(function(resolve, reject){{

      // will be removed once API is ready
      // dispatch({
      //   type: PARTICIPANT_CONTACT_ADD_SUCCESS,
      //   data
      // });
      // resolve(true);
      // return;


      // API
      HTTP('post', '/participant_contacts/', data,{authorization: localStorage.getItem('@fnovella:token') })
        .then(function (response) {
          console.log("response: ",response);
          if(!response.data.errors){
            dispatch({
              type: PARTICIPANT_CONTACT_ADD_SUCCESS,
              data: response.data.data.content
            });
            resolve(response.data);
          }else{
            reject(response.data);
          }
        })
        .catch(error => {
          dispatch({
            type: PARTICIPANT_CONTACT_ADD_FAIL,
            error: error
          });
          reject(error);
        })
    }})
  }
}
