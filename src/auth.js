export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      'email': email,
      'password': password
    })
  })
    .then((res) => {
      if (res.status !== 400) {
        return res.json();
      }
      throw new Error('Некорректно заполнено одно из полей');
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {

  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ email, password }),

  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json()
        }
        if (res.status === 400) {
          return console.log('Одно из полей не передано')
        }
        if (res.status === 401) {
          return console.log('Пользователь с таким email не  найден')
        }
      }
      catch (error) {
        return error
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem('jwt', data.token);
        return data.token;
      }
    })
    .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => {
      if (!res.ok) {
        return res.json()
          .then((err) => {
            console.log(err.message);
          });
      }
      return res.json();
    })
    .then(data => data)
}