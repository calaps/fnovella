
/* Actions */
import {
    INSCRIPTION_PARTICIPANT_ADD_REQUEST,
    INSCRIPTION_PARTICIPANT_ADD_SUCCESS,
    INSCRIPTION_PARTICIPANT_ADD_FAIL,
    INSCRIPTION_PARTICIPANT_DELETE_FAIL,
    INSCRIPTION_PARTICIPANT_DELETE_REQUEST,
    INSCRIPTION_PARTICIPANT_DELETE_SUCCESS,
    INSCRIPTION_PARTICIPANT_GET_FAIL,
    INSCRIPTION_PARTICIPANT_GET_REQUEST,
    INSCRIPTION_PARTICIPANT_GET_SUCCESS,
    INSCRIPTION_PARTICIPANT_UPDATE_FAIL,
    INSCRIPTION_PARTICIPANT_UPDATE_REQUEST,
    INSCRIPTION_PARTICIPANT_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const inscription_participants_reducer = (state = initialState.inscriptionParticipants, action) => {
    let newState;
    switch(action.type){
      case INSCRIPTION_PARTICIPANT_ADD_SUCCESS:
        console.log(INSCRIPTION_PARTICIPANT_ADD_SUCCESS);
        return [...state, action.data];
      case INSCRIPTION_PARTICIPANT_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case INSCRIPTION_PARTICIPANT_GET_SUCCESS:
        console.log(INSCRIPTION_PARTICIPANT_GET_SUCCESS);
        return {
          ...state,
          ...action.data
        };
      case INSCRIPTION_PARTICIPANT_GET_FAIL:
        // TODO: some alert may be
        return state;
      case INSCRIPTION_PARTICIPANT_DELETE_SUCCESS:
        console.log(INSCRIPTION_PARTICIPANT_DELETE_SUCCESS);
        newState = {...state};
        for (let i = 0; i < newState.content.length; i++) {
          if (newState.content[i].id === action.data.id) {
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case INSCRIPTION_PARTICIPANT_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case INSCRIPTION_PARTICIPANT_UPDATE_SUCCESS:
        console.log(INSCRIPTION_PARTICIPANT_UPDATE_SUCCESS);
        newState = [...state];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case INSCRIPTION_PARTICIPANT_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default inscription_participants_reducer;
  