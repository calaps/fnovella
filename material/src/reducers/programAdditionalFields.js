
/* Actions */
import {
    PROGRAM_ADDTIONAL_FIELD_ADD_REQUEST,
    PROGRAM_ADDTIONAL_FIELD_ADD_SUCCESS,
    PROGRAM_ADDTIONAL_FIELD_ADD_FAIL,
    PROGRAM_ADDTIONAL_FIELD_DELETE_FAIL,
    PROGRAM_ADDTIONAL_FIELD_DELETE_REQUEST,
    PROGRAM_ADDTIONAL_FIELD_DELETE_SUCCESS,
    PROGRAM_ADDTIONAL_FIELD_GET_FAIL,
    PROGRAM_ADDTIONAL_FIELD_GET_REQUEST,
    PROGRAM_ADDTIONAL_FIELD_GET_SUCCESS,
    PROGRAM_ADDTIONAL_FIELD_UPDATE_FAIL,
    PROGRAM_ADDTIONAL_FIELD_UPDATE_REQUEST,
    PROGRAM_ADDTIONAL_FIELD_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const program_additional_field_reducer = (state = initialState.programAdditionalFields, action) => {
    let newState;
    switch(action.type){
      case PROGRAM_ADDTIONAL_FIELD_ADD_SUCCESS:
        console.log(PROGRAM_ADDTIONAL_FIELD_ADD_SUCCESS);
        return [...state, action.data];
      case PROGRAM_ADDTIONAL_FIELD_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case PROGRAM_ADDTIONAL_FIELD_GET_SUCCESS:
        console.log(PROGRAM_ADDTIONAL_FIELD_GET_SUCCESS);
        return {
            ...state,
            ...action.data
        };
      case PROGRAM_ADDTIONAL_FIELD_GET_FAIL:
        // TODO: some alert may be
        return state;
      case PROGRAM_ADDTIONAL_FIELD_DELETE_SUCCESS:
        console.log(PROGRAM_ADDTIONAL_FIELD_DELETE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case PROGRAM_ADDTIONAL_FIELD_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case PROGRAM_ADDTIONAL_FIELD_UPDATE_SUCCESS:
        console.log(PROGRAM_ADDTIONAL_FIELD_UPDATE_SUCCESS);
        newState = [...state];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case PROGRAM_ADDTIONAL_FIELD_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default program_additional_field_reducer;
  