
/* Actions */
import {
    GROUPS_ADD_REQUEST,
    GROUPS_ADD_SUCCESS,
    GROUPS_ADD_FAIL,
    GROUPS_DELETE_FAIL,
    GROUPS_DELETE_REQUEST,
    GROUPS_DELETE_SUCCESS,
    GROUPS_GET_FAIL,
    GROUPS_GET_REQUEST,
    GROUPS_GET_SUCCESS,
    GROUPS_UPDATE_FAIL,
    GROUPS_UPDATE_REQUEST,
    GROUPS_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const groups_reducer = (state = initialState.groups, action) => {
    let newState;
    switch(action.type){
      case GROUPS_ADD_SUCCESS:
        console.log(GROUPS_ADD_SUCCESS);
        return [...state, action.data];
      case GROUPS_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case GROUPS_GET_SUCCESS:
        console.log(GROUPS_GET_SUCCESS);
        return action.data;
      case GROUPS_GET_FAIL:
        // TODO: some alert may be
        return state;
      case GROUPS_DELETE_SUCCESS:
        console.log(GROUPS_DELETE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case GROUPS_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case GROUPS_UPDATE_SUCCESS:
        console.log(GROUPS_UPDATE_SUCCESS);
        newState = [...state];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case GROUPS_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default groups_reducer;
  