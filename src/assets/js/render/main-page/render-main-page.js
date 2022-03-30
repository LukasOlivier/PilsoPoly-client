// "use strict";

_token = {token : loadFromStorage("token")};
_gameID = loadFromStorage("gameId");

function renderMainPage() {
    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("#map").addEventListener("click", showMap);
    document.querySelector("#trade").addEventListener("click", trade);
    getTiles();
    renderPlayerInfo();
}

function endTurn() {
    console.log("end");
}

function renderCards() {
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}`, "GET")
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
    } else if (cardInfo.type === "Go" || cardInfo.type === "community chest" || cardInfo.type === "Jail" || cardInfo.type === "Luxury Tax" || cardInfo.type === "Tax Income" || cardInfo.type === "chance" || cardInfo.type === "Go to Jail" || cardInfo.type === "Free Parking") {
        renderSpecialCard(cardInfo, middle);
    } else if (cardInfo.type === "utility") {
        renderUtilityCard(cardInfo, middle);
    } else if (cardInfo.type === "railroad") {
        renderRailroad(cardInfo, middle);
    }
}

function renderPlayerInfo() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            res.players.forEach(function (player) {
                const $template = document.querySelector('.player-info-template').content.firstElementChild.cloneNode(true);
                $template.classList.add(player.name.toLowerCase());
                $template.querySelector(".player-balance").innerText = `${player.name}: ${player.money}`;
                document.querySelector('footer').insertAdjacentHTML("beforeend", $template.outerHTML);
            });
        });
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