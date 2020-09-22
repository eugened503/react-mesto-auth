import React from 'react';
import logo from '../images/mistake.svg';
import InfoTooltip from './InfoTooltip.js';

function InfoTooltipMistake(props) {
    return (
        <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} title="Что-то пошло не так!
        Попробуйте ещё раз." logo={logo}>
        </InfoTooltip>
    )
}

export default InfoTooltipMistake

