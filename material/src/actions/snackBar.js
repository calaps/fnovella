import {
  SNACKBAR_REMOVE
} from './../constants/ActionTypes';

export function snackBarRemove() {
  return function (dispatch) {
    dispatch({
      type: SNACKBAR_REMOVE
    });
  }
}
