
/* Actions */
import {
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const snackBar_reducer = (state = initialState.snackBar, action) => {
  switch(action.type){
    case SNACKBAR_SHOW:
      console.log(SNACKBAR_SHOW);
      return Object.assign(
        {},
        state,
        {
          open: true,
          message: action.data.message
        }
      );
    case SNACKBAR_REMOVE:
      console.log(SNACKBAR_REMOVE);
      return Object.assign(
        {},
        state,
        {
          open: false,
          message: ''
        }
      );
    default:
      return state;
  }
};

export default snackBar_reducer;
