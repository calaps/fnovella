
/* Actions */
import {
  SEDES_ADD_REQUEST,
  SEDES_ADD_SUCCESS,
  SEDES_ADD_FAIL,
  SEDES_DELETE_FAIL,
  SEDES_DELETE_REQUEST,
  SEDES_DELETE_SUCCESS,
  SEDES_GET_FAIL,
  SEDES_GET_REQUEST,
  SEDES_GET_SUCCESS,
  SEDES_UPDATE_FAIL,
  SEDES_UPDATE_REQUEST,
  SEDES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const sedes_reducer = (state = initialState.sedes, action) => {
  let newState;
  switch(action.type){
    case SEDES_ADD_SUCCESS:
      console.log(SEDES_ADD_SUCCESS);
      return [...state, action.data];
    case SEDES_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case SEDES_GET_SUCCESS:
      console.log(SEDES_GET_SUCCESS);
      return {
        ...state,
        ...action.data
      };
    case SEDES_GET_FAIL:
      // TODO: some alert may be
      return state;
    case SEDES_DELETE_SUCCESS:
      console.log(SEDES_DELETE_SUCCESS);
      newState = {...state};
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      return newState;
    case SEDES_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case SEDES_UPDATE_SUCCESS:
      console.log(SEDES_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case SEDES_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default sedes_reducer;
