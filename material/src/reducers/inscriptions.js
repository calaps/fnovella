/* Actions */
import {
  INSCRIPTION_ADD_REQUEST,
  INSCRIPTION_ADD_SUCCESS,
  INSCRIPTION_ADD_FAIL,
  INSCRIPTION_DELETE_FAIL,
  INSCRIPTION_DELETE_REQUEST,
  INSCRIPTION_DELETE_SUCCESS,
  INSCRIPTION_GET_FAIL,
  INSCRIPTION_GET_REQUEST,
  INSCRIPTION_GET_SUCCESS,
  INSCRIPTION_UPDATE_FAIL,
  INSCRIPTION_UPDATE_REQUEST,
  INSCRIPTION_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const inscriptions_reducer = (state = initialState.inscriptions, action) => {
  let newState;
  switch (action.type) {
    case INSCRIPTION_ADD_SUCCESS:
      console.log(INSCRIPTION_ADD_SUCCESS);
      return [...state, action.data];
    case INSCRIPTION_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case INSCRIPTION_GET_SUCCESS:
      console.log(INSCRIPTION_GET_SUCCESS);
      return {
        ...state,
        ...action.data
      };
    case INSCRIPTION_GET_FAIL:
      // TODO: some alert may be
      return state;
    case INSCRIPTION_DELETE_SUCCESS:
      console.log(INSCRIPTION_DELETE_SUCCESS);
      newState = {...state};
      for (let i = 0; i < newState.content.length; i++) {
        if (newState.content[i].id === action.data.id) {
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case INSCRIPTION_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case INSCRIPTION_UPDATE_SUCCESS:
      console.log(INSCRIPTION_UPDATE_SUCCESS);
      newState = {...state};
      return {...newState};
    case INSCRIPTION_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default inscriptions_reducer;
