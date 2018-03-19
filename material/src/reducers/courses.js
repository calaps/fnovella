
/* Actions */
import {
  COURSES_ADD_REQUEST,
  COURSES_ADD_SUCCESS,
  COURSES_ADD_FAIL,
  COURSES_DELETE_FAIL,
  COURSES_DELETE_REQUEST,
  COURSES_DELETE_SUCCESS,
  COURSES_GET_FAIL,
  COURSES_GET_REQUEST,
  COURSES_GET_SUCCESS,
  COURSES_UPDATE_FAIL,
  COURSES_UPDATE_REQUEST,
  COURSES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const courses_reducer = (state = initialState.courses, action) => {
  let newState;
  switch(action.type){
    case COURSES_ADD_SUCCESS:
      console.log(COURSES_ADD_SUCCESS);
      return [...state, action.data];
    case COURSES_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case COURSES_GET_SUCCESS:
      console.log(COURSES_GET_SUCCESS);
      return action.data;
    case COURSES_GET_FAIL:
      // TODO: some alert may be
      return state;
    case COURSES_DELETE_SUCCESS:
      console.log(COURSES_DELETE_SUCCESS);
      newState = {...state};
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case COURSES_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case COURSES_UPDATE_SUCCESS:
      console.log(COURSES_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case COURSES_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default courses_reducer;
