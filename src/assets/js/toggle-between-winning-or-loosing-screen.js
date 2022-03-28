"use strict";

document.addEventListener('DOMContentLoaded',init);

function init(){
    const $toggle = document.querySelector('button');
    $toggle.addEventListener('click', toggle);
}

function toggle()
{
    const $losingdiv = document.querySelector('div + div');
    const $winningdiv = document.querySelector('div');
    $losingdiv.classList.toggle('hidden');
    $winningdiv.classList.toggle('hidden');
}