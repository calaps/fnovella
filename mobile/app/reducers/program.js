import {AsyncStorage} from 'react-native';
import initialState from '../store/initialState';
import {
    PROGRAM_GET_SUCCESS,
    PROGRAM_GET_FAIL
} from './../constants/actionTypes';

const program_reducer = (state = initialState.programs, action) => {
    switch (action.type) {
        case PROGRAM_GET_SUCCESS:
            console.log(PROGRAM_GET_SUCCESS);
            return {
                ...state,
                ...action.data
            }
        case PROGRAM_GET_FAIL:
            // TODO: some alert may be
            return state;
        default:
            return state;

    }
}

export default program_reducer;