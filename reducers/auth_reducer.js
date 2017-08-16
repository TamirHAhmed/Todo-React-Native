import { 
    SET_TOKEN,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    error: '',
    isLoading: false
};

export default function(state =INITIAL_STATE, action) {

    switch(action.type) {
        case SET_TOKEN:
             return { ...state, token: action.payload };
        case LOGIN_USER:
            return { ...state, isLoading: true, error: '' };
        case LOGIN_SUCCESS:
            return { ...state, token: action.payload, isLoading: false, error: '' };
        case LOGIN_FAIL:
            return { ...state, token: null, error: 'Authentication Failed', isLoading: false  };
        case LOGOUT:
            return { ...state, token: null };
        default:
            return state;
    }
}