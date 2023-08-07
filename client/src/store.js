import rootReducer from './redux/rootReducer';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const middleware = getDefaultMiddleware({
  thunk: true,
  devTools: true
});

export default configureStore({
 reducer: rootReducer,
 middleware
});