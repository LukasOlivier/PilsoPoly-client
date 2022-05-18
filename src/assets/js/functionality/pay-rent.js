function collectDebt(property , player, debtorName){
    if (`${name}${property}${player}` !== loadFromStorage("rent")){
        fetchFromServer(`/games/${_gameID}/players/${player}/properties/${property}/visitors/${debtorName}/rent`, 'DELETE');
        saveToStorage("rent", `${name}${property}${player}`);
        collectDepthPopupNotHidden(property, player);
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
    setTimeout(collectDepthPopupHidden, 5000);
}

function collectDepthPopupHidden(){
    document.querySelector(`#collect-rent`).classList.add("hidden");
}
















