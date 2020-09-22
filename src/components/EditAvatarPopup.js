import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const refAvatar = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: refAvatar.current.value });
  }
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="avatar" onSubmit={handleSubmit} title="Обновить аватар">
      <input ref={refAvatar} type="url" id="link-input" placeholder="Ссылка на картинку" required defaultValue="" name="avatar"
        className="popup__text popup__text_work-margin popup__link popup__input popup__text_avatar"
        pattern="^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$" />
      <span id="link-input-error" className="popup__input-error" />
    </PopupWithForm>)
}

export default EditAvatarPopup;