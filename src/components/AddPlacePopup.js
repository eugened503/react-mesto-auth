import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const nameRef = React.useRef(); 
  const linkRef = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    })
  }
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="foto" title="Новое место" onSubmit={handleAddPlaceSubmit}>
      <input ref={nameRef} type="text" id="title-input"
        placeholder="Название" required defaultValue="" name="title"
        className="popup__text popup__text_text-margin popup__name popup__input"
        minLength="1" maxLength="30" />
      <span id="title-input-error" className="popup__input-error" />
      <input ref={linkRef} type="url" id="link-input" placeholder="Ссылка на картинку" required defaultValue="" name="link" className="popup__text popup__text_work-margin popup__link popup__input" pattern="^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$" />
      <span id="link-input-error" className="popup__input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;