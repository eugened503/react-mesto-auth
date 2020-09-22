import React from 'react';

function ImagePopup(props){
        return (
            <section className={`popup popup-enlargement ${props.isOpen && 'popup_opened'}`}>
            <form className="popup__container-enlargement" name="container" method="post" action="#">
                <img src={props.card.link} alt="ваше фото" className="popup__img-enlargement" />
                <h2 className="popup__title popup__title-enlargement">{props.card.name}</h2>
                <button type="button" className="popup__close-button popup__close-button-enlargement"
                    aria-label="закрыть" onClick={props.onClose}></button>
            </form>
        </section>
        )
      }

export default ImagePopup