'use strict';

function checkExistingGames(){
    const $joinInterface = document.querySelector("#join-interface");
    const id = $joinInterface.querySelector("#ID").value;
    const name = {
        playerName: $joinInterface.querySelector(".name").value.toLowerCase()
    };
    // these checks dont see errors from the server
    // we can change this when we make our own api server.
    document.querySelector(".errormessages p").innerText = "";
    fetchFromServer(`/games?prefix=${id}`)
        .then(response => {
            console.log("checking");
            if (response.length === 0) {
                throw new Error("There is no game with this code");
            } else if (response.length > 1) {
                throw new Error("Please fill in your code correctly");
            } else if (response[0].started === true) {
                throw new Error("Game already started");
            }
            response[0].players.forEach(player => {
                if (player.name.toLowerCase() === name.playerName.toLowerCase()) {
                    throw new Error("The name is already in use");
                }
            });
            if (name.playerName === "") {
                throw new Error("Your player name cant be empty");
            }
            joinGame(id, name);
        })
        .catch(errorHandler);
}

function joinGame(id, name){
    console.log("posting to server");
//    fetchFromServer(`/games/${id}/players`,'POST', name)
//        .then(response => {
//            _token = response.token;
//            console.log(_token);
//            loadGameDataForLobby(id, name);
//        })
        // this token is your security token.
//        .catch(errorHandler);
    loadGameDataForLobby(id, name);
}
