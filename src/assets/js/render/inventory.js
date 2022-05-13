function initInventory() {
    _token = {token: loadFromStorage("token")};
    fetchFromServer(`/tiles`, 'GET')
        .then(gameInfo => {
            renderInventoryCards(gameInfo);
        });
    document.querySelectorAll("aside li").forEach(color => color.addEventListener('click', filterCards));
}

function renderInventoryCards(gameInfo) {
    gameInfo.forEach(tile => {
        if (loadFromStorage('inventory').includes(tile.name)) {
            if (tile.type === "street") {
                renderStreet(tile);
            } else {
                renderRailroadUtility(tile);
            }
        }
    });
    fetchFromServer(`/games/${_gameID}`, 'GET')
        .then(gameInfo => {
            renderHouses(gameInfo.players);
        });
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
        }
        else if (cardColor.classList[1] !== filter) {
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
    if (tile.name.includes("RR")) {
        $icon.src = `images/railroad.png`;
    } else if (tile.name.includes("Electric")) {
        $icon.src = `images/electric.png`;
    } else {
        $icon.src = `images/water.png`;
    }
    document.querySelector('#cards').insertAdjacentHTML("beforeend", $template.outerHTML);
}


function renderHouses(players) {
    players.forEach(player => {
        if (player.name === loadFromStorage('name')) {
            player.properties.forEach(property => {
                const $currentCard = document.querySelector(`#${nameToId(property.property)}`);
                if ($currentCard.houses > 0) {
                    $currentCard.querySelector('.houses').src = `${property.houseCount}`.houses.png;
                }
                if ($currentCard.houses > 0) {
                    $currentCard.querySelector('.houses').src = "images/hotelBought.png";
                }
            });
        }
    });
}

