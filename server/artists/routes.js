const express = require("express");
const functions = require("./controller");
const app = express();
const multer = require('multer');
const res = require("express/lib/response");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./images/artists/");
    },
    filename: function(req, file, cb){
        date = new Date().getTime();
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
            cb(null, (date + '.jpg'))
        }
        else if(file.mimetype === 'image/png'){
            cb(null, (date + '.png'))
        }
    }
});

const fileFilter = (req, file, cb) => {

    //reject a type of file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer(
    {storage : storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter: fileFilter
});

//create artist
app.post("/", upload.single('artistImage'), functions.createArtist);

//get all artists
app.get("/", functions.getArtists);

//get artist by his id
app.get("/:id", functions.getArtistByID);

//update artist
app.put("/:id", upload.single('artistImage'), functions.updateArtist);

//delete artist
app.delete("/:id", functions.deleteArtist);

//get artist's albums
app.get("/albums/:id", functions.getArtistAlbums);

module.exports = app;