import {
  CATEGORIES_ADD_REQUEST,
  CATEGORIES_ADD_SUCCESS,
  CATEGORIES_ADD_FAIL,
  CATEGORIES_DELETE_FAIL,
  CATEGORIES_DELETE_REQUEST,
  CATEGORIES_DELETE_SUCCESS,
  CATEGORIES_GET_FAIL,
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_UPDATE_FAIL,
  CATEGORIES_UPDATE_REQUEST,
  CATEGORIES_UPDATE_SUCCESS
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const categories_reducer = (state = initialState.categories, action) => {
  let newState;
  switch(action.type){
    case CATEGORIES_ADD_SUCCESS:
      console.log(CATEGORIES_ADD_SUCCESS);
      return [...state, action.data];
    case CATEGORIES_ADD_FAIL:
      // TODO: some alert may be
      return state;
    case CATEGORIES_GET_SUCCESS:
      console.log(CATEGORIES_GET_SUCCESS);
      return action.data;
    case CATEGORIES_GET_FAIL:
      // TODO: some alert may be
      return state;
    case CATEGORIES_DELETE_SUCCESS:
      console.log(CATEGORIES_DELETE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState.splice(i, 1);
        }
      }
      return newState;
    case CATEGORIES_DELETE_FAIL:
      // TODO: some alert may be
      return state;
    case CATEGORIES_UPDATE_SUCCESS:
      console.log(CATEGORIES_UPDATE_SUCCESS);
      newState = [...state];
      for(let i=0; i<newState.length; i++){
        if(newState[i].id === action.data.id){
          newState[i] = action.data;
        }
      }
      return newState;
    case CATEGORIES_UPDATE_FAIL:
      // TODO: some alert may be
      return state;
    default:
      return state;
  }
};

export default categories_reducer;
