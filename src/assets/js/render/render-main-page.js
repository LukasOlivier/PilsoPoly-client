"use strict";

document.addEventListener("DOMContentLoaded", renderMainPage);

function renderMainPage() {

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("#map").addEventListener("click", showMap);
    document.querySelector("#trade").addEventListener("click", trade);

    renderCardsFetch();
    renderProperties();
}

function endTurn() {
    console.log("end");
}

function renderCardsFetch() {
    const playerName = "Bob";
    fetchFromServer("/games/dummy", "GET")
        .then(res => res.players.forEach(function (player) {
            if (player.name === playerName) {
                getCardInformationWithName(player.currentTile);
            }
        }));
}

function getCardInformationWithName(tileName) {
    fetchFromServer("/tiles")
        .then(res => res.forEach(function (tile) {
            if (tileName === tile.name) {
                renderCards(tile);
            }
        }));
}

function getCardInformationWithId(tileId) {
    return null;
}

function renderCards(tile) {
    const position = tile.position;
    for (let i = position - 2; i < position + 3; i++) {
        if (i === position) {
            renderCard(tile, true);
        } else {
            renderCard(tile, false);
        }
    }
}

function renderCard(cardInfo, middle) {
    // TODO : filter special cards
    if (cardInfo.type === "street") {
        const $template = document.querySelector('main template').content.firstElementChild.cloneNode(true);
        if (middle) {
            $template.classList.add("middle");
        }
        $template.querySelector("h3").innerText = cardInfo.name;
        $template.querySelector('p:first-of-type').innerText = `rent: ${cardInfo.rent}`;
        $template.querySelector('.rent-one-house').innerText = `Rent with one house: ${cardInfo.rentWithOneHouse}`;
        $template.querySelector('.rent-two-house').innerText = `Rent with two houses: ${cardInfo.rentWithTwoHouses}`;
        $template.querySelector('.rent-three-house').innerText = `Rent with three houses: ${cardInfo.rentWithThreeHouses}`;
        $template.querySelector('.rent-four-house').innerText = `Rent with four houses: ${cardInfo.rentWithFourHouses}`;
        $template.querySelector('.price-house').innerText = `Price for house: ${cardInfo.housePrice}`;
        $template.querySelector('.mortgage').innerText = `Mortgage: ${cardInfo.mortgage}`;
        document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
    }
}


function renderProperties() {
    // console.log("render properties");
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