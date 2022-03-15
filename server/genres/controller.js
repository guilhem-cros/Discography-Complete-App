const queries = require("./queries");
const pool = require("../db");

//create a new genre in the db
async function createGenre(req, res){
    try{
        const genre  = req.body;
        const newGenre = await pool.query(queries.createGenre,
        [genre.name, genre.description]
        );
        res.status(201).send("Genre has been created");
    } catch (err){
        console.error(err.message);
    }
}

//get all genres in the db
async function getGenres(req, res){
    try{
        const allGenres = await pool.query(queries.getGenres);
        res.status(200).json(allGenres.rows);
    } catch (err){
        console.error(err.message);
    }
}

//get a genre by ID
async function getGenre(req, res){
    try{
        const idGenre = req.params.id;
        const genre = await pool.query(queries.getGenreName,
        [idGenre]
        );
        res.status(200).json(genre.rows[0]);
    } catch (err){
        console.error(err.message)
    }
}

//update a genre
async function updateGenre(req, res){
    try{
        const idGenre = req.params.id;
        const genre = req.body;
        const updatedGenre = await pool.query(queries.updateGenre,
        [genre.name, genre.description , idGenre]
        );
        res.status(200).send("Genre has been updated")
    } catch (err){
        console.error(err.message)
    }
}

//delete the genre by this id in the db
async function deleteGenre(req, res){
    try{
        const genreID = req.params.id;
        const deletedGenre = await pool.query(queries.deleteGenre,
        [genreID]
        );
        res.status(200).send("Genre has been deleted");
    } catch (err){
        console.error(err.message);
    }
}

module.exports = {createGenre, getGenres, getGenre, updateGenre, deleteGenre};