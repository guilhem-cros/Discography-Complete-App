const queries = require("./queries");
const pool = require("../db");

//create an album
async function createAlbum(req, res){
    try{
        const album  = req.body;
        const newAlbum = await pool.query(queries.createAlbum,
        [album.title, album.release, album.artist]
        );
        res.json("Album has been created");
    } catch (err){
        console.error(err.message);
    }
}

//get all albums
async function getAlbums(req, res){
    try{
        const allAlbums = await pool.query(queries.getAlbums);
        res.json(allAlbums.rows);
    } catch (err){
        console.error(err.message);
    }
}

//get album by his is
async function getAlbumById(req, res){
    try{
        const idAlbum = req.params.id;
        const album = await pool.query(queries.getAlbumById,
        [idAlbum]
        );
        res.json(album.rows[0]);
    } catch (err){
        console.error(err.message)
    }
}

//update an album
async function updateAlbum(req, res){
    try{
        const idAlbum = req.params.id;
        const album = req.body;
        const updatedAlbum = await pool.query(queries.updateAlbum,
        [album.title, album.release , album.artist, idAlbum]
        );
        res.json("Album has been updated");
    } catch (err){
        console.error(err.message);
    }
}

//delete an album
async function deleteAlbum(req, res){
    try{
        const idAlbum = req.params.id;
        const deletedAlbum = await pool.query(queries.deleteAlbum,
        [idAlbum]
        );
        res.json("Album has been deleted");
    } catch (err){
        console.error(err.message);
    }
}

module.exports = {createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum}