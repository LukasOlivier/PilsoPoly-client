function makeListOfAllStreetsThatTheLocalPlayerOwnes(gameInfo){
    const listOfSelfOuningStreets = [];
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        if (player.name === loadFromStorage("name")){
            player.properties.forEach(property => {
                listOfSelfOuningStreets.push(property.property);
            });
        }
    });
    checkNamePlayerBoughtStreet(gameInfo, listOfSelfOuningStreets);
}

function checkNamePlayerBoughtStreet(gameInfo, listOfSelfOwningStreets){
    const playersInfo = gameInfo.players;
    playersInfo.forEach(player => {
        if (player.name !== loadFromStorage("name")){
            listOfSelfOwningStreets.forEach(property => {
                if (player.currentTile === property){
                    collectDebt(property , player.name, loadFromStorage("name"));
                }
            });
        }
    });
}


function collectDebt(property , player, name){
    if (`${name}${property}${player}` !== loadFromStorage("rent")){
        fetchFromServer(`/games/${_gameID}/players/${name}/properties/${property}/visitors/${player}/rent`, 'DELETE');
        saveToStorage("rent", `${name}${property}${player}`);
        collectDepbtPopupNotHidden(property, name);
    }
}

function removeHiddenClassToPayRentDiv(){
    document.querySelector(`#pay-rent`).classList.remove("hidden");
    setTimeout(addHiddenClassToPayRentDiv, 5000);
}

function addHiddenClassToPayRentDiv(){
    document.querySelector(`#pay-rent`).classList.add("hidden");
}

function collectDepbtPopupNotHidden(property, name){
    const collectingRentPopup = document.querySelector(`#collect-rent`);
    collectingRentPopup.insertAdjacentHTML(`beforeend`, `<p>${name} needs to pay monney, bacause he is on tile: ${property}</p>>`);
    collectingRentPopup.classList.remove(`hidden`);
    setTimeout(collectDepbtPopupHidden, 5000);
}

function collectDepbtPopupHidden(){
    document.querySelector(`#collect-rent`).classList.add("hidden");
}
















