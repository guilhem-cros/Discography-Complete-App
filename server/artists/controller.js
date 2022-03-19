const queries = require("./queries");
const pool = require("../db");

//create a new artist in the db
async function createArtist(req, res){
    try{
        const artist = req.body;
        const newArtist = await pool.query(queries.createArtist,
        [artist.name, artist.other_names, artist.genre]
        );
        res.status(201).send("Artist has been created");
    } catch (err){
        console.error(err.message);
    }
}

//get all artists in the db
async function getArtists(req, res){
    try{
        const allArtist = await pool.query(queries.getArtists);
        res.status(200).json(allArtist.rows);
    } catch (err){
        console.error(err.message);
    }
}

//get artist by id
async function getArtistByID(req, res){
    try{
        const idArtist = req.params.id;
        const artist = await pool.query(queries.getArtistByID,
        [idArtist]
        );
        res.status(200).json(artist.rows[0]);
    } catch (err){
        console.error(err.message)
    }
}

//update artist by id
async function updateArtist(req, res){
    try{
        const idArtist = req.params.id;
        const artist = req.body;
        const updatedArtist = await pool.query(queries.updateArtist,
        [artist.name, artist.other_names , artist.genre, idArtist]
        );
        res.status(200).send("Artist has been updated");
    } catch (err){
        console.error(err.message);
    }
}

//delete artist by id
async function deleteArtist(req, res){
    try{
        const idArtist = req.params.id;
        const deletedArtist = await pool.query(queries.deleteArtist,
        [idArtist]
        );
        res.status(200).send("Artist has been deleted");
    } catch (err){
        console.error(err.message);
    }
}

//get all the albums of an artist
async function getArtistAlbums(req, res){
    try{
        const idArtist = req.params.id;
        const albums = await pool.query(queries.getAllAlbums,
        [idArtist]
        );
        res.status(200).json(albums.rows);
    } catch (err){
        console.error(err.message);
    }
}



module.exports = {createArtist, getArtists, getArtistByID, updateArtist, deleteArtist, getArtistAlbums};