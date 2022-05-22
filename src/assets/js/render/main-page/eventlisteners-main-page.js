"use strict";

function addEventListeners() {
    addEventListenersBoardNavigation();
    addEventListenersTrading();
    addEventListenersGiveUp();
    addEventListenersRollDice();
    addEventListenersAuction();
    addEventListenersJail();
    addEventListenersTaxSystem();
    addEventListenerFooter();

    document.querySelector(`#buy`).addEventListener('click', buyProperty);
    document.querySelector(`#inventory`).addEventListener('click', () => window.location.href = "inventory.html");
}

function addEventListenersRollDice() {
    _$containers.rollDiceOpenDialog.addEventListener('click',() => {
        rollDice();
        hidePopUpsForAuction();
        document.querySelector("#cards-parent").classList.remove("reduce-opacity");
    });
    document.querySelector("#roll-dice-oke").addEventListener('click', () => {
        closeDialog(_$containers.rollDiceDialog);
        resetRollDiceText();
    });
}

function addEventListenersGiveUp() {
    document.querySelector("#give-up").addEventListener("click", giveUp);
    _$containers.giveUpPopup.querySelector("#give-up-deny").addEventListener("click", giveUp);
    _$containers.giveUpPopup.querySelector("#give-up-confirm").addEventListener("click", loseGame);
}

function addEventListenersTaxSystem() {
    document.querySelector("#tax-system").addEventListener("click", taxSystem);
    _$containers.taxPopup.querySelector("#estimate").addEventListener("click", setTaxSystem);
    _$containers.taxPopup.querySelector("#compute").addEventListener("click", setTaxSystem);
}

function addEventListenersTrading() {
    document.querySelector("#trade").addEventListener("click", initTrade);
    document.querySelector("#trade-select-player").addEventListener("click", selectPlayer);
    document.querySelector("#cancel-select-player").addEventListener("click", cancelSelectPlayer);
    document.querySelector("#cancel-trading").addEventListener("click", cancelTrading);
    document.querySelector("#player1 ul").addEventListener("click", addToOffers);
    document.querySelector("#player2 ul").addEventListener("click", addToWants);
    document.querySelector("#send-trade").addEventListener("click", sendTrade);
}

function addEventListenersAuction() {
    document.querySelector("#auction").addEventListener('click', auctionProperty);
    document.querySelector("#add-1").addEventListener("click", () => {
        addAmount(1);
    });
    document.querySelector("#add-10").addEventListener("click", () => {
        addAmount(10);
    });
    document.querySelector("#add-100").addEventListener("click", () => {
        addAmount(100);
    });
}

function addEventListenersBoardNavigation() {
    document.querySelector("#left-arrow").addEventListener("click", moveLeft);
    document.querySelector("#right-arrow").addEventListener("click", moveRight);
    document.querySelector("#cards-parent").addEventListener("wheel", wheelEvent);
    document.addEventListener('keydown', keyPressEvent);
    document.querySelector("#back-to-current-position button").addEventListener("click", () => {
        goToPlayerPosition(loadFromStorage("name"));
    });
}

function addEventListenersJail() {
    document.querySelector("#jail-free").addEventListener("click",getOutOfJailFree);
    document.querySelector("#jail-fine").addEventListener("click",getOutOfJailFine);
}

function addEventListenerFooter(){
    document.querySelector(`footer`).addEventListener('click', (e) => {
        if (e.target.closest(".info-container") !== null){
            goToPlayerPosition(e.target.closest(".info-container").id);
        }
    });
}
