import {
    SECTIONS_ADD_REQUEST,
    SECTIONS_ADD_SUCCESS,
    SECTIONS_ADD_FAIL,
    SECTIONS_DELETE_FAIL,
    SECTIONS_DELETE_REQUEST,
    SECTIONS_DELETE_SUCCESS,
    SECTIONS_GET_FAIL,
    SECTIONS_GET_REQUEST,
    SECTIONS_GET_SUCCESS,
    SECTIONS_UPDATE_FAIL,
    SECTIONS_UPDATE_REQUEST,
    SECTIONS_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const sections_reducer = (state = initialState.sections, action) => {
    let newState;
    switch(action.type){
      case SECTIONS_ADD_SUCCESS:
        console.log(SECTIONS_ADD_SUCCESS);
        return [...state, action.data];
      case SECTIONS_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case SECTIONS_GET_SUCCESS:
        console.log(SECTIONS_GET_SUCCESS);
        return action.data;
      case SECTIONS_GET_FAIL:
        // TODO: some alert may be
        return state;
      case SECTIONS_DELETE_SUCCESS:
      newState = {...state};
      console.log("new State: ", newState);
      for(let i=0; i<newState.content.length; i++){
        if(newState.content[i].id === action.data.id){
          newState.content.splice(i, 1);
        }
      }
      console.log("new State: ", newState);
      return newState;
      case SECTIONS_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case SECTIONS_UPDATE_SUCCESS:
        console.log(SECTIONS_UPDATE_SUCCESS);
        newState = [...state];
        for(let i=0; i<newState.length; i++){
          if(newState[i].id === action.data.id){
            newState[i] = action.data;
          }
        }
        return newState;
      case SECTIONS_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default sections_reducer;
  