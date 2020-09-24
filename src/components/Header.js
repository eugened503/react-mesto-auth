import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

  const { pathname } = useLocation();
  const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
    <header className="header">
      <img src={logo} alt="логотип Место-Россия" className="header__logo" />
      <div className="header__register-button-container">
        {props.loggedIn
          ? (
          <>
            <h2 id="mail" className='header__element header__element-right header__block'>{props.userData.email}</h2>
            <Link to="#" onClick={props.onSignOut} className='header__block header__element header__element-top'>Выйти</Link>
          </>
          )
          : (
            <Link to={linkPath} className="header__block header__element">{linkText}</Link>)
        }
      </div>
    </header>
  )
}

export default Header;




