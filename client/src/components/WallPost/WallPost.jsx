import React, { useEffect, useState } from 'react';
import './WallPost.scss';

import  CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';

import { getWallPosts, createWallpost } from '../../redux/wallpost/wallpost-actions';

import { useDispatch, useSelector } from 'react-redux';

import WallPostItem from './WallPostItem/WallPostItem';
import { setAlert } from '../../redux/alert/alert-action';

const WallPost = ({ profileId }) => {
    const [ text, setText ] = useState('');

    const dispatch = useDispatch();
    const wallPosts = useSelector(state => state.wallPosts.wallPosts)
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(getWallPosts(profileId));
    }, [dispatch, profileId])

    const onSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            console.log('aaaaaaa');
            dispatch(setAlert('Текст поста не может быть пустым!', 'error'));
            return;
        }
        dispatch(createWallpost(user._id, profileId, text));
        setText('');
    }

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    return (
        <div className='post-data'>

            <h3>Напишите что - нибудь ...</h3>
            <form className="form-post" onSubmit={onSubmit}>
                <CustomInput onChange={onChangeText} value={text} type="text" placeholder="Введите текст"/>
                <CustomButton>Отправить</CustomButton>
            </form>

            <div className="wall-posts">
                {
                    wallPosts && wallPosts.length > 0 ?
                    wallPosts.map(wallPost => <WallPostItem key={wallPost._id} wallPost={wallPost} />)
                    : <p className='wall-posts__empty'>Постов еще нет</p>
                }
            </div>


        </div>
    )
}

export default WallPost;