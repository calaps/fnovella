
/* Actions */
import {
    PROGRAM_INSTRUCTOR_ADD_REQUEST,
    PROGRAM_INSTRUCTOR_ADD_SUCCESS,
    PROGRAM_INSTRUCTOR_ADD_FAIL,
    PROGRAM_INSTRUCTOR_DELETE_FAIL,
    PROGRAM_INSTRUCTOR_DELETE_REQUEST,
    PROGRAM_INSTRUCTOR_DELETE_SUCCESS,
    PROGRAM_INSTRUCTOR_GET_FAIL,
    PROGRAM_INSTRUCTOR_GET_REQUEST,
    PROGRAM_INSTRUCTOR_GET_SUCCESS,
    PROGRAM_INSTRUCTOR_UPDATE_FAIL,
    PROGRAM_INSTRUCTOR_UPDATE_REQUEST,
    PROGRAM_INSTRUCTOR_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const program_instructors_reducer = (state = initialState.programInstructors, action) => {
    let newState;
    switch(action.type){
      case PROGRAM_INSTRUCTOR_ADD_SUCCESS:
        console.log(PROGRAM_INSTRUCTOR_ADD_SUCCESS);
        return [...state, action.data];
      case PROGRAM_INSTRUCTOR_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case PROGRAM_INSTRUCTOR_GET_SUCCESS:
        console.log(PROGRAM_INSTRUCTOR_GET_SUCCESS);
        return {
            ...state,
            ...action.data
        };
      case PROGRAM_INSTRUCTOR_GET_FAIL:
        // TODO: some alert may be
        return state;
      case PROGRAM_INSTRUCTOR_DELETE_SUCCESS:
        console.log(PROGRAM_INSTRUCTOR_DELETE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case PROGRAM_INSTRUCTOR_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case PROGRAM_INSTRUCTOR_UPDATE_SUCCESS:
        console.log(PROGRAM_INSTRUCTOR_UPDATE_SUCCESS);
        newState = [...state];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case PROGRAM_INSTRUCTOR_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default program_instructors_reducer;
  