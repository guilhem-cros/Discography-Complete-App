const getArtists = "SELECT * FROM artists";
const getArtistByID = "SELECT * FROM artists WHERE id_artist = $1";
const createArtist = "INSERT INTO artists (name, other_names, genre, image) VALUES ($1, $2, $3, $4)";
const updateArtist = "UPDATE artists SET name = $1, other_names = $2, genre = $3, image = $4 WHERE id_artist = $5";
const updateArtistButImg = "UPDATE artists SET name = $1, other_names = $2, genre = $3 WHERE id_artist = $4";
const deleteArtist = "DELETE FROM artists WHERE id_artist = $1";
const getAllAlbums = "SELECT * FROM albums WHERE artist=$1";

module.exports = {getArtists, getArtistByID, createArtist, updateArtist, deleteArtist, getAllAlbums, updateArtistButImg};