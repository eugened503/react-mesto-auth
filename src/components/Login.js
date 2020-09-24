import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  function handleSubmit(e) {
    e.preventDefault();
     props.onLogin(email, password);
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
        <Link to="/sign-up" className="signup__link" onClick={props.closeRegistration}>Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;