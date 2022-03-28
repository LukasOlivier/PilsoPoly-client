"use strict";

document.addEventListener('DOMContentLoaded',init);

function init(){
    const $togglewinner = document.querySelector('button');
    $togglewinner.addEventListener('click', togglewinner);
    const $toggleloser = document.querySelector('button + button');
    $toggleloser.addEventListener('click', toggleloser);
}

function togglewinner()
{
    const $winningdiv = document.querySelector('div');
    $winningdiv.classList.remove('hidden');
    const $losingdiv = document.querySelector('div + div');
    $losingdiv.classList.add('hidden');
}

function toggleloser()
{
    const $losingdiv = document.querySelector('div + div');
    $losingdiv.classList.remove('hidden');
    const $winningdiv = document.querySelector('div');
    $winningdiv.classList.add('hidden');
}