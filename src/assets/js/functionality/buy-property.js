// buy the property
function buyProperty() {
    const playerName = loadFromStorage("name");
    const currentTile = loadFromStorage("currentTile");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/properties/${currentTile}`, 'POST')
        .then(() => {
            addPropertyToInventory(currentTile);
            addActionDescriptionToActivity(`You bought: ${loadFromStorage("currentTile")}`);
            hideElement(document.querySelector("#buy-property-popup"));
        })
        .catch(() => {
            showErrorPopup("You don't have enough money to buy property, start auction instead");
        })
}

// make the div where you can push the button buy display none
function makeBuyPopupHidden() {
    document.querySelector(`#buy-property-popup`).classList.add("hidden");
}
