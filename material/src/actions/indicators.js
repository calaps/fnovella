import {HTTP} from './../utils/HTTP';

/* Actions */
import {
  INDICATORS_GROUP_GET_REQUEST,
  INDICATORS_GROUP_GET_REQUEST_FAIL,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function indicatorsGetGroup(groupId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/group/insights/' + groupId, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then((response) => {
            if (response.data.errors === null) {
              dispatch({
                type: INDICATORS_GROUP_GET_REQUEST,
                data: response.data.data
              });
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch((error) => {
            dispatch({
              type: INDICATORS_GROUP_GET_REQUEST_FAIL,
            });
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: 'Este grupo aún no tiene lo suficiente para crear indicadores'
              }
            });
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          });
      }
    })
  }
}
