// choose if you want to buy or if you want to auction
function chooseBuyOrAuction() {
    document.querySelector(`#buy-property-popup .Buy`).addEventListener('click', buyProperty);
}

// buy the property
function buyProperty() {
    const currentTileName = loadFromStorage("currentTileName");
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTileName}`,'POST');
    updatePlayerProperties();
}

// update the player property dictionary in the local storage
function updatePlayerProperties(){
    createPlayerProperties();
    removeTemplateContents("footer div");
    renderPlayerProperties();
    makeBuyPopupHidden();
}

// make the div where you can push the button buy display none
function makeBuyPopupHidden(){
    document.querySelector(`#buy-property-popup`).classList.add("hidden");
}

// make the div where you can push the button buy pop up
function makeBuyPopupNotHidden(){
    document.querySelector(`#buy-property-popup`).classList.remove("hidden");
}




