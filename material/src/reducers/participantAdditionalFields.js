
/* Actions */
import {
    PARTICIPANT_ADDTIONAL_FIELD_ADD_REQUEST,
    PARTICIPANT_ADDTIONAL_FIELD_ADD_SUCCESS,
    PARTICIPANT_ADDTIONAL_FIELD_ADD_FAIL,
    PARTICIPANT_ADDTIONAL_FIELD_DELETE_FAIL,
    PARTICIPANT_ADDTIONAL_FIELD_DELETE_REQUEST,
    PARTICIPANT_ADDTIONAL_FIELD_DELETE_SUCCESS,
    PARTICIPANT_ADDTIONAL_FIELD_GET_FAIL,
    PARTICIPANT_ADDTIONAL_FIELD_GET_REQUEST,
    PARTICIPANT_ADDTIONAL_FIELD_GET_SUCCESS,
    PARTICIPANT_ADDTIONAL_FIELD_UPDATE_FAIL,
    PARTICIPANT_ADDTIONAL_FIELD_UPDATE_REQUEST,
    PARTICIPANT_ADDTIONAL_FIELD_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const participant_additional_field_reducer = (state = initialState.participantAdditionalFields, action) => {
    let newState;
    switch(action.type){
      case PARTICIPANT_ADDTIONAL_FIELD_ADD_SUCCESS:
        console.log(PARTICIPANT_ADDTIONAL_FIELD_ADD_SUCCESS);
        return [...state, action.data];
      case PARTICIPANT_ADDTIONAL_FIELD_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case PARTICIPANT_ADDTIONAL_FIELD_GET_SUCCESS:
        console.log(PARTICIPANT_ADDTIONAL_FIELD_GET_SUCCESS);
        return {
            ...state,
            ...action.data
        };
      case PARTICIPANT_ADDTIONAL_FIELD_GET_FAIL:
        // TODO: some alert may be
        return state;
      case PARTICIPANT_ADDTIONAL_FIELD_DELETE_SUCCESS:
        console.log(PARTICIPANT_ADDTIONAL_FIELD_DELETE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case PARTICIPANT_ADDTIONAL_FIELD_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case PARTICIPANT_ADDTIONAL_FIELD_UPDATE_SUCCESS:
        console.log(PARTICIPANT_ADDTIONAL_FIELD_UPDATE_SUCCESS);
        newState = [...state];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case PARTICIPANT_ADDTIONAL_FIELD_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default participant_additional_field_reducer;
  