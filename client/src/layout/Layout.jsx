import React, { Fragment } from 'react';

import './Layout.scss';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { logOut } from '../redux/auth/auth-actions';

const Layout = ({ children, logOut, user, isAuth }) => {

    return (
        <Fragment>
            <nav className="navigation">
                <ul className="navigation__list">
                    {
                        user && user !== null && isAuth &&
                        <>
                             <li className="navigation__item">
                                <Link to="/" className="navigation__link">Главная</Link>
                            </li>

                            {
                                user && user !== null && (user.role === 'moderator' || user.role === 'admin') 
                                && (
                                    <li className="navigation__item">
                                        <Link to="/create-post" className="navigation__link">Добавить новый пост</Link>
                                    </li>
                                )
                            }

                            <li className="navigation__item navigation__item--special">
                                <img className="navigation__img" src={`/images/avatars/${user.avatar}`} alt={user.name} />
                                <Link className='navigation__link' to={`/profile/${user._id}`}>{ user.name } { user.lastname }
                                </Link>
                            </li>


                            <li className="navigation__item user_role">
                                { user.role === "admin" &&  '(Вы администатор)' }
                                { user.role === "moderator" && '(Вы модератор)' }
                            </li>

                            <li onClick={logOut} className="navigation__item logout">
                                Выйти
                            </li>
                        </>
                    }

                    {
                        !isAuth &&  (
                            <li className="navigation__item nav__auth">
                                <div className="nav__auth-item">
                                    <Link to="/login" className="nav__auth-link">Войти</Link>
                                </div>
                                <div className="nav__auth-item">
                                    <Link to="/register" className="nav__auth-link">Регистрация</Link>
                                </div>
                            </li>
                        )
                    }
               
                </ul>
        </nav>

        <div className="container">
            { children }
        </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logOut })(Layout);