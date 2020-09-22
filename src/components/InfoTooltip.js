import React from 'react';

function InfoTooltip(props) {
  return (
    <section className={props.isOpen ? `popup popup_opened` : `popup `}>
      <form className="popup__container popup__form" >
        <img src={props.logo} alt="логотип регистрации" className="popup__logo" />
        <h2 className="popup__title-reg">{props.title}</h2>
        <button type="button" className="popup__close-button" aria-label="закрыть" onClick={props.onClose}></button>
      </form>
    </section>
  )
}

export default InfoTooltip

