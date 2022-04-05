"use strict";


function renderNormalCard(cardInfo, middle) {
    const $template = document.querySelector('main .normal-card-template').content.firstElementChild.cloneNode(true);
    addClassToMiddle($template, middle);
    $template.querySelector("h3").innerText = cardInfo.name;
    $template.querySelector('p:first-of-type').innerText = `rent: M${cardInfo.rent}`;
    $template.querySelector('.rent-one-house').innerText = `M${cardInfo.rentWithOneHouse}`;
    $template.querySelector('.rent-two-house').innerText = `M${cardInfo.rentWithTwoHouses}`;
    $template.querySelector('.rent-three-house').innerText = `M${cardInfo.rentWithThreeHouses}`;
    $template.querySelector('.rent-four-house').innerText = `M${cardInfo.rentWithFourHouses}`;
    $template.querySelector('.rent-hotel').innerText = `M${cardInfo.rentWithHotel}`;
    $template.querySelector('.price-house').innerText = `Price for house: M${cardInfo.housePrice}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: M${cardInfo.mortgage}`;
    $template.querySelector('.card-name').classList.add(cardInfo.color);
    $template.id = `${nameToId(cardInfo.name)}`;
    $template.querySelector('.price').innerText = `M${cardInfo.cost}`;
    _$containers["cardsParent"].insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderSpecialCard(cardInfo, middle) {
    const $template = document.querySelector('main .special-card-template').content.firstElementChild.cloneNode(true);
    addClassToMiddle($template, middle);
    $template.id = `${nameToId(cardInfo.name)}`;

    switch (cardInfo.type.toLowerCase()) {
        case "go":
            $template.querySelector("img").src = "images/go.png";
            break;
        case "community chest":
            $template.querySelector("img").src = "images/chest.gif";
            break;
        case "chance":
            $template.querySelector("img").src = "images/chance.png";
            break;
        case "luxury tax":
            $template.querySelector("img").src = "images/luxTax.png";
            break;
        case "free parking":
            $template.querySelector("img").src = "images/parking.png";
            break;
        case "jail":
            $template.querySelector("img").src = "images/jail.png";
            $template.style.background = "rgb(240,124,28)";
            break;
        case "go to jail":
            $template.querySelector("img").src = "images/police.png";
            break;
        case "tax income":
            $template.querySelector("img").src = "images/incomeTax.png";
            break;
        default:
            return;
    }
    _$containers["cardsParent"].insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderUtilityCard(cardInfo, middle) {
    const $template = document.querySelector('main .utility-card-template').content.firstElementChild.cloneNode(true);
    utilityAndRailroadTemplate($template, cardInfo, middle);
}

function renderRailroad(cardInfo, middle) {
    const $template = document.querySelector('main .railroad-card-template').content.firstElementChild.cloneNode(true);
    utilityAndRailroadTemplate($template, cardInfo, middle);
}


function utilityAndRailroadTemplate($template, cardInfo, middle) {
    addClassToMiddle($template, middle);
    const $icon = $template.querySelector('.card-icon');
    $template.querySelector("h3").innerText = cardInfo.name;
    $template.querySelector('.mortgage').innerText = `Mortgage: M${cardInfo.mortgage}`;
    $template.querySelector('.price').innerText = `M${cardInfo.cost}`;
    if (cardInfo.name.includes("RR")) {
        $icon.src = `images/railroad.png`;
    } else if (cardInfo.name.includes("Electric")) {
        $icon.src = `images/electric.jpg`;
    } else {
        $icon.src = `images/water.png`;
    }
    $template.id = `${nameToId(cardInfo.name)}`;
    _$containers["cardsParent"].insertAdjacentHTML("beforeend", $template.outerHTML);
}


function addClassToMiddle($template, middle) {
    if (middle) {
        $template.classList.add("middle");
    }
}
