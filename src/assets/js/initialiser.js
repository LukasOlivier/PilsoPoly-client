"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    initStartScreen();
    testConnection();
    initStartScreen();
    // renderMainPage();
    // this is the innit for the main page
}

function testConnection(){
    fetchFromServer('/tiles','GET').then(tiles => console.log(tiles)).catch(errorHandler);
}
