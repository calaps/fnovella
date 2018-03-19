
/* Actions */
import {
  PARTICIPANT_CONTACT_DELETE_FAIL,
  PARTICIPANT_CONTACT_DELETE_REQUEST,
  PARTICIPANT_CONTACT_DELETE_SUCCESS,
  PARTICIPANT_CONTACT_GET_FAIL,
  PARTICIPANT_CONTACT_GET_REQUEST,
  PARTICIPANT_CONTACT_GET_SUCCESS,
  PARTICIPANT_CONTACT_UPDATE_FAIL,
  PARTICIPANT_CONTACT_UPDATE_REQUEST,
  PARTICIPANT_CONTACT_UPDATE_SUCCESS,
  PARTICIPANT_CONTACT_ADD_REQUEST,
  PARTICIPANT_CONTACT_ADD_SUCCESS,
  PARTICIPANT_CONTACT_ADD_FAIL,
  PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_REQUEST,
  PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_SUCCESS,
  PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_FAIL
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const participants_contacts_reducer = (state = initialState.participantContacts, action) => {
  let newState;
  switch(action.type){
    case PARTICIPANT_CONTACT_ADD_SUCCESS:
      console.log(PARTICIPANT_CONTACT_ADD_SUCCESS);
      return [...state, action.data];
    case PARTICIPANT_CONTACT_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_SUCCESS:
      console.log(PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_SUCCESS);
      return {
        ...state,
        ...action.data
      };
    case PARTICIPANT_CONTACT_GET_BY_PARTICIPANTID_FAIL:
      // TODO: some alert may be
      return state;
    case PARTICIPANT_CONTACT_UPDATE_SUCCESS:
      console.log(PARTICIPANT_CONTACT_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case PARTICIPANT_CONTACT_UPDATE_FAIL:
      console.log(PARTICIPANT_CONTACT_UPDATE_FAIL);
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default participants_contacts_reducer;
