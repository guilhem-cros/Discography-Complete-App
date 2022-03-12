const express = require("express");
const functions = require("./controller");
const app = express();

//create genre
app.post("/", functions.createGenre);

//get all genres
app.get("/", functions.getGenres);

//get name of a genre by id
app.get("/:id", functions.getGenre);

//put genre
app.put("/:id", functions.updateGenre)

//delete genre
app.delete("/:id", functions.deleteGenre);


module.exports = app