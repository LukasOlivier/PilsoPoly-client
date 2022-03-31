// "use strict";

let _playerPositionID = null;
let _tempPlayerPositionID = null;

function renderMainPage() {

    _token = {token : loadFromStorage("token")};
    _gameID = loadFromStorage("gameId");

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("#trade").addEventListener("click", trade);
    document.querySelector("main button").addEventListener("click", backToCurrentPosition);

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
                    _tempPlayerPositionID = tile.position;
                    _playerPositionID = tile.position;
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
        toShow.push(36, 37, 38, 39, 0);
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
            renderPlayerProperties();
        });
}

function move(value) {
    const $button = document.querySelector("main button");
    if ($button.classList.contains("hidden")) {
        $button.classList.toggle("hidden");
    }
    _tempPlayerPositionID -= value;

    if (_tempPlayerPositionID === 40) {
        _tempPlayerPositionID = 0;
    }

    if (_tempPlayerPositionID === -1) {
        _tempPlayerPositionID = 39;
    }

    removeCards();
    getCardById(_tempPlayerPositionID);
}

function moveLeft() {
    move(1);
}

function moveRight() {
    move(-1);
}

function backToCurrentPosition() {
    document.querySelector("main button").classList.toggle("hidden");
    removeCards();
    getCardById(_playerPositionID);
}

function removeCards() {
    const $articles = document.querySelectorAll("#cards-parent article");
    $articles.forEach((article) => {
        article.remove();
    });
}

function renderPlayerProperties() {
    const playerProperties = loadFromStorage("playerProperties");
    for (const player in playerProperties) {
        const $container = document.querySelector(`div.${player}`);

    }
}

function trade() {
    console.log("trade");
}