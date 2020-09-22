import * as auth from '../auth.js';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return console.log('Введите данные');
    }
    auth.authorize(email, password)
      .then((data) => {
        if (!data) {
          return console.log('Что-то пошло не так');
        }
        if (data.token) {
          setEmail('')
          setPassword('')
          props.handleLogin(); // обновляем стейт внутри App.js
          history.push('/'); // переадресуем пользователя
          return;
        }
      })
      .catch(err => console.log(err)); // запускается, если пользователь не найден 
  }

  return (
    <div className="login">
      <p className="login__welcome">
        Вход
        </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__field login__field_color" id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email" />
        <input className="login__field login__field_margin login__field_color" id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Пароль" />
        <div className="login__button-container">
          <button to="/" type="submit" className="login__button" onClick={props.showLoginEmail}>Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p className="signup__link">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="signup__link" onClick={props.closeRegistration}>Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;