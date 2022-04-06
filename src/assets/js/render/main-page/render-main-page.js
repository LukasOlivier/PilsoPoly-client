// "use strict";
let _playerPositionID = null;
let _tempPlayerPositionID = null;
let _$containers = {};
_token = {token: loadFromStorage("token")};
_gameID = "dummy";
let _previousGameState = null;

function renderMainPage() {
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
    renderFirstTime();
}

function renderFirstTime() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            renderPlayerInfo(currentGameInfo);
            checkIfPlayerBankrupt(currentGameInfo);
            checkIfPlayerCanRoll(currentGameInfo);
            _previousGameState = currentGameInfo;
            pollingGameState();
        });
}

function pollingGameState() {
    // This needs to be on a diff place for sure!!
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            getTiles(currentGameInfo);
            checkGameStates(currentGameInfo);
            checkIfBought(currentGameInfo);
            checkIfPlayerOnTile(currentGameInfo);
            setTimeout(pollingGameState, 5000);
        });
}

function checkGameStates(currentGameInfo) {
    if (currentGameInfo.currentPlayer !== _previousGameState.currentPlayer) {
        // This means that a turn was ended and its someone else its turn
        checkIfPlayerCanRoll(currentGameInfo);
    }
}

function renderCards(currentGameInfo) {
    removeTemplate("#cards-parent article");
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    console.log(playerName);
    // Find the current tile of the player
    currentGameInfo.players.forEach(function (player) {
        if (player.name === playerName) {
            currentTileName = player.currentTile;
        }
    });
    // Find that tile in localStorage
    loadFromStorage("tiles").forEach(function (tile) {
        if (tile.name === currentTileName) {
            _tempPlayerPositionID = tile.position;
            _playerPositionID = tile.position;
            getCardById(tile.position);
        }
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

function renderPlayerInfo(currentGameInfo) {
    currentGameInfo.players.forEach(function (player) {
        const $template = document.querySelector('.player-info-template').content.firstElementChild.cloneNode(true);
        $template.classList.add(player.name.toLowerCase());
        $template.querySelector(".player-balance").innerText = `${player.name}: ${player.money}`;
        document.querySelector('footer').insertAdjacentHTML("beforeend", $template.outerHTML);
    });
}

function renderBoughtFooter(property, playerName) {
    document.querySelector(`.${playerName.toLowerCase()}`).querySelector(`.${property}`).classList.remove("not-bought");
}

function renderMortgagedFooter(property, playerName) {
    document.querySelector(`.${playerName.toLowerCase()}`).querySelector(`.${property}`).classList.remove("not-bought");
    document.querySelector(`.${playerName.toLowerCase()}`).querySelector(`.${property}`).classList.add("mortgaged");
}

function renderMortgagedMain($propertyCard, playerName) {
    $propertyCard.querySelector(`.player-bought`).classList.add("hidden");
    $propertyCard.querySelector(`.player-mortgaged`).classList.remove("hidden");
    $propertyCard.style.border = "orange solid 0.1rem";
    $propertyCard.querySelector(`.player-mortgaged`).innerText = playerName;
}

function renderBoughtMain($propertyCard, playerName) {
    $propertyCard.querySelector(`.player-mortgaged`).classList.add("hidden");
    $propertyCard.querySelector(`.player-bought`).classList.remove("hidden");
    $propertyCard.style.border = "red solid 0.1rem";
    $propertyCard.querySelector(`.player-bought`).innerText = playerName;
}

function renderPlayerBankrupt(playerName) {
    const $container = document.querySelector(`.${playerName}`);
    $container.style.opacity = "0.5";
    $container.querySelector("p").style.color = "red";
    $container.querySelector("p").innerHTML = `${playerName}: BANKRUPT`;
}

function renderPlayerOnTile(tile, playerName) {
    document.querySelector(`#${tile} .player-pos`).classList.remove('hidden');
    document.querySelector(`#${tile} .player-pos`).innerText = playerName;
}


function showMap() {
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
