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

function renderMortgagedMain($propertyCard, playerName) {
    hideElement($propertyCard.querySelector(`.player-bought`));
    showElement($propertyCard.querySelector(`.player-mortgaged`));
    $propertyCard.classList.add("card-mortgaged");
    $propertyCard.querySelector(`.player-mortgaged span`).innerText = playerName;

}

function renderBoughtMain($propertyCard, playerName) {
    hideElement($propertyCard.querySelector(`.price`));
    hideElement($propertyCard.querySelector(`.player-mortgaged`));
    showElement($propertyCard.querySelector(`.player-bought`));
    $propertyCard.classList.add("card-bought");
    $propertyCard.querySelector(`.player-bought span`).innerText = playerName;
}
