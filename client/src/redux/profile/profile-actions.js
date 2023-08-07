import { EDIT_PROFILE, GET_PROFILE, SET_PROFILE, DELETTE_PROFILE } from './profile-types';
import axios from 'axios';

import { setAlert } from '../alert/alert-action';
import { setUser } from '../auth/auth-actions';
import { showAlertFromErr } from '../utils';

export const editProfile = (formData, id, isMe) => async dispatch => {
    try {
        const res = await axios.patch(`/energy/staff/update/${id}`, formData);
        dispatch({ type: EDIT_PROFILE, payload: res.data.user })
        if (isMe) {
            dispatch(setUser(res.data.user))
        }
        dispatch(setAlert('Профиль успешно обновлен!', 'success'));
    } catch (err) {
        console.log(err);
        showAlertFromErr(err, dispatch, setAlert)
    }
}

export const deleteProfile = (id, navigate) => async dispatch => {
    try {
        const res = await axios.delete(`/energy/staff/${id}`);
        dispatch({ type: DELETTE_PROFILE })
        dispatch(setAlert(res.data.msg, 'success'));
        navigate('/');
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}


export const getProfile = (id) => async dispatch => {
    try {
        const res = await axios.get(`/energy/staff/${id}`);
        dispatch({ type: GET_PROFILE, payload: res.data.user })
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}

export const setProfile = (user) => async dispatch => {
    try {
        dispatch({ type: SET_PROFILE, payload: user })
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert);
    }
}


export const updateAvatar = (formData, userId) => async dispatch => {
    try {
        const res = await axios.patch(`/energy/staff/avatar/${userId}`, formData);

        const user = JSON.parse(localStorage.getItem('user'));

        dispatch(setUser({ ...user, avatar: res.data.avatar }));

        dispatch(setAlert('Фото успешно установлено!', 'success'));
    } catch (err) {
        showAlertFromErr(err, dispatch, setAlert)
    }
}