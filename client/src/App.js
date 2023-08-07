import React, { Fragment } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Layout from './layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/alert/Alert';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import CreatePost from './components/post/createPost/CreatePost';

import ProfileEdit from './pages/ProfileEdit';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Fragment>
        <Layout>
          <Alert />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/profile/:id" component={ProfilePage} />
            <PrivateRoute path="/edit/:id" component={ProfileEdit} />
            <PrivateRoute path="/create-post" component={CreatePost} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Layout>
      </Fragment>
    </Router>
  );
}

export default App;
