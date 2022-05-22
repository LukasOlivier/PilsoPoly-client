"use strict";

function move(value) {
    _viewPosition = keepInRangeOfBoard(_viewPosition - value);
    removeTemplateContents("#cards-parent article");
    showCardsByPosition(_viewPosition);
}

function keepInRangeOfBoard(position){
    const amountOfTilesOnBoard = 40;
    return (position + amountOfTilesOnBoard) % amountOfTilesOnBoard;
}

function wheelEvent(e) {
    if (e.deltaY < 0) {
        moveRight();
    } else {
        moveLeft();
    }
}

function keyPressEvent(e) {
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
