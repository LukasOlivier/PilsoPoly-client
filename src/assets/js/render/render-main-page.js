"use strict";

document.addEventListener("DOMContentLoaded", renderMainPage);

function renderMainPage() {

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


async function renderCards() {
    const currentTileName = await getCurrentTileName();
    const response = await fetchFromServer("/tiles");
    response.forEach(function (tile) {
        if (tile.name === currentTileName) {
            getCardById(tile.position);
        }
    });
}

async function getCurrentTileName() {
    const playerName = "Bob";
    let currentTile = null;
    const response = await fetchFromServer("/games/dummy", "GET");
    response.players.forEach(function (player){
        if (player.name === playerName) {
            currentTile = player.currentTile;
        }
    });
    return currentTile;
}


async function getCardById(id) {
    const toShow = createToShow(id, id-2, id+3);
    for (let cardId of toShow) {
        const response = await fetchFromServer(`/tiles/${cardId}`);
        if (cardId === id) {
            showCards(response, true);
        } else {
            showCards(response, false);
        }
    }
}

function createToShow(id, firstId, lastId) {
    const toShow = [];
    if (id === 0) {
        toShow.push(38, 39, 0, 1, 2);
    } else if (id === 1) {
        toShow.push(39, 0, 1, 2, 3);
    } else if (id === 39) {
        toShow.push(36, 37, 38, 39, 0);
    } else if (id === 40) {
        toShow.push(37, 38, 39, 0, 1);
    } else {
        for (let i = firstId; i < lastId; i++) {
            toShow.push(i);
        }
    }
    return toShow;
}


function showCards(cardInfo, middle) {
    // TODO : filter special cards
    if (cardInfo.type === "street" || true) {
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