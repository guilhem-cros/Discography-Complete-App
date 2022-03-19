const getArtists = "SELECT * FROM artists";
const getArtistByID = "SELECT * FROM artists WHERE id_artist = $1";
const createArtist = "INSERT INTO artists (name, other_names, genre) VALUES ($1, $2, $3)";
const updateArtist = "UPDATE artists SET name = $1, other_names = $2, genre = $3 WHERE id_artist = $4";
const deleteArtist = "DELETE FROM artists WHERE id_artist = $1";
const getAllAlbums = "SELECT * FROM albums WHERE artist=$1";

module.exports = {getArtists, getArtistByID, createArtist, updateArtist, deleteArtist, getAllAlbums};