const queries = require("./queries");
const pool = require("../db");

//create an album
async function createAlbum(req, res){
    try{
        const album  = req.body;
        if(req.file !== undefined){
            const img = 'albums/' + req.file.filename;
            const newArtist = await pool.query(queries.createAlbum,
                [album.title, album.release, album.artist, img]
            );
        }
        else{
            const newAlbum = await pool.query(queries.createAlbum,
            [album.title, album.release, album.artist, null]
            );
        }
        res.status(201).send("Album has been created");
    } catch (err){
        console.error(err.message);
    }
}

//get all albums
async function getAlbums(req, res){
    try{
        const allAlbums = await pool.query(queries.getAlbums);
        res.status(200).json(allAlbums.rows);
    } catch (err){
        console.error(err.message);
    }
}

//get album by his id
async function getAlbumById(req, res){
    try{
        const idAlbum = req.params.id;
        const album = await pool.query(queries.getAlbumById,
        [idAlbum]
        );
        res.status(200).json(album.rows[0]);
    } catch (err){
        console.error(err.message)
    }
}

//update an album
async function updateAlbum(req, res){
    try{
        const idAlbum = req.params.id;
        const album = req.body;
        if(req.file!==undefined){
            img = "albums/" + req.file.filename;
            const updatedArtist = await pool.query(queries.updateAlbum,
                [album.title, album.release, album.artist, img, idAlbum])
        }
        else{
            const updatedAlbum = await pool.query(queries.updateAlbumButCover,
            [album.title, album.release , album.artist, idAlbum]
            );
        }
        res.status(200).send("Album has been updated");
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
        res.status(200).send("Album has been deleted");
    } catch (err){
        console.error(err.message);
    }
}

module.exports = {createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum}