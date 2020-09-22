import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import * as auth from '../auth.js';

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
 

  //console.log(props.registerStatus);
  //props.closeRegistration();

  const handleSubmit = (e) => {
    e.preventDefault();
 
    auth.register(email, password).then((res) => {
      if (res) {
        props.onInfoTooltipManage(); //поп-ап успешной регистрации
        history.push('/signin');
      } else {
        props.onInfoTooltipMistake(); //поп-ап неуспешной регистрации
        history.push('/signin');
        console.log('Произошла ошибка.');

      }
    })
  }

  return (
    <div className="login">
      <p className="login__welcome">
        Регистрация
        </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__field login__field_color" id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email" />
        <input className="login__field login__field_margin login__field_color" id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Пароль" />
        <div className="login__button-container">
          <button type="submit" onSubmit={handleSubmit} className="login__button">Зарегистрироваться</button>
        </div>
      </form>
      <div className="login__signup">
        <p className="signup__link">Уже зарегистрированы?</p>
        <Link className="signup__link" to="/signin" onClick={props.hideEntrance}>Войти</Link>
      </div>
    </div>
  );

}

export default Register;