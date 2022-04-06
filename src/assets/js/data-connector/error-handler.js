"use strict";

function generateVisualAPIErrorInConsole(){
    console.error('%c%s','background-color: red;color: white','! An error occurred while calling the API');
}

function errorHandler(error){
    document.querySelector(_config.errorHandlerSelector).innerText = error;
}
