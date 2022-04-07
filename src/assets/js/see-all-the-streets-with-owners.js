"use strict";

/*fetch the streets and the players. if player puts input into the form go to function search*/
function initMap() {
    const streetNames = [];
    _token = {token: loadFromStorage("token")};
    fetchFromServer(`/games/${loadFromStorage("gameId")}`, 'GET');
    fetchFromServer(`/games/${_gameID}`, 'GET')
        .then(players => {
            linkPlayersAndStreets(players.players);
        });
    runStreets(loadFromStorage("tiles"), streetNames, "");
    document.querySelector('form').addEventListener('input', searchStreet);
}

/*if there is input, catch it => put it to lower case and go to the runstreets function*/
function searchStreet(e) {
    const streetNames = [];
    if (e.target.value) {
        runStreets(loadFromStorage("tiles"), streetNames, e.target.value.toLowerCase());
    } else {
        runStreets(loadFromStorage("tiles"), streetNames, "");
    }
}


/*filter on go, community, chance, Jail,Tax, Parking and carts that do not have the given letters in it*/
function runStreets(tiles, streetNames, sort) {
    removeTemplateContents("#card-container article");
    tiles.forEach(street => {
        if (street.name.toLowerCase().includes(sort) && (street.type === "utility" || street.type === "railroad" || street.type === "street")) {
            streetNames.push(street);
        }
    });
    removeTemplateContents("#card-template article");
    streetNames.forEach(function (street) {
        renderStreets(street);
    });
}


/* fill in the template with the api results*/

function renderStreets(street) {
    const $template = document.querySelector('.card-template').content.firstElementChild.cloneNode(true);
    $template.querySelector('.name').classList.add(street.color);
    $template.querySelector('.name').innerText = street.name;
    $template.querySelector('.position').innerText = `Position: M${street.position}`;
    $template.querySelector('.cost').innerText = `Cost: M${street.cost}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: M${street.position}`;
    $template.querySelector('.rent').innerText = `Rent: M${street.position}`;
    $template.querySelector(`p`).innerText = checkIfBought(street);
    document.querySelector('#card-container').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function checkIfBought(street) {
    let boughtBy = "not bought yet";
    const playerProperties = loadFromStorage("playerProperties");
    for (const player in playerProperties) {
        if (player) {
            playerProperties[player].forEach(function (property) {
                if (property.name === street.name) {
                    boughtBy = `Bought by: ${player}`;
                }
            });
        }
    }
    return boughtBy;
}
