// "use strict";

let _playerPositionID = null;
let _tempPlayerPositionID = null;
let _$containers = {};
_token = {token: loadFromStorage("token")};
_gameID = loadFromStorage("gameId");

//TODO remove the token and game id from rendermainpage() without everything falling apart
function renderMainPage() {

    _$containers["cardsParent"] = document.querySelector("#cards-parent");
    _$giveUpPopup = document.querySelector("#give-up-popup");

    _token = {token: loadFromStorage("token")};
    _gameID = loadFromStorage("gameId");

    _$containers = {
        giveUpPopup: document.querySelector("#give-up-popup"),
        cardsParent: document.querySelector("#cards-parent")
    };
    document.querySelector("#map").addEventListener("click", showMap);
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("main").addEventListener("wheel", wheelEvent);
    document.addEventListener('keydown', keyPressEvent);
    document.querySelector("#trade").addEventListener("click", trade);
    document.querySelector("#back-to-current-position button").addEventListener("click", backToCurrentPosition);
    document.querySelector("#give-up").addEventListener("click", giveUp);
    document.querySelector("#give-up-deny").addEventListener("click", giveUpDeny);
    document.querySelector("#give-up-confirm").addEventListener("click", loseGame);


    document.querySelector("#roll-dice").addEventListener("click", rollDice);

    getTiles();
    renderFirstTime();
}

function renderFirstTime(){
    createPlayerProperties();
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            renderPlayerInfo(res);
            checkIfPlayerBankrupt(res);
            checkIfPlayerCanRoll(res);
            _currentGameState = res;
            pollingGameState();
        });
}


function pollingGameState(){
    console.log("polling")
    // This needs to be on a diff place for sure!!
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            const newGameState = res;
            checkGameStates(newGameState);
            setTimeout(pollingGameState, 2000);
        });
}

function checkGameStates(newState){
    if (newState.currentPlayer !== _currentGameState.currentPlayer) {
        // This means that a turn was ended and its someone else its turn
        checkIfPlayerCanRoll(newState);
    }
}

function renderCards() {
    removeTemplate("#cards-parent article");
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(res => {
            // we change this tis to getCurrentTileName
            res.players.forEach(function (player) {
                if (player.name === playerName) {
                    currentTileName = player.currentTile;
                }
            });
            loadFromStorage("tiles").forEach(function (tile) {
                if (tile.name === currentTileName) {
                    _tempPlayerPositionID = tile.position;
                    _playerPositionID = tile.position;
                    getCardById(tile.position);
                }
            });
        });
}

function getCardById(id) {
    const toShow = createToShow(id, id - 2, id + 3);
    for (const cardId of toShow) {
        if (cardId === id) {
            showCards(loadFromStorage("tiles")[cardId], true);
        } else {
            showCards(loadFromStorage("tiles")[cardId], false);
        }
    }
    checkIfPlayerOnTile();
    checkIfBought();
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
    switch (cardInfo.type) {
        case "street":
            renderNormalCard(cardInfo, middle);
            break;
        case "utility":
            renderUtilityCard(cardInfo, middle);
            break;
        case "railroad":
            renderRailroad(cardInfo, middle);
            break;
        default:
            renderSpecialCard(cardInfo, middle);
            return;
    }
}

function renderPlayerInfo(res) {
    res.players.forEach(function (player) {
        const $template = document.querySelector('.player-info-template').content.firstElementChild.cloneNode(true);
        $template.classList.add(player.name.toLowerCase());
        $template.querySelector(".player-balance").innerText = `${player.name}: ${player.money}`;
        document.querySelector('footer').insertAdjacentHTML("beforeend", $template.outerHTML);
    });
    renderPlayerProperties();
}

function renderPlayerProperties() {
    const playerProperties = loadFromStorage("playerProperties");
    for (const player in playerProperties) {
        if (player) {
            const $container = document.querySelector(`.${player.toLowerCase()}`);
            playerProperties[player].forEach(function (property) {
                // "property.name !== null" wordt dubbel gecheckt omdat er anders teveel genest wordt volgens sonar
                if (!property.mortgage && property.name !== null) {
                    $container.querySelector(`.${nameToId(property.name)}`).classList.remove("not-bought");
                } else if (property.mortgage && property.name !== null) {
                    $container.querySelector(`.${nameToId(property.name)}`).classList.add("mortgaged");
                }
            });
        }
    }
}

function checkIfPlayerBankrupt(response) {
    response.players.forEach(player => {
        if (player.bankrupt) {
            const $container = document.querySelector(`.${player.name}`);
            $container.style.opacity = "0.5";
            $container.querySelector("p").style.color = "red";
            $container.querySelector("p").innerHTML = `${player.name}: BANKRUPT`;
        }
    });
}

function checkIfPlayerOnTile() {
    fetchFromServer(`/games/${_gameID}`)
        .then(response => {
            const playersInfo = response.players;
            playersInfo.forEach(player => {
                // Checks if player is on a card that is currently shown on screen. (And filters out bankrupted players)
                if (document.querySelector(`#${nameToId(player.currentTile)}`) !== null && !player.bankrupt) {
                    document.querySelector(`#${nameToId(player.currentTile)} .player-pos`).classList.remove('hidden');
                    document.querySelector(`#${nameToId(player.currentTile)} .player-pos`).insertAdjacentHTML("beforeend", `${player.name} `);
                }
            });
        });
}

function checkIfBought() {
    const playerProperties = loadFromStorage("playerProperties");
    for (const player in playerProperties) {
        if (player) {
            playerProperties[player].forEach(function (property) {
                const $propertyCard = document.querySelector(`#${nameToId(property.name)}`);
                // first statement checks if card is bought, second statement checks if this card is currently rendered in
                if (property.name !== null && $propertyCard !== null && property.mortgage) {
                    $propertyCard.querySelector(`.player-bought`).classList.add("hidden");
                    $propertyCard.querySelector(`.player-mortgaged`).classList.remove("hidden");
                    $propertyCard.style.border = "orange solid 0.1rem";
                    $propertyCard.querySelector(`.player-mortgaged`).insertAdjacentHTML("beforeend", `${player}`);
                    // if its bought but not mortgaged (active)
                    // "property.name !== null" wordt dubbel gecheckt omdat er anders teveel genest wordt volgens sonar
                } else if (property.name !== null && $propertyCard !== null) {
                    $propertyCard.querySelector(`.player-mortgaged`).classList.add("hidden");
                    $propertyCard.querySelector(`.player-bought`).classList.remove("hidden");
                    $propertyCard.style.border = "red solid 0.1rem";
                    $propertyCard.querySelector(`.player-bought`).insertAdjacentHTML("beforeend", `${player}`);
                }
            });
        }
    }
}

function showMap(){
    window.location.href = "see-all-the-streets-with-owners.html";
}
function giveUp() {
    _$containers["giveUpPopup"].classList.remove("hidden");
    document.querySelector("section").classList.add("hidden");

}

function giveUpDeny() {
    document.querySelector("section").classList.remove("hidden");
    _$containers["giveUpPopup"].classList.add("hidden");
}
function trade() {
    console.log("trade");
}

function createPlayerProperties(){
    fetchFromServer(`/games/${_gameID}`, 'GET')
        .then(players => {
            linkPlayersAndStreets(players.players);
        });
}