import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EitProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser])

    function handleNameInput(evt) {
        setName(evt.target.value)
    }

    function handleAboutInput(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description
        })
    }
    return (
        <PopupWithForm name="profile" title="Редактировать профиль" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
            <input defaultValue={name} onChange={handleNameInput} id="name-input" type="text" required placeholder="Ваше имя" name="name"
                className="popup__text popup__text_text-margin popup__input"
                minLength="2" maxLength="40" pattern="[А-Яа-яA-Za-z -]{2,40}" />
            <span id="name-input-error" className="popup__input-error" />
            <input defaultValue={description} onChange={handleAboutInput} id="work-input" type="text" required placeholder="Род деятельности" name="about" className="popup__text popup__text_work-margin popup__input" minLength="2" maxLength="200" />
            <span id="work-input-error" className="popup__input-error" />
        </PopupWithForm>
    )
}

export default EitProfilePopup;