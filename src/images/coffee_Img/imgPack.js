import React from 'react';
import americano from './americano.png';
import caffeLatte from './caffeLatte.jpg';
import espresso from './espresso.jpg';
import cappuccino from './cappuccino.png';
import caffeMocha from './caffeMocha.jpg';
import macchiato from './macchiato.jpg';

function Americano() {
    return(
    <img src={americano} alt="americano" width="100" height="100" align="left">
    </img>);
}

function CaffeLatte() {
    return(
    <img src={caffeLatte} alt="caffeLatte" width="100" height="100" align="left">
    </img>);
}

function Espresso() {
    return(
    <img src={espresso} alt="espresso" width="100" height="100" align="left">
    </img>);
}
function Cappuccino() {
    return(
    <img src={cappuccino} alt="cappuccino" width="100" height="100" align="left">
    </img>);
}
function CaffeMocha() {
    return(
    <img src={caffeMocha} alt="caffeMocha" width="100" height="100" align="left">
    </img>);
}
function Macchiato() {
    return(
    <img src={macchiato} alt="macchiato" width="100" height="100" align="left">
    </img>);
}

export {Americano,CaffeLatte,Espresso,Cappuccino,CaffeMocha,Macchiato};