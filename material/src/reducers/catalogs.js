
/* Actions */
import {
  CATALOGS_ADD_REQUEST,
  CATALOGS_ADD_SUCCESS,
  CATALOGS_ADD_FAIL,
  CATALOGS_DELETE_FAIL,
  CATALOGS_DELETE_REQUEST,
  CATALOGS_DELETE_SUCCESS,
  CATALOGS_GET_FAIL,
  CATALOGS_GET_REQUEST,
  CATALOGS_GET_SUCCESS,
  CATALOGS_UPDATE_FAIL,
  CATALOGS_UPDATE_REQUEST,
  CATALOGS_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const catalogs_reducer = (state = initialState.catalogs, action) => {
  let newState;
  switch(action.type){
    case CATALOGS_ADD_SUCCESS:
      console.log(CATALOGS_ADD_SUCCESS);
      return [...state, action.data];
    case CATALOGS_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case CATALOGS_GET_SUCCESS:
      console.log(CATALOGS_GET_SUCCESS);
      return {...state,...action.data};
    case CATALOGS_GET_FAIL:
      // TODO: some alert may be
      return state;
    case CATALOGS_DELETE_SUCCESS:
      console.log(CATALOGS_DELETE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case CATALOGS_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case CATALOGS_UPDATE_SUCCESS:
      console.log(CATALOGS_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case CATALOGS_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default catalogs_reducer;
