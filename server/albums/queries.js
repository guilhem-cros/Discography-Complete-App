const getAlbums = "SELECT * FROM albums";
const getAlbumById = "SELECT * FROM albums WHERE id_album = $1";
const createAlbum = "INSERT INTO albums (title, release, artist, cover) VALUES ($1, $2, $3, $4) RETURNING *;";
const updateAlbum = "UPDATE albums SET title = $1, release = $2, artist = $3, cover = $4 WHERE id_album = $5";
const deleteAlbum = "DELETE FROM albums WHERE id_album = $1";
const updateAlbumButCover = "UPDATE albums SET title = $1, release = $2, artist = $3 WHERE id_album = $4";
const searchAlbum = "SELECT * FROM albums JOIN artists on albums.artist = artists.id_artist WHERE LOWER(title) LIKE LOWER($1)"

module.exports = {getAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, updateAlbumButCover, searchAlbum};