import React, { Fragment, useState, useEffect } from 'react';

import './Login.scss';

import { logIn } from '../../redux/auth/auth-actions';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';

const Login = ({ logIn, isAuthenticated }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const { login, password } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        logIn(formData, history);
    }

    const onInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (isAuthenticated) {
            return history.push('/');
        }
    }, [isAuthenticated, history])

    return (
        <Fragment>
            <h1>Вход на сайт</h1>
            <form onSubmit={(e) => onSubmit(e)} className="login-form">
                <CustomInput  onChange={(e) => onInput(e)} value={login} type="text" name="login" placeholder="Введите логин"/>
                <CustomInput  onChange={(e) => onInput(e)} value={password} type="password" name="password" placeholder="Введите пароль"/>
                <CustomButton>Войти</CustomButton>
            </form>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logIn })(Login);
