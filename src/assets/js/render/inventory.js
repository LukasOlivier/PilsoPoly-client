_token = {token: loadFromStorage("token")};

function initInventory() {
    getGameState();
}

function clearCards(){
    document.querySelector("#cards").innerHTML = "";
}

function getGameState() {
    fetchFromServer(`/games/${_gameID}`, "GET")
        .then(currentGameInfo => {
            clearCards();
            updatePlayerProperties(currentGameInfo);
            addEventListeners();
            renderInventoryCards();
        });
}


function addEventListeners() {
    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains("errormessages")) {
            hideErrorPopup();
        }
    });
    document.querySelectorAll("#color-filter li").forEach(color => {
        color.addEventListener('click', filterCards);
    });
    document.querySelector("#mortgage").addEventListener('click', mortgage);
    document.querySelector("#unmortgage").addEventListener('click', unMortgage);
    document.querySelector("#buy").addEventListener('click', buyHouse);
    document.querySelector("#sell").addEventListener('click', sellHouse);
}

function checkIfMortgaged() {
    _playerProperties.forEach(property => {
        if (property.mortgage === true) {
            document.querySelector(`#${nameToId(property.property)}`).classList.add("mortgaged");
        }
    });
}

function renderInventoryCards() {
    loadFromStorage("tiles").forEach(tile => {
        if (loadFromStorage('inventory').includes(nameToId(tile.name))) {
            if (tile.type === "street") {
                renderStreet(tile);
            } else {
                renderRailroadUtility(tile);
            }
        }
    });
    checkIfMortgaged();
    renderHouses();
    document.querySelectorAll('article').forEach(card => card.addEventListener('click', selectCard));
}

function selectCard(e) {
    e.currentTarget.classList.toggle('selected');
}

function filterCards(e) {
    const filter = e.currentTarget.classList[0];
    document.querySelectorAll(".name").forEach(cardColor => {
        if (filter === "NONE") {
            document.querySelectorAll("article").forEach(card => {
                card.classList.remove("hidden");
            });
        } else if (cardColor.classList[1] !== filter) {
            cardColor.parentElement.classList.add("hidden");
        } else {
            cardColor.parentElement.classList.remove("hidden");
        }
    });
}

function renderStreet(tile) {
    const $template = document.querySelector('.street-template').content.firstElementChild.cloneNode(true);
    $template.id = nameToId(tile.name);
    $template.querySelector(".name").innerText = tile.name;
    $template.querySelector('.rent').innerText = `Rent: M${tile.rent}`;
    $template.querySelector('.rent-one-house').innerText = `M${tile.rentWithOneHouse}`;
    $template.querySelector('.rent-two-house').innerText = `M${tile.rentWithTwoHouses}`;
    $template.querySelector('.rent-three-house').innerText = `M${tile.rentWithThreeHouses}`;
    $template.querySelector('.rent-four-house').innerText = `M${tile.rentWithFourHouses}`;
    $template.querySelector('.rent-hotel').innerText = `M${tile.rentWithHotel}`;
    $template.querySelector('.price-house').innerText = `Price for house: M${tile.housePrice}`;

    $template.querySelector('.mortgage').innerText = `Mortgage: M${tile.mortgage}`;
    $template.querySelector('.name').classList.add(tile.color);
    document.querySelector('#cards').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderRailroadUtility(tile) {
    const $template = document.querySelector('.railroad-utility-template').content.firstElementChild.cloneNode(true);
    $template.id = nameToId(tile.name);
    $template.querySelector(".name").innerText = tile.name;
    $template.querySelector('.rent').innerText = `Rent: M${tile.rent}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: M${tile.mortgage}`;
    $template.querySelector('.name').classList.add(tile.color);
    const $icon = $template.querySelector('.card-icon');
    if (tile.type === "railroad") {
        $icon.src = `images/railroad.png`;
    } else if (tile.name.includes("Electric")) {
        $icon.src = `images/electric.png`;
    } else {
        $icon.src = `images/water.png`;
    }
    document.querySelector('#cards').insertAdjacentHTML("beforeend", $template.outerHTML);
}


function renderHouses() {
    _playerProperties.forEach(property => {
        const $currentCard = document.querySelector(`#${nameToId(property.property)}`);
        if (property.houseCount > 0) {
            $currentCard.querySelector(`li:nth-of-type(${property.houseCount}) img`).src = `images/${property.houseCount}houseBought.png`;
        }
        if (property.hotelCount > 0) {
            $currentCard.querySelector('li:nth-of-type(5) img').src = "images/hotelBought.png";
        }
    });
}

function mortgage() {
    document.querySelectorAll(".selected").forEach(card => {
        const cardName = card.querySelector("h3").innerText;
        fetchFromServer(`/games/${_gameID}/players/${loadFromStorage("name")}/properties/${cardName}/mortgage`, 'POST')
            .then(() => {
                card.classList.add("mortgaged");
                card.classList.remove("selected");

            }).catch(() => showErrorPopup("This tile is already mortgaged"));
    });
}


function unMortgage() {
    document.querySelectorAll(".selected").forEach(card => {
        const cardName = card.querySelector("h3").innerText;
        fetchFromServer(`/games/${_gameID}/players/${loadFromStorage("name")}/properties/${cardName}/mortgage`, 'DELETE')
            .then(() => {
                card.classList.remove("mortgaged");
                card.classList.remove("selected");

            })
            .catch(() => showErrorPopup("This tile is not mortgaged"));
    });
}

function buyHouse() {
    document.querySelectorAll(".selected").forEach(card => {
        const cardName = card.querySelector("h3").innerText;
        fetchFromServer(`/games/${_gameID}/players/${loadFromStorage("name")}/properties/${cardName}/houses`, 'POST')
            .then(() => {
                card.classList.remove("selected");
            })
            .catch(() => showErrorPopup("You can only place houses on full streets or need to improve other tiles firsts!"));
    });
}

function showErrorPopup(errorMessage) {
    document.querySelector(".errormessages").classList.remove("hidden");
    document.querySelector(".errormessages p").innerText = errorMessage;
}

function hideErrorPopup() {
    document.querySelector(".errormessages").classList.add("hidden");
}


function sellHouse() {
    document.querySelectorAll(".selected").forEach(card => {
        const cardName = card.querySelector("h3").innerText;
        fetchFromServer(`/games/${_gameID}/players/${loadFromStorage("name")}/properties/${cardName}/houses`, 'DELETE')
            .then(() => {
                card.classList.remove("selected");
            })
            .catch(() => showErrorPopup("You don't have houses or need to sell other first!"));
    });
}
