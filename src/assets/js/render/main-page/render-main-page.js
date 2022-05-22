// "use strict";
let _viewPosition = null;
let _$containers = {};
_token = {token: loadFromStorage("token")};
_gameID = loadFromStorage("gameId");

function renderMainPage() {
    _$containers = {
        giveUpPopup: document.querySelector("#give-up-popup"),
        taxPopup: document.querySelector("#tax-preference-popup"),
        cardsParent: document.querySelector("#cards-parent"),
        rollDiceOpenDialog: document.querySelector("#roll-dice-open-dialog"),
        rollDiceDialog: document.querySelector("#roll-dice-dialog"),
        backToCurrentPositionButton: document.querySelector("#back-to-current-position button"),
        cardDescription: document.querySelector("#card-description"),
        jailFreeButton: document.querySelector("#jail-free"),
        auctionPopup: document.querySelector("#auction-property-popup"),
        lastBidder: document.querySelector("#last-bidder"),
        buyPropertyPopup: document.querySelector("#buy-property-popup")
    };
    addEventListeners();
    renderFirstTime();
}

function renderFirstTime() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            saveToStorage("gameState", currentGameInfo);
            checkAmountOfPlayersOverflow(currentGameInfo);
            renderPlayerInfo(currentGameInfo);
            checkIfPlayerCanRoll(currentGameInfo);
            checkIfCurrentTileBuyAble(currentGameInfo);
            renderTaxSystemFirstTime(currentGameInfo);
            showCardsByPosition(findTileId(loadFromStorage("currentTile")));
            pollingGameState();
        });
}

function checkAmountOfPlayersOverflow(gameInfo) {
    const maxPlayersThatFitInFooter = 6;
    if (gameInfo.numberOfPlayers > maxPlayersThatFitInFooter) {
        document.querySelector("footer").classList.add("scrollable-footer");
    }
}

function renderCards(currentGameInfo) {
    removeTemplateContents("#cards-parent article");
    let currentTileName = null;
    const playerName = loadFromStorage("name");
    // Find the current tile of the player
    currentGameInfo.players.forEach(function (player) {
        if (player.name === playerName) {
            currentTileName = player.currentTile;
        }
    });
    // Find that tile in localStorage
    showCardsByPosition(findTileId(currentTileName));
}

function checkIfViewingCurrentPosition(){
    const currentMiddleCard = document.querySelector(".middle").id.toLowerCase();
    if (currentMiddleCard === nameToId(loadFromStorage("currentTile"))){
        hideElement(_$containers.backToCurrentPositionButton);
    }else{
        showElement(_$containers.backToCurrentPositionButton);
    }
}

function showCardsByPosition(position) {
    removeTemplateContents("#cards-parent article");
    const cardsToShow = createToShow(position);
    for (const cardPosition of cardsToShow) {
        if (cardPosition === position) {
            showCards(loadFromStorage("tiles")[cardPosition], true);
        } else {
            showCards(loadFromStorage("tiles")[cardPosition], false);
        }
    }
    checkIfViewingCurrentPosition();
    // We also update these here because we don't want to wait for polling while scrolling (user experience)
    checkIfBought(loadFromStorage("gameState"));
    checkIfPlayerOnTile(loadFromStorage("gameState"));
}

function createToShow(middleCardPosition) {
    const toShow = [];
    let i = 0;
    const numberOfCardsBeforeMiddleCard = 2;
    const firstCardOnDisplay = middleCardPosition - numberOfCardsBeforeMiddleCard;
    const maxCardsOnDisplay = 5;
   while (i < maxCardsOnDisplay){
       toShow.push(keepInRangeOfBoard(firstCardOnDisplay + i));
       i++;
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
        $template.id = nameToId(player.name);
        $template.querySelector(".player-balance .name").innerText = `${player.name}:  M`;
        $template.querySelector(".player-balance .balance").innerText = `${player.money}`;
        $template.querySelector("img").src = `assets/media/${player.icon}.png`;
        document.querySelector('footer').insertAdjacentHTML("beforeend", $template.outerHTML);
    });
}

function renderBoughtFooter(property, playerName) {
    document.querySelector(`#${playerName} .${property}`).classList.remove("not-bought");
    document.querySelector(`#${playerName} .${property}`).classList.remove("mortgaged");
}

function renderMortgagedFooter(property, playerName) {
    document.querySelector(`#${playerName} .${property}`).classList.remove("not-bought");
    document.querySelector(`#${playerName} .${property}`).classList.add("mortgaged");
}

function renderPlayerBankrupt(playerName) {
    const $container = document.querySelector(`#${playerName}`);
    $container.querySelector("p").innerHTML = `${playerName}: BANKRUPT`;
}

function renderPlayerOnTile(tile, playerName) {
    showElement(document.querySelector(`#${tile} .player-pos`));
    const playersOnTile = document.querySelector(`#${tile} .player-pos span`).innerText.toLowerCase();
    if (!playersOnTile.includes(playerName)) {
        document.querySelector(`#${tile} .player-pos span`).insertAdjacentHTML("beforeend", `${playerName} `);
    }
}

function giveUp() {
    if (!_$containers.taxPopup.classList.contains("hidden")) {
        taxSystem();
    }
    toggleElementHidden(_$containers.giveUpPopup);
    toggleCardsOpacity();
}

function taxSystem() {
    if (!_$containers.giveUpPopup.classList.contains("hidden")) {
        giveUp();
    }
    toggleElementHidden(_$containers.taxPopup);
    toggleCardsOpacity();
}

function renderTaxSystemFirstTime(currentGameInfo) {
    const taxType = getTaxSystem(currentGameInfo);
    const $computeButton = _$containers.taxPopup.querySelector("#compute");
    const $estimateButton = _$containers.taxPopup.querySelector("#estimate");
    _$containers.taxPopup.querySelector("#current").innerText = taxType;
    if (taxType === "COMPUTE") {
        $computeButton.disabled = true;
    } else {
        $estimateButton.disabled = true;
    }
}

function hidePopUpsForAuction() {
    hideElement(_$containers.giveUpPopup);
    hideElement(_$containers.taxPopup);
    hideElement(_$containers.buyPropertyPopup);
}

function toggleCardsOpacity() {
    document.querySelector("#cards-parent").classList.toggle("reduce-opacity");
}
