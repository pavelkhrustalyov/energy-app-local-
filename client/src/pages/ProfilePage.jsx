import React, { useEffect } from 'react';

import Profile from '../components/profile/profile/Profile';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { getProfile, setProfile } from '../redux/profile/profile-actions';


const ProfilePage = () => {

    const profile = useSelector(state => state.users.profile);
    const { user, loading } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    
    const { id } = useParams();

    useEffect(() => {
        if (user._id !== id) {
          dispatch(getProfile(id));
        } else {
          dispatch(setProfile(user))
        }
    }, [id, dispatch, user])

    if (loading) {
        return "...Loading";
    }

    return <Profile id={id} user={profile} isMine={user._id === id} my={user} />
}

export default ProfilePage;