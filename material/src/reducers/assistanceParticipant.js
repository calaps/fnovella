
/* Actions */
import {
    ASSISTANCE_PARTICIPANT_ADD_REQUEST,
    ASSISTANCE_PARTICIPANT_ADD_SUCCESS,
    ASSISTANCE_PARTICIPANT_ADD_FAIL,
    ASSISTANCE_PARTICIPANT_DELETE_FAIL,
    ASSISTANCE_PARTICIPANT_DELETE_REQUEST,
    ASSISTANCE_PARTICIPANT_DELETE_SUCCESS,
    ASSISTANCE_PARTICIPANT_GET_FAIL,
    ASSISTANCE_PARTICIPANT_GET_REQUEST,
    ASSISTANCE_PARTICIPANT_GET_SUCCESS,
    ASSISTANCE_PARTICIPANT_UPDATE_FAIL,
    ASSISTANCE_PARTICIPANT_UPDATE_REQUEST,
    ASSISTANCE_PARTICIPANT_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const assistanceParticipant = (state = initialState.assistanceParticipant, action) => {
    let newState;
    switch(action.type){
      case ASSISTANCE_PARTICIPANT_ADD_SUCCESS:
        console.log(ASSISTANCE_PARTICIPANT_ADD_SUCCESS);
        return {...state, ...action.data};
      case ASSISTANCE_PARTICIPANT_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case ASSISTANCE_PARTICIPANT_GET_SUCCESS:
        console.log(ASSISTANCE_PARTICIPANT_GET_SUCCESS);
        return {
          ...state,
          ...action.data
        };
      case ASSISTANCE_PARTICIPANT_GET_FAIL:
        // TODO: some alert may be
        return state;
      case ASSISTANCE_PARTICIPANT_DELETE_SUCCESS:
        console.log(ASSISTANCE_PARTICIPANT_DELETE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case ASSISTANCE_PARTICIPANT_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case ASSISTANCE_PARTICIPANT_UPDATE_SUCCESS:
        console.log(ASSISTANCE_PARTICIPANT_UPDATE_SUCCESS);
        newState = [...state.content];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case ASSISTANCE_PARTICIPANT_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default assistanceParticipant;
  