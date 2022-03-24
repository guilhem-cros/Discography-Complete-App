const express = require("express");
const functions = require("./controller");
const app = express();
const multer = require('multer');
const res = require("express/lib/response");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./images/albums/");
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

//create album
app.post("/", upload.single("albumCover"), functions.createAlbum);

//get all albums in db
app.get("/", functions.getAlbums);

//get an album by is
app.get("/:id", functions.getAlbumById)

//update album
app.put("/:id",upload.single('albumCover'), functions.updateAlbum);

//delete album
app.delete("/:id", functions.deleteAlbum);

//search an album
app.get('/search/:text', functions.searchAlbum);

module.exports = app;
