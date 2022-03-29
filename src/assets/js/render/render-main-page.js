"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("#map").addEventListener("click", showMap);
    document.querySelector("#trade").addEventListener("click", trade);

    renderCards();
    renderProperties();
}

function endTurn() {
    console.log("end");
}

function renderCards() {
    console.log("render cards");
}

function renderProperties() {
    console.log("render properties");
}

function moveLeft() {
    console.log("move left");
}

function moveRight() {
    console.log("move right");
}

function showMap() {
    console.log("show map");
}

function trade() {
    console.log("trade");
}