import { AUTH_FAIL, AUTH_SUCCESS, USER_LOADED, REGISTER_SUCCESS, ISAUTH, SET_USER } from './auth-types';

import axios from 'axios';
import { setAlert } from '../alert/alert-action';
import { showAlertFromErr } from '../utils';

export const register = (formData, navigate) => async dispatch => {

    const {
        password, 
        confirmPassword, 
        birthday } = formData;

        if (password !== confirmPassword) {
            dispatch(setAlert('Пароли не совпадают', 'error'));
            return false;
        } else {
            try {
                const updatedData = { ...formData, birthday: Date.parse(birthday) }
                await axios.post('/energy/auth/register', updatedData);

                dispatch({
                    type: REGISTER_SUCCESS
                })

                dispatch(setAlert('Вы успешно зарегистрировались!', 'success'));
                navigate('/login');
            } catch(err) {
                showAlertFromErr(err, dispatch, setAlert);
            }
        }
}

export const setUser = (user) => dispatch => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: SET_USER, payload: user });
}


export const setAuth = (bool) => dispatch => {
    dispatch({ type: ISAUTH, payload: bool });
}

export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token) return;

    axios.defaults.headers.common['x-auth-token'] = token;

    if (user) {
        dispatch({
            type: USER_LOADED,
            payload: JSON.parse(user)
        })
        dispatch(setAuth(true));

    } else {
        try {
            const res = await axios.get('/energy/staff/me');
    
            dispatch({
                type: USER_LOADED,
                payload: res.data.user
            })

            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            dispatch(setAuth(true));

        } catch (err) {
            showAlertFromErr(err, dispatch, setAlert);
            dispatch({ type: AUTH_FAIL })
        }
    }

}

export const logIn = (formData, navigate) => async dispatch => {
    try {
        const res = await axios.post('/energy/auth/login', formData);
        const token = res.data.token;

        dispatch({
            type: AUTH_SUCCESS,
            payload: token
        })

        localStorage.setItem('token', token);

        dispatch(loadUser());

        dispatch(setAlert('Вы успешно вошли!', 'success'));

        navigate('/');

    } catch (err) {
        dispatch({
            type: AUTH_FAIL
        })
        showAlertFromErr(err, dispatch, setAlert);
    }
}

export const logOut = () => dispatch => {

    delete axios.defaults.headers.common['x-auth-token'];

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({ type: AUTH_FAIL })
}