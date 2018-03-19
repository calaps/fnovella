
/* Actions */
import {
  DASHBOARD_STATBOXES_GET_FAIL,
  DASHBOARD_STATBOXES_GET_REQUEST,
  DASHBOARD_STATBOXES_GET_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const workshops_reducer = (state = initialState.dashboard, action) => {
  switch(action.type){
    case DASHBOARD_STATBOXES_GET_SUCCESS:
      console.log(DASHBOARD_STATBOXES_GET_SUCCESS);
      return action.data;
    case DASHBOARD_STATBOXES_GET_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default workshops_reducer;
