
/* Actions */
import {
    ASSISTANCE_ADD_REQUEST,
    ASSISTANCE_ADD_SUCCESS,
    ASSISTANCE_ADD_FAIL,
    ASSISTANCE_DELETE_FAIL,
    ASSISTANCE_DELETE_REQUEST,
    ASSISTANCE_DELETE_SUCCESS,
    ASSISTANCE_GET_FAIL,
    ASSISTANCE_GET_REQUEST,
    ASSISTANCE_GET_SUCCESS,
    ASSISTANCE_UPDATE_FAIL,
    ASSISTANCE_UPDATE_REQUEST,
    ASSISTANCE_UPDATE_SUCCESS
  } from './../constants/ActionTypes';
  
  import initialState from './../stores/initialState';
  
  const assistance_reducer = (state = initialState.assistance, action) => {
    let newState;
    switch(action.type){
      case ASSISTANCE_ADD_SUCCESS:
        console.log(ASSISTANCE_ADD_SUCCESS);
        return {...state, ...action.data};
      case ASSISTANCE_ADD_FAIL:
        // TODO: some alert may be
        return state;
      case ASSISTANCE_GET_SUCCESS:
        console.log(ASSISTANCE_GET_SUCCESS);
        return {
          ...state,
          ...action.data
        };
      case ASSISTANCE_GET_FAIL:
        // TODO: some alert may be
        return state;
      case ASSISTANCE_DELETE_SUCCESS:
        console.log(ASSISTANCE_DELETE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content.splice(i, 1);
          }
        }
        return newState;
      case ASSISTANCE_DELETE_FAIL:
        // TODO: some alert may be
        return state;
      case ASSISTANCE_UPDATE_SUCCESS:
        console.log(ASSISTANCE_UPDATE_SUCCESS);
        newState = {...state};
        for(let i=0; i<newState.content.length; i++){
          if(newState.content[i].id === action.data.id){
            newState.content[i] = action.data;
          }
        }
        return newState;
      case ASSISTANCE_UPDATE_FAIL:
        // TODO: some alert may be
        return state;
      default:
        return state;
    }
  };
  
  export default assistance_reducer;
  