import React from 'react';

import './CommentItem.scss';

import { formatDate } from '../../../helpers';

import { useDispatch, useSelector } from 'react-redux';

import { deleteComment } from '../../../redux/post/post-actions';

import { Link } from 'react-router-dom';

const CommentItem = ({ comment, postId }) => {
    const { _id, userId, text, date } = comment;

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    return  (  
            <div className="post__comment comment">

            {
            (user && user !== null && (user.role === 'admin' || user.role === 'moderator' || user._id === userId._id))
                && <span onClick={() => dispatch(deleteComment({ postId, comId: _id }))} className="comment__delete-btn">X</span>
            }
            
            <div className="comment__user">
                <div className="comment__user-info">
                    <img className="comment__avatar" src={`/images/avatars/${userId.avatar || 'avatar.jpg'}`} alt={userId.name}/>
                    <Link to={`/profile/${userId._id}`} className="comment__fullname">{userId.name} {userId.lastname}
                        <div className="comment__position user__position">{userId.position}</div>
                    </Link>
                </div>
            </div>

            <div className="comment__utils">
                <div className="comment__date post__date">Дата публикации: <span>{formatDate(date, true)}</span></div>
                <div className="text">{text}</div>
            </div>
        </div>
    )
}

export default CommentItem;