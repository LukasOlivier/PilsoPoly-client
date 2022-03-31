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
    document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderSpecialCard(cardInfo, middle) {
    const $template = document.querySelector('main .special-card-template').content.firstElementChild.cloneNode(true);
    addClassToMiddle($template, middle);
    $template.querySelector("h3").innerText = cardInfo.name;
    document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderUtilityCard(cardInfo, middle) {
    const $template = document.querySelector('main .utility-card-template').content.firstElementChild.cloneNode(true);
    railUtilityTemplate($template, cardInfo, middle);
}

function renderRailroad(cardInfo, middle) {
    const $template = document.querySelector('main .railroad-card-template').content.firstElementChild.cloneNode(true);
    railUtilityTemplate($template, cardInfo, middle);
}

function railUtilityTemplate($template, cardInfo, middle) {
    addClassToMiddle($template, middle);
    $template.querySelector("h3").innerText = cardInfo.name;
    $template.querySelector('.price').innerText = `rent: M${cardInfo.cost}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: M${cardInfo.mortgage}`;
    document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function addClassToMiddle($template, middle) {
    if (middle) {
        $template.classList.add("middle");
    }
}