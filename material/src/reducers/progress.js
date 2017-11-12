
/* Actions */
import {
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const progress_reducer = (state = initialState.progress, action) => {
  switch(action.type){
    case PROGRESS_ADD_REQUEST:
      console.log(PROGRESS_ADD_REQUEST);
      return Object.assign(
        {},
        state,
        {
          requestInProgress: state.requestInProgress+1
        }
      );
    case PROGRESS_REMOVE_REQUEST:
      console.log(PROGRESS_REMOVE_REQUEST);
      return Object.assign(
        {},
        state,
        {
          requestInProgress: state.requestInProgress-1
        }
      );
    default:
      return state;
  }
};

export default progress_reducer;
