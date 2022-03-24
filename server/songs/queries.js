const getSongs = "SELECT * FROM songs";
const getSongById = "SELECT * FROM songs WHERE id_song = $1";
const getSongsOfAlbum = "SELECT * FROM songs WHERE album = $1";
const createSong = "INSERT INTO songs (song_title, album) VALUES ($1, $2) RETURNING *";
const addFeaturing = "INSERT INTO featurings (song, f_artist) VALUES ($1, $2)";
const updateSong = "UPDATE songs SET song_title = $1, album = $2 WHERE id_song = $3";
const removeFeaturing = "DELETE FROM featurings WHERE song = $1";
const deleteSong = "DELETE FROM songs WHERE id_song = $1";
const getFeaturing = "SELECT artists.name, artists.id_artist FROM featurings JOIN artists ON featurings.f_artist=artists.id_artist WHERE song = $1"
const searchSong = "SELECT * FROM songs WHERE LOWER(song_title) LIKE LOWER($1)"

module.exports = {getSongs, getSongById, getSongsOfAlbum, createSong, addFeaturing, updateSong, removeFeaturing, deleteSong, getFeaturing, searchSong};