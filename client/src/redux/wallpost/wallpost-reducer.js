import { CREATE_WALLPOST, GET_WALLPOST } from './wallpost-types';

const initialState = {
    wallPosts: [],
    loading: true
}

export default function(state = initialState, { type, payload }) {
    switch(type) {
        case GET_WALLPOST:
            return {
                ...state,
                loading: false,
                wallPosts: payload
            }
        case CREATE_WALLPOST:
            return {
                ...state,
                loading: false,
                wallPosts: [payload, ...state.wallPosts]
            }

        default:
            return state;
    }
}
