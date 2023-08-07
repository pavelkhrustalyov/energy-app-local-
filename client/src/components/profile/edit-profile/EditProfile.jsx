import React, { useEffect, useState } from 'react';

import './Edit-profile.scss';

import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../../CustomButton/CustomButton';

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { editProfile, getProfile, setProfile } from '../../../redux/profile/profile-actions';

import { formatDate } from '../../../helpers';

const EditProfile = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const profile = useSelector(state => state.users.profile);
    const { user, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (user._id !== id) {
            dispatch(getProfile(id));
        } else {
            dispatch(setProfile(user))
        }
    }, [id, dispatch, user])


    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        patronymic: '',
        birthday: new Date(),
        phone: ''
    });

    const { name, lastname, patronymic, birthday, phone } = formData;

    useEffect(() => {
    console.log(phone)

        setFormData({
            name: profile && profile !== null ? profile.name : '',
            lastname: profile && profile !== null ? profile.lastname : '',
            patronymic: profile && profile !== null ? profile.patronymic : '',
            birthday: profile && profile.birthday ? formatDate(profile.birthday) : '',
            phone: profile && profile.phone ? profile.phone : ''
        });
    }, [profile]);

    const updateProfile = (e) => {
        e.preventDefault();
        dispatch(editProfile(formData, id, user._id === id));
    }

    const onChangeField = (e) => {
        const { name, value } = e.target;
        
        setFormData({ ...formData, [name]: value });
    }

    if (loading) {
        return 'Loading...';
    }

   return (
    <>
        <h1>Редактировать профиль</h1>
        <form onSubmit={(e) => updateProfile(e)} className="form">
            <CustomInput onChange={(e) => onChangeField(e)} mb={10} type="text" name="name" placeholder="Введите имя" value={name}/>
            <CustomInput onChange={(e) => onChangeField(e)} mb={10} type="text" name="lastname" placeholder="Введите фамилию" value={lastname}/>
            <CustomInput onChange={(e) => onChangeField(e)} mb={10} type="text" name="patronymic" placeholder="Введите отчество" value={patronymic}/>
            <CustomInput onChange={(e) => onChangeField(e)} mb={10} type="text" name="phone" placeholder="Введите телефон" value={phone}/>
            <CustomInput onChange={(e) => onChangeField(e)} mb={10} type="date" name="birthday" value={birthday} />
            <CustomButton type="submit">Редактировать</CustomButton>
        </form>
    </>
    )
}


export default EditProfile;