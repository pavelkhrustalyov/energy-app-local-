import React, { useState } from "react";
import './PostItem.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, checkedPost } from '../../../redux/post/post-actions';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers';

import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../../CustomButton/CustomButton';

import { commentCreate } from '../../../redux/post/post-actions';

import CommentList from "../../comment/CommentList";

const PostItem = ({ post }) => {
    const { _id, image, text, date, check, comments } = post;
    const { avatar, name, lastname, position } = post.userId;

    const [ commentText, setCommentText ] = useState('');

    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const createComment = (e) => {
        e.preventDefault();

        dispatch(commentCreate({ postId: _id, text: commentText }));
        setCommentText('');
    }

    const changeField = (e) => {
        setCommentText(e.target.value);
    }

    return (
        <div className="post">

            {
                (user && user !== null && (user.role === 'admin' || user.role === 'moderator'))
                && <span onClick={() => dispatch(deletePost(_id))} className="post__delete-btn">X</span>
            }

            <div className="post__user user">
                <img className="user__avatar" src={`/images/avatars/${avatar}`} alt="avatar"/>
                <div className="user__info">
                    <Link to={ `/profile/${post.userId._id}`} className="user__fullname">{name} {lastname}</Link>
                    <div className="user__position">{position}</div>
                </div>
            </div>
           
            <div className="post__info">
                {
                    image !== 'post-image.jpg' && (
                        <picture>
                            <img src={`/images/posts/${image}`} alt="Нет картинки"/>
                        </picture>
                    )
                }
                <div className="post__desc">{text}</div>
                
                <div className="post__utils">
                    <div 
                        className="post__agree">
                    </div>

                    <CustomButton onClick={() => dispatch(checkedPost(_id, user._id))}>
                        Ознакомлен ({ check.length })
                    </CustomButton>

                    <div className="post__date">Дата публикации: <span>{formatDate(date, true)}</span></div>
                </div>
            </div>

            <h3> Комментарии: { comments.length } </h3>

            <form onSubmit={(e) => createComment(e)} className="comment-form">
                <CustomInput onChange={(e) => changeField(e)} type="text" name="text" value={commentText} />
                <CustomButton>Добавить</CustomButton>
            </form>

            {
                comments.length > 0
                ? <CommentList comments={comments} postId={_id} />
                : <h3>Комментариев пока нет</h3>
            }

        </div>
    )
}

export default PostItem;