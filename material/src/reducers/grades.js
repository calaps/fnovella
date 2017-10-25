
/* Actions */
import {
  GRADES_ADD_REQUEST,
  GRADES_ADD_SUCCESS,
  GRADES_ADD_FAIL,
  GRADES_DELETE_FAIL,
  GRADES_DELETE_REQUEST,
  GRADES_DELETE_SUCCESS,
  GRADES_GET_FAIL,
  GRADES_GET_REQUEST,
  GRADES_GET_SUCCESS,
  GRADES_UPDATE_FAIL,
  GRADES_UPDATE_REQUEST,
  GRADES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const grades_reducer = (state = initialState.grades, action) => {
  let newState;
  switch(action.type){
    case GRADES_ADD_SUCCESS:
      console.log(GRADES_ADD_SUCCESS);
      return [...state, action.data];
    case GRADES_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case GRADES_GET_SUCCESS:
      console.log(GRADES_GET_SUCCESS);
      return action.data;
    case GRADES_GET_FAIL:
      // TODO: some alert may be
      return state;
    case GRADES_DELETE_SUCCESS:
      console.log(GRADES_DELETE_SUCCESS);
      newState = {...state};
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case GRADES_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case GRADES_UPDATE_SUCCESS:
      console.log(GRADES_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case GRADES_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default grades_reducer;
