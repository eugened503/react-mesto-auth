import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} alt={currentUser.name} className="profile__image" alt="Портрет автора" />
        <div className="header__pencil" onClick={props.onEditAvatar} />
        <div className="profile-info">
          <div className="information">
            <h1 className="profile-info__title">{currentUser.name}</h1>
            <p className="profile-info__subtitle">{currentUser.about}</p>
          </div>
          <button type="button" className="profile-info__button" aria-label="редактировать профиль" onClick={props.onEditProfile} />
        </div>
        <button type="button" className="profile__add-button" aria-label="добавить фото" onClick={props.onAddPlace} />
      </section>
      <section className="cards">
        {props.cards.map((item) => {
          return (
            <Card card={item}
              key={item._id}
              onCardClick={props.onCardClick}
              currentUser={currentUser}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  )
}

export default Main;