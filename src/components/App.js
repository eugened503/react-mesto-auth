import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltipManage from './InfoTooltipManage.js';
import InfoTooltipMistake from './InfoTooltipMistake.js';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import * as auth from '../auth.js';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [currentUser, setСurrentUser] = React.useState({}); //получение информации об авторе
  const [cards, setCards] = React.useState([]); //стейт с массивом карточек
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); // Хук, управляющий внутренним состоянием поп-апа "Данные пользователя"
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); // Хук, управляющий внутренним состоянием поп-апа "Добавление карточки"
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); // Хук, управляющий внутренним состоянием поп-апа "Изменение аватара"
  const [selectedCard, setSelectedCard] = React.useState(false); //Хук для определения наличия CSS-класса видимости
  const [showImage, setShowImage] = React.useState({}); //Хук для захвата данных при клике на карточку
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [isInfoTooltipMistake, setInfoTooltipMistake] = React.useState(false);
  const [loggedIn, SetloggedIn] = React.useState(false);
  const [userData, SetUserData] = React.useState({});
  const history = useHistory();
  const [isRegister, setRegister] = React.useState(false); //определение видимости поля "регистрация"
  const [isEnterSite, setEnterSite] = React.useState(false); //определение видимости поля "войти"
  const [isShowEmail, setShowEmail] = React.useState(false); //определение видимости поля "email" 
  const [isLeaveSite, setLeaveSite] = React.useState(false); //определение видимости поля "выйти" 

  React.useEffect(() => {
    api.getUserInfoServer('/users/me') //получаем информацию о пользователе с сервера
      .then((data) => {
        setСurrentUser(data);
      })
      .catch(err => console.log(err));

    api.getInitialCards('/cards') //получаем карточки с сервера
      .then((arr) => {
        setCards(arr); //добавляем карточки в стейт
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardClick(data) {
    setSelectedCard(true);
    setShowImage(data);
  }

  function handleEditProfileClick() { //обработчик для открытия поп-апа "Данные пользователя"
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() { //обработчик для открытия поп-апа "Добавление карточки"
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() { //обработчик для открытия поп-апа "Изменение аватара"
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {  //обработчик для закрытия поп-апов
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setInfoTooltip(false);
    setInfoTooltipMistake(false);
  }

  function handleSetInfoTooltip() { //обработчик для открытия поп-апа после успешной регистрации
    setInfoTooltip(true);
  }

  function handleSetInfoTooltipMistake() { //обработчик для открытия поп-апа после неудачной регистрации
    setInfoTooltipMistake(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    (!isLiked ? api.putLikeCard(`/cards/likes/${card._id}`) : api.deleteLikeCard(`/cards/likes/${card._id}`))
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) { //удаление карточки с сервера
    api.deleteCard(`/cards/${card._id}`)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards); //обновление стейта
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) { // обновление информации о пользователе
    api.sendUserInfo('/users/me', data)
      .then((res) => {
        setСurrentUser(res);  //обновление стейта
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(data) { // обновление аватара пользователя
    api.changeAvatar('/users/me/avatar', data)
      .then((res) => {
        setСurrentUser(res); //обновление стейта
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(data) { // добавление новой карточки
    api.sendCard('/cards', data)
      .then((newCard) => {
        setCards([newCard, ...cards]); //добавление новой карточки в массив
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => { //закрытие поп-апов нажатием на клавишу 'Escape'
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    });
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn])
  
  function handleLogin() {
    SetloggedIn(true);
  }

  function tokenCheck() {

    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth.checkToken(jwt)
        .then((res) => {

          if (res) {
            showLoginEmail();
            SetUserData({
              _id: res.data._id,
              email: res.data.email
            })
            SetloggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function closeRegistration() { //скрываем поле регистрации, показываем поле 'войти'
    setRegister(true)
    setEnterSite(true)
  }

  function hideEntrance() { //скрываем поле 'войти', показываем поле регистрации
    setEnterSite(false)
    setRegister(false)
  }

  function showLoginEmail() { //показываем поле "email" и поле "выйти"
    setShowEmail(true)
    setRegister(true)
    setLeaveSite(true)
    setEnterSite(false)
  }

  function hideOutputMail() { //скрываем поле "email" и поле "выйти", показываем поле регистрации
    setShowEmail(false)
    setRegister(false)
    setLeaveSite(false)
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            userData={userData}
            isRegister={isRegister}
            closeRegistration={closeRegistration}
            isEnterSite={isEnterSite}
            hideEntrance={hideEntrance}
            isShowEmail={isShowEmail}
            isLeaveSite={isLeaveSite}
            hideOutputMail={hideOutputMail}
          />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/signup">
              <Register
                hideEntrance={hideEntrance}
                onInfoTooltipMistake={handleSetInfoTooltipMistake}
                onInfoTooltipManage={handleSetInfoTooltip} />
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin}
                closeRegistration={closeRegistration}
                showLoginEmail={showLoginEmail} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/signup" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <InfoTooltipManage isOpen={isInfoTooltip} onClose={closeAllPopups} />
          <InfoTooltipMistake isOpen={isInfoTooltipMistake} onClose={closeAllPopups} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <PopupWithForm name="deleting-card" title="Вы уверены?" />
          <ImagePopup card={showImage} isOpen={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </>

  );
}

export default App;
