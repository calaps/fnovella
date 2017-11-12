
/* Actions */
import {
  LOADER_ADD_REQUEST,
  LOADER_REMOVE_REQUEST
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const loader_reducer = (state = initialState.loader, action) => {
  switch(action.type){
    case LOADER_ADD_REQUEST:
      console.log(LOADER_ADD_REQUEST);
      return Object.assign(
        {},
        state,
        {
          requestInProgress: state.requestInProgress+1
        }
      );
    case LOADER_REMOVE_REQUEST:
      console.log(LOADER_REMOVE_REQUEST);
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

export default loader_reducer;
