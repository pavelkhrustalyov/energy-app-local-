import { AUTH_FAIL, AUTH_SUCCESS, USER_LOADED, REGISTER_SUCCESS, ISAUTH, SET_USER } from './auth-types';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
    token: token || null,
    isAuthenticated: false,
    loading: true,
    user: user || null
}

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case ISAUTH:
            return {
                ...state,
                isAuthenticated: payload
            }
        case USER_LOADED:
        case SET_USER:
            return {
                ...state,
                loading: false,
                user: payload
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                ...payload,
                token: payload,
                loading: false,
            }
        case AUTH_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case REGISTER_SUCCESS:
        default:
            return state;
    }
}