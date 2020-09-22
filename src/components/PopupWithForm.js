import React from 'react';

  function PopupWithForm(props){ 
    return (
        <section className={props.isOpen ? `popup popup-${props.name} popup_opened`:`popup popup-${props.name}`}>
        <form onSubmit={props.onSubmit} className="popup__container popup__form" >
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="popup__btn popup__button" aria-label="сохранить"
                id="active-passive-btn">Сохранить</button>
            <button type="button" className="popup__close-button" aria-label="закрыть" onClick = {props.onClose}></button>
        </form>
    </section>
    )
  }

  export default PopupWithForm