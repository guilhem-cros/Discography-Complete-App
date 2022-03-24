const queries = require("./queries");
const pool = require("../db");

//create a comment
async function createComment(req, res){
    try{
        const comment  = req.body;
        const newCom = await pool.query(queries.createComment,
        [comment.author, comment.content, comment.album]
        );
        res.status(201).send("Comment has been created");
    } catch (err){
        res.status(501).send({message : err.message});
    }
}

//get all comments by album
async function getCommentsByAlbum(req, res){
    try{
        const idAlbum = req.params.idAlbum;
        const comments = await pool.query(queries.getAllComByAlbum,
        [idAlbum]
        );
        res.status(200).json(comments.rows);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//get all comments
async function getAllComments(req, res){
    try{
        const allComments = await pool.query(queries.getComments);
        res.status(200).json(allComments.rows);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//update a comment
async function updateComment(req, res){
    try{
        const idComment = req.params.id;
        const comment = req.body;
        const updatedComment = await pool.query(queries.updateComment,
        [comment.author, comment.content, idComment]
        );
        res.status(200).send("Comment has been updated");
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//delete a comment
async function deleteComment(req, res){
    try{
        const idComment = req.params.id;
        const deletedComment = await pool.query(queries.deleteComment,
        [idComment]
        );
        res.status(200).send("Comment has been deleted");
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

//return the 5 last comments of an album
async function getLastComments(req, res){
    try{
        const idAlbum = req.params.id;
        const comments = await pool.query(queries.getLastComsOfAlbum,
            [idAlbum]
        );
        res.status(200).json(comments.rows);
    } catch (err){
        res.status(500).send({message : err.message});
    }
}

module.exports = {createComment, getCommentsByAlbum, getAllComments, updateComment, deleteComment, getLastComments};