"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    initStartScreen();
    testConnection();
}

function testConnection(){
    fetchFromServer('/tiles','GET').then(tiles => console.log(tiles)).catch(errorHandler);
}