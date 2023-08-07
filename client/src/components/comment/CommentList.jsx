import React from 'react';

import './CommentList.scss';

import CommentItem from './CommentItem/CommentItem';

const CommentList = ({ comments, postId }) => {

    return  (  
        <div className="post__comments">
            {
                comments && comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={postId} />)
            }
        </div>
    )
}

export default CommentList;