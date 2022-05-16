// buy the property
function buyProperty() {
    const playerName = loadFromStorage("name");

    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${loadFromStorage("currentTile")}`, 'POST');
    addPropertyToInventory();
    makeBuyPopupHidden();
}

// make the div where you can push the button buy display none
function makeBuyPopupHidden() {
    document.querySelector(`#buy-property-popup`).classList.add("hidden");
}

// make the div where you can push the button buy pop up
function makeBuyPopupNotHidden() {
    document.querySelector(`#buy-property-popup`).classList.remove("hidden");
}

function addPropertyToInventory() {
    const currentInventory = loadFromStorage('inventory');
    currentInventory.push(nameToId(loadFromStorage("currentTile")));
    saveToStorage("inventory",currentInventory);

}

