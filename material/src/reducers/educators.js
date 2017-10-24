
/* Actions */
import {
  EDUCATORS_ADD_REQUEST,
  EDUCATORS_ADD_SUCCESS,
  EDUCATORS_ADD_FAIL,
  EDUCATORS_DELETE_FAIL,
  EDUCATORS_DELETE_REQUEST,
  EDUCATORS_DELETE_SUCCESS,
  EDUCATORS_GET_FAIL,
  EDUCATORS_GET_REQUEST,
  EDUCATORS_GET_SUCCESS,
  EDUCATORS_UPDATE_FAIL,
  EDUCATORS_UPDATE_REQUEST,
  EDUCATORS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const educators_reducer = (state = initialState.educators, action) => {
  let newState;
  switch(action.type){
    case EDUCATORS_ADD_SUCCESS:
      console.log(EDUCATORS_ADD_SUCCESS)
      return [...state, action.data];
    case EDUCATORS_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case EDUCATORS_GET_SUCCESS:
      console.log(EDUCATORS_GET_SUCCESS)
      return action.data;
    case EDUCATORS_GET_FAIL:
      // TODO: some alert may be
      return state;
    case EDUCATORS_DELETE_SUCCESS:
      console.log(EDUCATORS_DELETE_SUCCESS);
      newState = {...state};
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case EDUCATORS_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case EDUCATORS_UPDATE_SUCCESS:
      console.log(EDUCATORS_UPDATE_SUCCESS)
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case EDUCATORS_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
}

export default educators_reducer;
