const express = require("express");
const functions = require("./controller");
const app = express();

//create a song and his feats
app.post("/", functions.createSong);

//get all songs
app.get("/", functions.getAllSongs);

//get songs of an album
app.get("/onAlbum/:idAlbum", functions.getSongsOfAlbum);

//get a song by ID
app.get("/:id", functions.getSongByID);

//update a song and his feats
app.put("/:id", functions.updateSong);

//delete a song
app.delete("/:id", functions.deleteSong);

app.get('/feats/:id', functions.getFeats);

module.exports = app;