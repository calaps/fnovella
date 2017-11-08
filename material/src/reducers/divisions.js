
/* Actions */
import {
  DIVISIONS_ADD_REQUEST,
  DIVISIONS_ADD_SUCCESS,
  DIVISIONS_ADD_FAIL,
  DIVISIONS_DELETE_FAIL,
  DIVISIONS_DELETE_REQUEST,
  DIVISIONS_DELETE_SUCCESS,
  DIVISIONS_GET_FAIL,
  DIVISIONS_GET_REQUEST,
  DIVISIONS_GET_SUCCESS,
  DIVISIONS_UPDATE_FAIL,
  DIVISIONS_UPDATE_REQUEST,
  DIVISIONS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const divisions_reducer = (state = initialState.divisions, action) => {
  let newState;
  switch(action.type){
    case DIVISIONS_ADD_SUCCESS:
      console.log(DIVISIONS_ADD_SUCCESS);
      return [...state, action.data];
    case DIVISIONS_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case DIVISIONS_GET_SUCCESS:
      console.log(DIVISIONS_GET_SUCCESS);
      return action.data;
    case DIVISIONS_GET_FAIL:
      // TODO: some alert may be
      return state;
    case DIVISIONS_DELETE_SUCCESS:
      console.log(DIVISIONS_DELETE_SUCCESS);
      newState = {...state};
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case DIVISIONS_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case DIVISIONS_UPDATE_SUCCESS:
      console.log(DIVISIONS_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case DIVISIONS_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default divisions_reducer;
