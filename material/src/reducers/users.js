
/* Actions */
import {
  USERS_ADD_REQUEST,
  USERS_ADD_SUCCESS,
  USERS_ADD_FAIL,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_GET_FAIL,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_UPDATE_FAIL,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const users_reducer = (state = initialState.users, action) => {
  let newState;
  switch(action.type){
    case USERS_ADD_SUCCESS:
      console.log(USERS_ADD_SUCCESS, [...state, action.data])
      return [...state, action.data];
    case USERS_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case USERS_GET_SUCCESS:
      console.log(USERS_GET_SUCCESS)
      return action.data;
    case USERS_GET_FAIL:
      // TODO: some alert may be
      return state;
    case USERS_DELETE_SUCCESS:
      console.log(USERS_DELETE_SUCCESS);
      newState = [...state];
      console.log("new State: ", newState);
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState.splice(i, 1);
        }
      }
      console.log("new State: ", newState);
      return newState;
    case USERS_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case USERS_UPDATE_SUCCESS:
      console.log(USERS_UPDATE_SUCCESS)
      newState = [...state];
      console.log("new State: ", newState);
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      console.log("new State: ", newState);
      return newState;
    case USERS_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
}

export default users_reducer;
