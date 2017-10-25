
/* Actions */
import {
  WORKSHOPS_ADD_REQUEST,
  WORKSHOPS_ADD_SUCCESS,
  WORKSHOPS_ADD_FAIL,
  WORKSHOPS_DELETE_FAIL,
  WORKSHOPS_DELETE_REQUEST,
  WORKSHOPS_DELETE_SUCCESS,
  WORKSHOPS_GET_FAIL,
  WORKSHOPS_GET_REQUEST,
  WORKSHOPS_GET_SUCCESS,
  WORKSHOPS_UPDATE_FAIL,
  WORKSHOPS_UPDATE_REQUEST,
  WORKSHOPS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const workshops_reducer = (state = initialState.workshops, action) => {
  let newState;
  switch(action.type){
    case WORKSHOPS_ADD_SUCCESS:
      console.log(WORKSHOPS_ADD_SUCCESS);
      return [...state, action.data];
    case WORKSHOPS_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case WORKSHOPS_GET_SUCCESS:
      console.log(WORKSHOPS_GET_SUCCESS);
      return action.data;
    case WORKSHOPS_GET_FAIL:
      // TODO: some alert may be
      return state;
    case WORKSHOPS_DELETE_SUCCESS:
      console.log(WORKSHOPS_DELETE_SUCCESS);
      newState = {...state};
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case WORKSHOPS_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case WORKSHOPS_UPDATE_SUCCESS:
      console.log(WORKSHOPS_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case WORKSHOPS_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default workshops_reducer;
