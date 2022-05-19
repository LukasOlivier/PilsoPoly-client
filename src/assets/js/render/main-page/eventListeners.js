function addEventListeners() {
    addEventListenersBoardNavigation();
    addEventListenersTrading();
    addEventListenersGiveUp();
    addEventListenersRollDice();
    addEventListenersAuction();
    addEventListenersTaxSystem();
    document.querySelector(`#buy`).addEventListener('click', buyProperty);
    document.querySelector(`#inventory`).addEventListener('click', () => window.location.href = "inventory.html");
    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains("#card-description") && e.target.id !== "roll-dice-oke") {
            hidePopupCardDescription();
        }
    });
}

function addEventListenersRollDice() {
    document.querySelector("#roll-dice").addEventListener("click", rollDice);
    _$containers["rollDiceOpenDialog"].addEventListener('click', () => {
        openDialog(_$containers.rollDiceDialog);
    });
    document.querySelector("#cancel-roll-dice").addEventListener('click', function () {
        closeDialog(_$containers.rollDiceDialog);
    });

    document.querySelector("#roll-dice-oke").addEventListener('click', () => {
        closeDialog(_$containers.rollDiceDialog);
        resetRollDiceText();
        togglePopUpButtons();
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
    document.querySelector("main").addEventListener("wheel", wheelEvent);
    document.addEventListener('keydown', keyPressEvent);
    document.querySelector("#back-to-current-position button").addEventListener("click", function (e) {
        seeOtherPlayerPosition(e);
    });
}
