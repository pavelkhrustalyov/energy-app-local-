import React from 'react';

import './PostList.scss';

import PostItem from './postItem/PostItem';

const PostList = ({ postsData }) => {
    const { posts, loading } = postsData;
    if (loading) {
        return 'Loading...'
    }

    if (posts && posts.length < 1) {
        return 'Постов еще нет'
    }
    
    return (
        <div className="posts">
            {
                posts && posts.length > 0 && posts.map((post) => <PostItem key={post._id} post={post}/>)
            }
        </div>
    )

}


export default PostList;