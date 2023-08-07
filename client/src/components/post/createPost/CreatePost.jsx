import React, { useState } from "react";
import './CreatePost.scss';

import CustomButton from '../../CustomButton/CustomButton';
import CustomTextArea from '../../CustomTextArea/CustomTextArea';
import CustomInput from '../../CustomInput/CustomInput';

import { createPost } from '../../../redux/post/post-actions';
import { useDispatch } from 'react-redux';

const CreatePost = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        text: ''
    });

    const [ file, setFile ] = useState([]);


    const postCreate = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('text', formData.text);
        fd.append('postImage', file);
        
        dispatch(createPost(fd));
        setFormData({ text: '' });
        setFile([])
    }

    const onChangeFields = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeFile = (e) => {
       
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <form onSubmit={(e) => postCreate(e)} className="post-form">
            <h1>Новый пост</h1>
            <CustomTextArea onChange={(e) => onChangeFields(e)} value={formData.text} name="text" placeholder="Введите текст поста"></CustomTextArea>
            <div className="btn__wrapper">
                <CustomInput onChange={(e) => onChangeFile(e)} type="file" name="postImage" text="Добавьте фото"/>
                <CustomButton>Создать пост</CustomButton>
            </div>
        </form>
    )
}

export default CreatePost;