
/* Actions */
import {
  PRIVILEGES_ADD_REQUEST,
  PRIVILEGES_ADD_SUCCESS,
  PRIVILEGES_ADD_FAIL,
  PRIVILEGES_DELETE_FAIL,
  PRIVILEGES_DELETE_REQUEST,
  PRIVILEGES_DELETE_SUCCESS,
  PRIVILEGES_GET_FAIL,
  PRIVILEGES_GET_REQUEST,
  PRIVILEGES_GET_SUCCESS,
  PRIVILEGES_GET_ALL_SUCCESS,
  PRIVILEGES_UPDATE_FAIL,
  PRIVILEGES_UPDATE_REQUEST,
  PRIVILEGES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const privileges_reducer = (state = initialState.privileges, action) => {
  let newState;
  switch(action.type){
    case PRIVILEGES_ADD_SUCCESS:
      console.log(PRIVILEGES_ADD_SUCCESS)
      return [...state, action.data];
    case PRIVILEGES_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case PRIVILEGES_GET_SUCCESS:
      console.log(PRIVILEGES_GET_SUCCESS)
      return action.data;
    case PRIVILEGES_GET_ALL_SUCCESS:
      console.log(PRIVILEGES_GET_ALL_SUCCESS)
      return action.data;
    case PRIVILEGES_GET_FAIL:
      // TODO: some alert may be
      return state;
    case PRIVILEGES_DELETE_SUCCESS:
      console.log(PRIVILEGES_DELETE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
          newState.splice(i, 1);
        }
      }
      return newState;
    case PRIVILEGES_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case PRIVILEGES_UPDATE_SUCCESS:
      console.log(PRIVILEGES_UPDATE_SUCCESS)
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case PRIVILEGES_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
}

export default privileges_reducer;
