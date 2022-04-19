"use strict";


function move(value) {
    const $button = document.querySelector("#back-to-current-position button");
    if ($button.classList.contains("hidden")) {
        $button.classList.toggle("hidden");
        $button.id = loadFromStorage("name");
    }
    _tempPlayerPositionID -= value;

    if (_tempPlayerPositionID === 40) {
        _tempPlayerPositionID = 0;
    }

    if (_tempPlayerPositionID === -1) {
        _tempPlayerPositionID = 39;
    }

    removeTemplateContents("#cards-parent article");
    getCardById(_tempPlayerPositionID);
}

function wheelEvent(e) {
    if (e.deltaY < 0) {
        moveRight();
    } else {
        moveLeft();
    }
}

function keyPressEvent(e){
    // a and q for move left for the fellow qwerty users..
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') {
        moveLeft();
    }
}

function moveLeft() {
    move(1);
}

function moveRight() {
    move(-1);
}