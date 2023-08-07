import React, { useEffect } from 'react';

import PostList from '../components/post/PostList';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/post/post-actions';

const Dashboard = () => {
    const postsData = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <div className="dashboard">
            <h1>Доска заданий и новостей</h1>
            <PostList postsData={postsData}/>
        </div>
    )
}


export default Dashboard;