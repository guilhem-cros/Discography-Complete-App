const express = require("express");
const functions = require("./controller");
const app = express();

//create album
app.post("/", functions.createAlbum);

//get all albums in db
app.get("/", functions.getAlbums);

//get an album by is
app.get("/:id", functions.getAlbumById)

//update album
app.put("/:id", functions.updateAlbum);

//delete album
app.delete("/:id", functions.deleteAlbum);

module.exports = app;
