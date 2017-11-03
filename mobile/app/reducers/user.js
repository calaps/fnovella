import initialState from '../store/initialState';
import {USER_GET_SUCCESS, USER_GET_FAIL} from './../constants/actionTypes';

const users_reducer = (state = initialState.users, action) => {
    let newState;
    switch (action.type) {
        case USER_GET_SUCCESS:
            console.log(USER_GET_SUCCESS);
            return action.data;
        case USER_GET_FAIL:
            // TODO: some alert may be
            return state;
        default:
            return state;
    }   
}   

export default users_reducer;