"use strict";

let _tiles = null;

document.addEventListener("DOMContentLoaded", renderMainPage);

async function renderMainPage() {

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("#map").addEventListener("click", showMap);
    document.querySelector("#trade").addEventListener("click", trade);

    getTiles();
}

function endTurn() {
    console.log("end");
}

function getTiles() {
    fetchFromServer("/tiles", "GET")
        .then(tiles => {
            _tiles = tiles;
            console.log(tiles);
            renderCards();
        });
}

function renderCards() {
    let currentTileName = null;
    const playerName = "Bob";
    fetchFromServer("/games/dummy", "GET")
        .then(res => {
            res.players.forEach(function (player) {
                if (player.name === playerName) {
                    currentTileName = player.currentTile;
                }
            });
            _tiles.forEach(function (tile) {
                if (tile.name === currentTileName) {
                    getCardById(tile.position);
                }
            });
        });
}

function getCardById(id) {
    const toShow = createToShow(id, id-2, id+3);
    console.log(toShow);
    for (const cardId of toShow) {
        if (cardId === id) {
            showCards(_tiles[cardId], true);
        } else {
            showCards(_tiles[cardId], false);
        }
    }
}

function createToShow(id, firstId, lastId) {
    const toShow = [];
    if (id === 0) {
        toShow.push(38, 39, 0, 1, 2);
    } else if (id === 1) {
        toShow.push(39, 0, 1, 2, 3);
    } else if (id === 38) {
        toShow.push(36, 37, 38, 0, 1);
    } else if (id === 39) {
        toShow.push(37, 38, 39, 0, 1);
    } else {
        for (let i = firstId; i < lastId; i++) {
            toShow.push(i);
        }
    }
    return toShow;
}


function showCards(cardInfo, middle) {
    if (cardInfo.type === "street") {
        renderNormalCard(cardInfo, middle);
    } else if (cardInfo.type === "Go" || cardInfo.type === "community chest" || cardInfo.type === "Jail" || cardInfo.type === "Luxury Tax"){
        specialCard(cardInfo, middle);
    } else if (cardInfo.type === "utility") {
        renderUtilityCard(cardInfo, middle);
    }
}

function renderNormalCard(cardInfo, middle) {
    const $template = document.querySelector('main .normal-card-template').content.firstElementChild.cloneNode(true);
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

function specialCard(cardInfo, middle) {
    const $template = document.querySelector('main .special-card-template').content.firstElementChild.cloneNode(true);
    if (middle) {
        $template.classList.add("middle");
    }
    $template.querySelector("h3").innerText = cardInfo.name;
    document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderUtilityCard(cardInfo, middle) {
    const $template = document.querySelector('main .utility-card-template').content.firstElementChild.cloneNode(true);
    if (middle) {
        $template.classList.add("middle");
    }
    $template.querySelector("h3").innerText = cardInfo.name;
    $template.querySelector('.cost').innerText = `rent: ${cardInfo.cost}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: ${cardInfo.mortgage}`;
    document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
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