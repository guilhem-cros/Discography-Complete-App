const express = require("express");
const functions = require("./controller");
const app = express();

//create a comment
app.post("/", functions.createComment);

//get all the comments linked to an album
app.get("/:idAlbum", functions.getCommentsByAlbum);

//get all comments of the db
app.get("/", functions.getAllComments);

//update a comment
app.put("/:id", functions.updateComment);

//delete a comment
app.delete("/:id", functions.deleteComment);

//get last five comments of an album
app.get("/last/:id", functions.getLastComments);

module.exports = app;