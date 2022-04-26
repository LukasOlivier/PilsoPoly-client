function collectDebt(property , player, name){
    if (`${name}${property}${player}` !== loadFromStorage("rent")){
        fetchFromServer(`/games/${_gameID}/players/${name}/properties/${property}/visitors/${player}/rent`, 'DELETE');
        saveToStorage("rent", `${name}${property}${player}`);
        collectDepthPopupNotHidden(property, name);
    }
}

function removeHiddenClassToPayRentDiv(){
    document.querySelector(`#pay-rent`).classList.remove("hidden");
    setTimeout(addHiddenClassToPayRentDiv, 5000);
}

function addHiddenClassToPayRentDiv(){
    document.querySelector(`#pay-rent`).classList.add("hidden");
}

function collectDepthPopupNotHidden(property, name){
    const collectingRentPopup = document.querySelector(`#collect-rent`);
    collectingRentPopup.innerText = `You received money because ${name} is on tile: ${property}`;
    collectingRentPopup.classList.remove(`hidden`);
    setTimeout(collectDepbtPopupHidden, 5000);
}

function collectDepbtPopupHidden(){
    document.querySelector(`#collect-rent`).classList.add("hidden");
}
















