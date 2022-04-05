"use strict";

/*load the dom in and then start function init*/
document.addEventListener('DOMContentLoaded', init);

/*fetch the streets and the players. if player puts input into the form go to function search*/
function init() {
    const streetNames = [];
    _token = {token: loadFromStorage("token")};
    _gameID = loadFromStorage("gameId");
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
    removeTemplate("#card-container article");
    tiles.forEach(street => {
        if (street.name.toLowerCase().includes(sort) && (street.type === "utility" || street.type === "railroad" || street.type === "street")) {
            streetNames.push(street);
        }
    });
    removeTemplate("#card-template article");
    streetNames.forEach(function (street) {
        renderStreets(street);
    });
}


/* fill in the template with the api results*/

//TODO : make other function to create the template.
function renderStreets(street) {
    let isBought = false;
    const $template = document.querySelector('.card-template').content.firstElementChild.cloneNode(true);
    $template.querySelector('.name').classList.add(street.color);
    $template.querySelector('.name').innerText = street.name;
    $template.querySelector('.position').innerText = `Position: M${street.position}`;
    $template.querySelector('.cost').innerText = `Cost: M${street.cost}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: M${street.position}`;
    $template.querySelector('.rent').innerText = `Rent: M${street.position}`;
    const playerProperties = loadFromStorage("playerProperties");
    for (const player in playerProperties) {
        if (player) {
            playerProperties[player].forEach(function (property) {
                if (property.name === street.name) {
                    isBought = true;
                    $template.querySelector(`p`).innerText = "player: " + player;
                }
            });
            if (isBought === false) {
                $template.querySelector(`p`).innerText = "not bought yet";
            }
        }
    }
    document.querySelector('#card-container').insertAdjacentHTML("beforeend", $template.outerHTML);
}
