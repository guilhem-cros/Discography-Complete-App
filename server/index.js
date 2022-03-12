const express = require("express");
const app = express();
const cors = require("cors");

const genreRoutes = require("./genres/routes");
const artistRoutes = require("./artists/routes");
const albumRoutes = require("./albums/routes");

app.use(cors());
app.use(express.json());

app.use("/genres", genreRoutes)
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);

app.listen(5000, ()=>{
    console.log("Server has started on port 5000");
})