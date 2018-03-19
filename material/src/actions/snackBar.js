import {
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';

export function snackBarRemove() {
  return function (dispatch) {
    dispatch({
      type: SNACKBAR_REMOVE
    });
  }
}

export function snackBarShow(message) {
  return function (dispatch) {
    dispatch({
      type: SNACKBAR_SHOW,
      data: {
        message
      }
    });
  }
}
