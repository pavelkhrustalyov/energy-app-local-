import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { register } from '../../redux/auth/auth-actions';

import { useHistory } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';

import data from './data';


import './Register.scss';

const Register = ({ register, isAuthenticated }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        patronymic: '',
        login: '',
        position: 'Мастер',
        password: '',
        confirmPassword: '',
        birthday: '',
        phone: '',
        department: 'Служба СЭСДТУ',
    });


    const {
        name, 
        lastname, 
        patronymic, 
        login, 
        position, 
        password,
        confirmPassword,
        phone,
        birthday, 
        department } = formData;


    const onSubmit = (e) => {
        e.preventDefault();
        register(formData, history);
    }

    const onInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (isAuthenticated) {
            return history.push('/');
        }
    }, [isAuthenticated, history])


    const item = data.find((item) => item.service === department);
    
    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)} className="register-form">
                <h2 className="registration-heading">Регистрация</h2>

                <div className="form_data">
                    <div className="part_one">

                        <CustomInput label="Ваше имя:" onChange={e => onInput(e)} id="name" value={name} type="text" name="name" placeholder="Введите имя" />
                        <CustomInput label="Ваша фамилия:" onChange={e => onInput(e)} id="lastname" value={lastname} type="text" name="lastname" placeholder="Введите фамилию" />
                        <CustomInput label="Ваше отчество:" onChange={e => onInput(e)} id="patronymic" value={patronymic} type="text" name="patronymic" placeholder="Введите отчество" />
                        <CustomInput label="Ваш логин:" onChange={e => onInput(e)} id="login" value={login} type="text" name="login" placeholder="Ваш логин" />
                        <CustomInput label="Ваш телефон:" onChange={e => onInput(e)} id="phone" value={phone} type="text" name="phone" placeholder="Ваш телефон" />

                        <label htmlFor="position" className='input__field'>
                            <p>Ваша должность:</p>
                            <select onChange={e => onInput(e)} value={position} className="select-form" name="position" id="position">
                                {
                                    item.professions.map((prof, index) => {
                                        return <option key={index} value={prof}>{prof}</option>
                                    })
                                }
                            </select>
                        </label>

                    </div>

                    <div className="part_two">

                        <CustomInput label="Ваш пароль:" onChange={e => onInput(e)} id="password" value={password} type="password" name="password" placeholder="Введите пароль" />

                        <CustomInput label="Повторите пароль:" onChange={e => onInput(e)} id="confirmPassword" value={confirmPassword} type="password" name="confirmPassword" placeholder="Повторите пароль" />

                        <CustomInput label="Дата рождения:" onChange={e => onInput(e)} id="birthday" value={birthday} type="date" name="birthday" placeholder="Дата рождения" />


                        <label htmlFor="department" className='input__field'>
                            <p>Ваша служба:</p>
                            <select value={department} onChange={e => onInput(e)} className="select-form" name="department" id="department">
                                {
                                    data.map((item, index) => {
                                        return <option key={index} value={item.service}>{item.service}</option>
                                    })
                                }
                            </select>
                        </label>

                    </div>
                </div>


                <CustomButton>Регистрация</CustomButton>

            </form>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { register })(Register);
