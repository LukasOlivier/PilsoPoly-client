"use strict";

function auctionProperty() {
    const playerName = loadFromStorage("name");
    const currentTile = _currentMoveInfo.tileName;
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTile}`, 'DELETE');
    makeBuyPopupHidden();
}

function renderAuctionPopup(gameInfo) {
    const auctionInfo = gameInfo.auction;
    isYourTurnToBid(auctionInfo.lastBidder);
    checkIfTimeExceeded();
    document.querySelector("#property-name").innerHTML = `${auctionInfo.property}`;
    document.querySelector("#last-bidder").innerHTML = `last bidder: ${auctionInfo.lastBidder}`;
    document.querySelector("#highest-bid").innerHTML = `highest bid: ${auctionInfo.highestBid}`;
}

function checkIfTimeExceeded() {
    const $progressBar = document.querySelector("#duration");
    if ( $progressBar.value === 30 ) {
        const body = {
            bidder: loadFromStorage("name"),
            amount: -1
        };
        placeBidOnAuction(body);
    }
}

// https://www.codegrepper.com/code-examples/javascript/javascript+countdown+10+seconds
function startTimer() {
    let timeLeft = 30;
    const bidTimer = setInterval(function(){
        if( timeLeft <= 0 ) {
            clearInterval(bidTimer);
        }
        document.querySelector("#duration").value = 30 - timeLeft;
        timeLeft -= 1;
    }, 1000);
}

function isYourTurnToBid(lastBidder) {
    const $buttons = document.querySelectorAll("#auction-property-popup button");
    if (lastBidder === loadFromStorage("name")) {
        $buttons.forEach(button => {
            button.disabled = true;
            document.querySelector("#last-bidder-message").classList.remove("hidden");
        });
    } else {
        $buttons.forEach(button => {
            button.disabled = false;
            document.querySelector("#last-bidder-message").classList.add("hidden");
        });
    }
}

function showAuctionPopup() {
    const $dialog = document.querySelector("#auction-property-popup");
    if ( !$dialog.open ) {
        startTimer();
        $dialog.showModal();
    }
}

function hideAuctionPopup() {
    const $dialog = document.querySelector("#auction-property-popup");
    if ( $dialog.open ) {
        $dialog.close();
    }
}

function addAmount(amount) {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + amount;
    const body = {
        bidder: loadFromStorage("name"),
        amount: newBid
    };
    placeBidOnAuction(body)
}

function placeBidOnAuction(body) {
    fetchFromServer(`/games/${_gameID}/bank/auctions/property/bid`, "POST", body);
}
