const express = require("express");
const functions = require("./controller");
const { updateArtist } = require("./queries");
const app = express();

//create artist
app.post("/", functions.createArtist);

//get all artists
app.get("/", functions.getArtists);

//get artist by his id
app.get("/:id", functions.getArtistByID);

//update artist
app.put("/:id", functions.updateArtist);

//delete artist
app.delete("/:id", functions.deleteArtist);

module.exports = app;