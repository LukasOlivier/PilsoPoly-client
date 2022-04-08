function getTiles(currentGameInfo) {
    fetchFromServer("/tiles", "GET")
        .then(tiles => {
            saveToStorage("tiles", tiles);
            renderCards(currentGameInfo);
        });
}
