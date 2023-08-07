import { SET_ALERT, REMOVE_ALERT } from './alert-types';

import { v4 as uuidv4 } from 'uuid'

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { id, msg, alertType }
    })
    
    setTimeout(() => {
        removeAlert(id)(dispatch)
    }, 3000);
}

export const removeAlert = (id) => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id
    })
}