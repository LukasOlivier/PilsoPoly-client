// buy the property
function buyProperty() {
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${_lastMoveInfo.tileName}`, 'POST');
    addPropertyToInventory();
    makeBuyPopupHidden();
}

// make the div where you can push the button buy display none
function makeBuyPopupHidden() {
    document.querySelector(`#buy-property-popup`).classList.add("hidden");
}

function addPropertyToInventory() {
    const currentInventory = loadFromStorage('inventory');
    //currentInventory.push(nameToId(loadFromStorage("currentTile")));
    currentInventory.push(nameToId(_lastMoveInfo.tileName))
    saveToStorage("inventory",currentInventory);

}

