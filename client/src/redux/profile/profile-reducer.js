import { EDIT_PROFILE, UPDATE_AVATAR, GET_PROFILE, SET_PROFILE, DELETTE_PROFILE } from './profile-types';

const initialState = {
    profile: null,
    loading: true
}

export default function userReducer(state = initialState, { type, payload }) {
    switch(type) {
        case EDIT_PROFILE:
            return {
                ...state,
                profile: payload
            }
        case UPDATE_AVATAR:
        case DELETTE_PROFILE:
            return { ...state }
        case GET_PROFILE:
        case SET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        default:
            return state;
    }
}
