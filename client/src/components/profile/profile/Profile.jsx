import React, { useState } from "react";

import './Profile.scss';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import WallPost from "../../WallPost/WallPost";

import { formatDate } from '../../../helpers';

import { deleteProfile, updateAvatar } from '../../../redux/profile/profile-actions';

const Profile = ({ user, isMine, my, id }) => {

    const [ file, setFile ] = useState([]);
    const [ btn, setBtn ] = useState(false);

    const history = useHistory(); 
    const dispatch = useDispatch();

    const changeFile = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
        setBtn(true);
    }

    const uploadAvatar = async () => {
        if (!file) {
            return;
        }

        const formData = new FormData();

        formData.append('avatar', file);

        dispatch(updateAvatar(formData, user && user._id));
        setBtn(false);
    }

    const currentBtn =  btn 
    ? <CustomButton onClick={uploadAvatar}>Установить аватар</CustomButton> 
    : <CustomInput
        onChange={(e) => changeFile(e)}
        type="file"
        file="true"
        name="avatar"
        text="Выбрать фото"
    />

    const removeProfile = (id, history) => {
        if (window.confirm('Вы уверены?')) {
            dispatch(deleteProfile(id, history))
        }
    }

    return user && user !== null && (
        <div className="profile">
            <div className="profile__left">

                <div className="avatar">
                    <img src={`/images/avatars/${user.avatar}?${Math.random()}`} alt={user.name}/>
                </div>
                { isMine && currentBtn }
            </div>

            <div className="profile__right">
                <h1 className="profile__fullname">{user.lastname} {user.name} {user.patronymic}</h1>

                <div className="profile__info info">

                    <div className="info__birthday info_helper">
                        <span>Дата рождения:</span>
                        <span>{formatDate(user.birthday, true)}</span>
                    </div>

                    <div className="info__position info_helper">
                        <span>Должность:</span>
                        <span>{user.position}</span>
                    </div>

                    <div className="info__department info_helper">
                        <span>Вид работы:</span>
                        <span>{user.department}</span>
                    </div>
                    <div className="info__department info_helper">
                        <span>Телефон</span>
                        <span>{user.phone}</span>
                    </div>
                </div>


                <div className="controls">
                    {
                        (isMine || my.role === 'admin') && <CustomButton onClick={() => history.push(`/edit/${user._id}`)}>Редактировать</CustomButton>
                    }

                    {
                        (my.role === 'admin' && !isMine ) && <CustomButton danger onClick={() => removeProfile(user._id, history)}>Удалить</CustomButton>
                    }
                </div>

                    <WallPost profileId={id} />
            </div>
        </div>
    )
}


export default Profile;
