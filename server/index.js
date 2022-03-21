const express = require("express");
const app = express();
const cors = require("cors");

const genreRoutes = require("./genres/routes");
const artistRoutes = require("./artists/routes");
const albumRoutes = require("./albums/routes");
const commentRoutes = require("./comments/routes");
const songRoutes = require("./songs/routes");

app.use(cors());
app.use(express.json());
app.use(express.static('images'))

app.use("/genres", genreRoutes)
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/comments", commentRoutes);
app.use("/songs", songRoutes);

app.listen(5000, ()=>{
    console.log("Server has started on port 5000");
})