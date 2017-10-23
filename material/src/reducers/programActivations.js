/* Actions */
import {
  PROGRAM_ACTIVATIONS_GET_REQUEST,
  PROGRAM_ACTIVATIONS_GET_SUCCESS,
  PROGRAM_ACTIVATIONS_GET_FAIL,
  PROGRAM_ACTIVATIONS_ADD_REQUEST,
  PROGRAM_ACTIVATIONS_ADD_SUCCESS,
  PROGRAM_ACTIVATIONS_ADD_FAIL,
  PROGRAM_ACTIVATIONS_DELETE_REQUEST,
  PROGRAM_ACTIVATIONS_DELETE_SUCCESS,
  PROGRAM_ACTIVATIONS_DELETE_FAIL,
  PROGRAM_ACTIVATIONS_UPDATE_REQUEST,
  PROGRAM_ACTIVATIONS_UPDATE_SUCCESS,
  PROGRAM_ACTIVATIONS_UPDATE_FAIL
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const program_activations_reducer = (state = initialState.programActivations, action) => {
  let newState;
  switch (action.type) {
    case PROGRAM_ACTIVATIONS_GET_SUCCESS:
      console.log(PROGRAM_ACTIVATIONS_GET_SUCCESS);
      return {
        ...state,
        ...action.data
      };
    case PROGRAM_ACTIVATIONS_GET_FAIL:
      // TODO: some alert may be
      return state;
    case PROGRAM_ACTIVATIONS_ADD_SUCCESS:
      console.log(PROGRAM_ACTIVATIONS_ADD_SUCCESS);
      return [...state, action.data];
    case PROGRAM_ACTIVATIONS_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case PROGRAM_ACTIVATIONS_DELETE_SUCCESS:
      console.log(PROGRAM_ACTIVATIONS_DELETE_SUCCESS);
      newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.data.id) {
          newState.splice(i, 1);
        }
      }
      return newState;
    case PROGRAM_ACTIVATIONS_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case PROGRAM_ACTIVATIONS_UPDATE_SUCCESS:
      console.log(PROGRAM_ACTIVATIONS_UPDATE_SUCCESS);
      newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.data.id) {
          newState[i] = action.data;
        }
      }
      return newState;
    case PROGRAM_ACTIVATIONS_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default program_activations_reducer;
