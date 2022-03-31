"use strict";

function renderNormalCard(cardInfo, middle) {
    const $template = document.querySelector('main .normal-card-template').content.firstElementChild.cloneNode(true);
    addClassToMiddle($template, middle);
    $template.querySelector("h3").innerText = cardInfo.name;
    $template.querySelector('p:first-of-type').innerText = `rent: ${cardInfo.rent}`;
    $template.querySelector('.rent-one-house').innerText = `Rent with one house: ${cardInfo.rentWithOneHouse}`;
    $template.querySelector('.rent-two-house').innerText = `Rent with two houses: ${cardInfo.rentWithTwoHouses}`;
    $template.querySelector('.rent-three-house').innerText = `Rent with three houses: ${cardInfo.rentWithThreeHouses}`;
    $template.querySelector('.rent-four-house').innerText = `Rent with four houses: ${cardInfo.rentWithFourHouses}`;
    $template.querySelector('.price-house').innerText = `Price for house: ${cardInfo.housePrice}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: ${cardInfo.mortgage}`;
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
    $template.querySelector('.price').innerText = `rent: ${cardInfo.cost}`;
    $template.querySelector('.mortgage').innerText = `Mortgage: ${cardInfo.mortgage}`;
    document.querySelector('#cards-parent').insertAdjacentHTML("beforeend", $template.outerHTML);
}

function addClassToMiddle($template, middle) {
    if (middle) {
        $template.classList.add("middle");
    }
}