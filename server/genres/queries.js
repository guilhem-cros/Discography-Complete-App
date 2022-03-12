const getGenres = "SELECT * FROM genres";
const getGenreName = "SELECT * FROM genres WHERE id_genre = $1";
const createGenre = "INSERT INTO genres (genre, description) VALUES ($1, $2)";
const updateGenre = "UPDATE genres SET genre = $1, description = $2 WHERE id_genre = $3";
const deleteGenre = "DELETE FROM genres WHERE id_genre = $1";

module.exports = { getGenres, getGenreName, createGenre, updateGenre, deleteGenre};