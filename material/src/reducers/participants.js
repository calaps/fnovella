
/* Actions */
import {
  PARTICIPANT_ADD_REQUEST,
  PARTICIPANT_ADD_SUCCESS,
  PARTICIPANT_ADD_FAIL,
  PARTICIPANT_DELETE_FAIL,
  PARTICIPANT_DELETE_REQUEST,
  PARTICIPANT_DELETE_SUCCESS,
  PARTICIPANT_GET_FAIL,
  PARTICIPANT_GET_REQUEST,
  PARTICIPANT_GET_SUCCESS,
  PARTICIPANT_UPDATE_FAIL,
  PARTICIPANT_UPDATE_REQUEST,
  PARTICIPANT_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const participants_reducer = (state = initialState.participants, action) => {
  let newState;
  switch(action.type){
    case PARTICIPANT_ADD_SUCCESS:
      console.log(PARTICIPANT_ADD_SUCCESS)
      return [...state, action.data];
    case PARTICIPANT_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case PARTICIPANT_GET_SUCCESS:
      console.log(PARTICIPANT_GET_SUCCESS)
      return action.data;
    case PARTICIPANT_GET_FAIL:
      // TODO: some alert may be
      return state;
    case PARTICIPANT_DELETE_SUCCESS:
      console.log(PARTICIPANT_DELETE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState.splice(i, 1);
        }
      }
      return newState;
    case PARTICIPANT_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case PARTICIPANT_UPDATE_SUCCESS:
      console.log(PARTICIPANT_UPDATE_SUCCESS)
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case PARTICIPANT_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
}

export default participants_reducer;
