import { CREATE_POST, DELETE_POST, GET_POSTS, CHECK_POST, CREATE_COMMENT, DELETE_COMMENT } from './post-types';
import axios from 'axios';

import { setAlert } from '../alert/alert-action';
import { showAlertFromErr } from '../utils';


export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get('/energy/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}

export const createPost = (formData) => async dispatch => {
    try {
        const res = await axios.post('/energy/posts/create', formData);
        dispatch({ type: CREATE_POST, payload: res.data.post })
        dispatch(setAlert('Пост успешно создан!', 'success'));
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}


export const deletePost = (postId) => async dispatch => {
    try {
        const res = await axios.delete(`/energy/posts/delete/${postId}`);
        dispatch({ type: DELETE_POST, payload: postId })
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}

export const checkedPost = (postId, userId) => async dispatch => {
    try {
        const res = await axios.post(`/energy/posts/checkUncheck/${postId}`);
        dispatch({ type: CHECK_POST,  payload: { postId, check: res.data.check }})
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}


export const commentCreate = (data) => async dispatch => {
    const { postId, text } = data;
    try {
        const res = await axios.post(`/energy/comments/create/${postId}`, { text });
        
        dispatch({ type: CREATE_COMMENT, payload: { postId, comment: res.data.comment }})
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
    
}

export const deleteComment = (data) => async dispatch => {
    const { postId, comId } = data;
    try {
        const res = await axios.delete(`/energy/comments/delete/${postId}/${comId}`);
        
        dispatch({ type: DELETE_COMMENT, payload: { postId, comId }})
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
    
}