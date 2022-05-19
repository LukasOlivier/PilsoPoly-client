'use strict';

function setTaxSystem(e){
    const type = e.target.value;
    const playerName = loadFromStorage("name");
    fetchFromServer(`/games/${_gameID}/players/${playerName}/tax/${type}`, 'POST')
        .then(response => {
            _$containers.taxPopup.querySelector("#current").innerText = type;
            toggleTaxButtons();
        })
        .catch(errorHandler);
}

function toggleTaxButtons() {
    const $computeButton = _$containers.taxPopup.querySelector("#compute");
    const $estimateButton = _$containers.taxPopup.querySelector("#estimate");
    $computeButton.disabled = !$computeButton.disabled;
    $estimateButton.disabled = !$estimateButton.disabled;
}
