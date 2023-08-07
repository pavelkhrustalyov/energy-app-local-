import { combineReducers } from 'redux';
import alertReducer from './alert/alert-reducer';
import authReducer from './auth/auth-reducer';
import postReducer from './post/post-reducer';
import profileReducer from './profile/profile-reducer';
import wallpostReducer from './wallpost/wallpost-reducer';

export default combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    posts: postReducer,
    users: profileReducer,
    wallPosts: wallpostReducer
});