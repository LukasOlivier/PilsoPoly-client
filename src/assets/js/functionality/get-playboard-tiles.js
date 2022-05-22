function getTiles() {
    fetchFromServer("/tiles", "GET")
        .then(tiles => {
            saveToStorage("tiles", tiles);
        });
}
