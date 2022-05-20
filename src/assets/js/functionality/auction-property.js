"use strict";

function auctionProperty() {
    const playerName = loadFromStorage("name");
    const currentTile = loadFromStorage("currentTile");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTile}`, 'DELETE');
    makeBuyPopupHidden();
}

function renderAuctionPopup(gameInfo) {
    const auctionInfo = gameInfo.auction;
    isYourTurnToBid(auctionInfo.lastBidder,auctionInfo.highestBid);
    checkIfTimeExceeded();
    document.querySelector("#property-name").innerHTML = `${auctionInfo.property}`;
    console.log( _$containers.lastBidder.querySelector("span"));
    _$containers.lastBidder.querySelector("span").innerHTML = `${auctionInfo.lastBidder}`;
    document.querySelector("#highest-bid").innerHTML = `highest bid: ${auctionInfo.highestBid}`;
}

function checkIfTimeExceeded() {
    const $progressBar = document.querySelector("#duration");
<<<<<<< HEAD
    const lastBidder = document.querySelector("#last-bidder").innerHTML.split(" ")[2];
    if ($progressBar.value === 30) {
=======
    const lastBidder = _$containers.lastBidder.querySelector("span").innerText;
    if ( $progressBar.value === 30) {
>>>>>>> ad5aa62e8fccb24768357a8cf0c4da75617a5e4c
        const body = {
            bidder: loadFromStorage("name"),
            amount: -1
        };
        if (loadFromStorage("name") === lastBidder){
            const property = document.querySelector("#property-name").innerHTML;
            placeBidOnAuction(body);
            addPropertyToInventory(property);
        }
    }
}

// https://www.codegrepper.com/code-examples/javascript/javascript+countdown+10+seconds
function startTimer() {
    let timeLeft = 30;
    const bidTimer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(bidTimer);
        }
        document.querySelector("#duration").value = 30 - timeLeft;
        timeLeft -= 1;
    }, 1000);
}

function isYourTurnToBid(lastBidder,highestBid) {
    const $buttons = document.querySelectorAll("#auction-property-popup button");
    if (lastBidder === loadFromStorage("name")) {
        $buttons.forEach(button => {
            button.disabled = true;
            document.querySelector("#last-bidder-message").classList.remove("hidden");
        });
    } else {
        $buttons.forEach(button => {
                button.disabled = false;
                const playerBalance = parseInt(document.querySelector(`#${loadFromStorage("name")} .balance`).innerText)
                if (playerBalance < parseInt(button.value) + highestBid)  {
                    button.disabled = true;
                }
                document.querySelector("#last-bidder-message").classList.add("hidden");
            }
        )
        ;
    }
}

function startAuction() {
    startTimer();
    showElement(_$containers.auctionPopup);
}

function endAuction() {
    const lastBidder = _$containers.lastBidder.querySelector("span").innerHTML;
    addActionDescriptionToActivity(`${lastBidder} has won the auction`);
    resetProgressBar();
    hideElement(_$containers.auctionPopup);
}

function resetProgressBar() {
    const $progressBar = document.querySelector("#duration");
    $progressBar.value = 0;
}

function addAmount(amount) {
    const highestBid = parseInt(document.querySelector("#highest-bid").innerHTML.replace(/\D/g, ""));
    const newBid = highestBid + amount;
    const body = {
        bidder: loadFromStorage("name"),
        amount: newBid
    };
    placeBidOnAuction(body);
}

function placeBidOnAuction(body) {
  
    fetchFromServer(`/games/${_gameID}/bank/auctions/property/bid`, "POST", body);
}
