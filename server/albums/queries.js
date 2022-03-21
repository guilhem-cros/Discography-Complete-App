const getAlbums = "SELECT * FROM albums";
const getAlbumById = "SELECT * FROM albums WHERE id_album = $1";
const createAlbum = "INSERT INTO albums (title, release, artist) VALUES ($1, $2, $3)";
const updateAlbum = "UPDATE albums SET title = $1, release = $2, artist = $3, cover = $4 WHERE id_album = $5";
const deleteAlbum = "DELETE FROM albums WHERE id_album = $1";
const updateAlbumButCover = "UPDATE albums SET title = $1, release = $2, artist = $3 WHERE id_album = $4";

module.exports = {getAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, updateAlbumButCover};