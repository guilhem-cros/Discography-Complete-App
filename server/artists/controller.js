const queries = require("./queries");
const pool = require("../db");

//create a new artist in the db
async function createArtist(req, res){
    try{
        const artist = req.body;
        if(req.file !== undefined){
            const img = "artists/" + req.file.filename;
            const newArtist = await pool.query(queries.createArtist,
                [artist.name, artist.other_names , artist.genre, img]
            );
        }
        else{
            const newArtist = await pool.query(queries.createArtist,
                [artist.name, artist.other_names , artist.genre, null]
            );
        }
        res.status(201).send("Artist has been created");
    } catch (err){
        res.status(501).send({message : err.message});
    }
}

//get all artists in the db
async function getArtists(req, res){
    try{
        const allArtist = await pool.query(queries.getArtists);
        res.status(200).json(allArtist.rows);
    } catch (err){
        res.status(500).send({message : err.message});
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
        res.status(500).send({message : err.message});
    }
}

//update artist by id
async function updateArtist(req, res){
    try{
        const idArtist = req.params.id;
        const artist = req.body;
        if(req.file !== undefined){
            const img = "artists/" + req.file.filename;
            const updatedArtist = await pool.query(queries.updateArtist,
                [artist.name, artist.other_names , artist.genre, img, idArtist]
            );
        }
        else{
            const updatedArtist = await pool.query(queries.updateArtistButImg,
                [artist.name, artist.other_names , artist.genre, idArtist]
            );
        }
        res.status(200).send("Artist has been updated");
    } catch (err){
        res.status(500).send({message : err.message});
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
        res.status(500).send({message : err.message});
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
        res.status(500).send({message : err.message});
    }
}

async function getAlbumOn(req, res){
    try{
        const idArtist = req.params.id;
        const results = await pool.query(queries.getAlbumOn,
        [idArtist]
        );
        res.status(200).send(results.rows);
    } catch (err){
        res.status(500).send({message : err.message})
    }
}

async function searchArtist(req, res){
    try{
        const text = req.params.text;
        const artists = await pool.query(queries.searchArtist,
        [text+'%']
        );
        res.status(200).json(artists.rows);
    } catch(err){
        res.status(500).send({message : err.message});
    }
}




module.exports = {createArtist, getArtists, getArtistByID, updateArtist, deleteArtist, getArtistAlbums, getAlbumOn, searchArtist};