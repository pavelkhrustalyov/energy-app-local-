import { CREATE_POST, GET_POSTS, CHECK_POST, DELETE_POST, CREATE_COMMENT, DELETE_COMMENT } from './post-types';

const initialState = {
    posts: [],
    loading: true
};

export default function(state = initialState, { type, payload }) {
    switch(type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case CHECK_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, check: payload.check } : post),
                loading: false
            }
        case CREATE_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, comments: [...post.comments, payload.comment] } : post),
                loading: false
            }
        case DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, comments: post.comments.filter(c => c._id !== payload.comId)} : post),
                loading: false
            }
        default:
            return state;
    }

}
