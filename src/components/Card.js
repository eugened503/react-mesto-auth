import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  const isOwn = props.card.owner._id === props.currentUser._id;
  
  // const cardDeleteButtonClassName = ( // Переменная, которая будет использоваться в className для кнопки удаления
  //   `card__trash-button ${isOwn ? '' : 'card__trash-button_hidden'}`
  // );


  const cardDeleteButtonClassName = `card__trash-button_hidden' ${ // Переменная, которая будет использоваться в className для кнопки удаления
    isOwn ? "card__trash-button" : null
  }`;




  const isLiked = props.card.likes.some(item => item._id === props.currentUser._id); // Определение лайка пользователя
  const cardLikeButtonClassName = (// Переменная, которая будет использоваться в className для кнопки лайка
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="card">
      <img className="card__image" alt="ваше фото" id="myImg" src={props.card.link} onClick={handleClick} />
      <h2 className="card__title">{props.card.name}</h2>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="корзина"></button>
      <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="лайк"></button>
      <h2 className="card__like-sum">{props.card.likes.length > 0 ? `${props.card.likes.length}` : 0} </h2>
    </div>
  )
}

export default Card;