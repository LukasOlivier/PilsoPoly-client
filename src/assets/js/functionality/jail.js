function getOutOfJailFree() {
    fetchFromServer(`/games/${loadFromStorage("gameId")}/prison/${_player.name}/free`,"POST")
        .then(() => {
            hideElement(document.querySelector("#get-out-of-jail-popup"))
        })
        .catch((error) => errorHandler(error))
}

function getOutOfJailFine(){
    fetchFromServer(`/games/${loadFromStorage("gameId")}/prison/${_player.name}/fine`,"POST")
        .then(() => {
            hideElement(document.querySelector("#get-out-of-jail-popup"))
        })
        .catch((error) => errorHandler(error))
}
