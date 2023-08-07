import axios from 'axios';
import { CREATE_WALLPOST, GET_WALLPOST } from './wallpost-types';

import { setAlert } from '../alert/alert-action';
import { showAlertFromErr } from '../utils';


export const getWallPosts = (recipientId) => async (dispatch) => {

    try {
        const res = await axios.get(`/energy/wallPosts/${recipientId}`);

        dispatch({
            type: GET_WALLPOST,
            payload: res.data
        })

    } catch (error) {
        showAlertFromErr(error, dispatch, setAlert)
    }
}


export const createWallpost = (authorId, recipientId, text) => async (dispatch) => {

    try {
        const res = await axios.post(`/energy/wallPosts/${authorId}/${recipientId}`, { text });
        dispatch({
            type: CREATE_WALLPOST,
            payload: res.data
        })
    
    } catch (error) {
        showAlertFromErr(error, dispatch, setAlert)
    }
}

