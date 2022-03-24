const queries = require("./queries");
const pool = require("../db");

//create a song and add featurings linked to it
async function createSong(req, res){
    try{
        const song = req.body;
        const newSong = await pool.query(queries.createSong,
        [song.title, song.album]
        );
        for(artist of song.feats){
            const newFeat = await pool.query(queries.addFeaturing,
            [newSong.rows[0].id_song, artist]
            );
        }
        res.status(201).send("Song and feats created");
    } catch (err){
        res.status(501).send({message : err.message});
    }
}

//get all songs
async function getAllSongs(req, res){
    try{
        const allSongs = await pool.query(queries.getSongs);
        res.status(200).json(allSongs.rows);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//get all the songs on a same album
async function getSongsOfAlbum(req, res){
    try{
        const idAlbum = req.params.idAlbum;
        const songs = await pool.query(queries.getSongsOfAlbum,
        [idAlbum]
        );
        res.status(200).json(songs.rows);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//get a song by his id
async function getSongByID(req, res){
    try{
        const idSong = req.params.id;
        const song = await pool.query(queries.getSongById,
        [idSong]
        );
        res.status(200).json(song.rows[0]);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//update a song and feats
async function updateSong(req, res){
    try{
        const idSong = req.params.id;
        const song = req.body;
        const updatedSong = await pool.query(queries.updateSong,
        [song.title, song.album, idSong]
        );
        await pool.query(queries.removeFeaturing, [idSong]);
        for(artist of song.feats){
            const newFeat = await pool.query(queries.addFeaturing,
            [idSong, artist]
            );
        }
        res.status(200).send("Song has been updated");
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//delete a song
async function deleteSong(req, res){
    try{
        const idSong = req.params.id;
        const deletedSong = await pool.query(queries.deleteSong,
        [idSong]
        );
        res.status(200).send("Song has been deleted");
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

async function getFeats(req, res){
    try{
        const idSong = req.params.id;
        const feats = await pool.query(queries.getFeaturing,
            [idSong]
        );
        res.status(200).json(feats.rows);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

module.exports = {createSong, getAllSongs, getSongsOfAlbum, getSongByID, updateSong, deleteSong, getFeats};