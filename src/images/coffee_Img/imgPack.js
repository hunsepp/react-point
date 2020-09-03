import React from 'react';
import americano from './americano.png';
import caffeLatte from './caffeLatte.jpg';
import espresso from './espresso.jpg';

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

export {Americano,CaffeLatte,Espresso};