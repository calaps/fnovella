/* Actions */
import {
  INDICATORS_GROUP_GET_REQUEST,
  INDICATORS_GROUP_GET_REQUEST_FAIL
} from './../constants/ActionTypes';
import initialState from './../stores/initialState';

const indicators_reducer = (state = initialState.indicators, action) => {
  switch (action.type) {
    case INDICATORS_GROUP_GET_REQUEST:
      return action.data;
    case INDICATORS_GROUP_GET_REQUEST_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default indicators_reducer;
