import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
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
        <Link className="signup__link" to="/sign-in" onClick={props.hideEntrance}>Войти</Link>
      </div>
    </div>
  );

}

export default Register;