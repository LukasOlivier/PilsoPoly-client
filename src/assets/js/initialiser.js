"use strict";

let _token = null;
let _gameID = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector("h1").id === "start-screen") {
        initStartScreen();
    }
    else if (document.querySelector("h1").id === "game-screen"){
        renderMainPage();
    }
}
