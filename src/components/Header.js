import React from 'react';
import logo from '../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {

  const history = useHistory();

  function signOut() {
    props.hideOutputMail();
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  return (
    <header className="header">
      <img src={logo} alt="логотип Место-Россия" className="header__logo" />
      <div className="header__register-button-container">
        <h2 id="mail" className={`header__none ${props.isShowEmail && 'header__element header__element-right header__block'}`}>{props.userData.email}</h2>
        <Link to="/signup" className={`header__element ${props.isRegister && 'header__none'}`} onClick={props.closeRegistration}>Регистрация</Link>
        <Link to="/signin" className={`header__none ${props.isEnterSite && 'header__block header__element'}`} onClick={props.hideEntrance}>Войти</Link>
        <Link to="#"onClick={signOut} className={`header__none ${props.isLeaveSite && 'header__block header__element header__element-top'}`}>Выйти</Link>
      </div>
    </header>
  )
}

export default Header;




