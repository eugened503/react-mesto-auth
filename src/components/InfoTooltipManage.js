import React from 'react';
import logo from '../images/Union.svg';
import InfoTooltip from './InfoTooltip.js';

function InfoTooltipManage(props) {
    return (
        <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} title="Вы успешно зарегистрировались!" logo={logo}>
        </InfoTooltip>
    )
}

export default InfoTooltipManage

