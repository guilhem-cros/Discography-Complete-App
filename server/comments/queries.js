const getComments = "SELECT * FROM comments";
const getAllComByAlbum = "SELECT * FROM comments WHERE album = $1";
const createComment = "INSERT INTO comments (author, content, album) VALUES ($1,$2, $3)";
const updateComment = "UPDATE comments SET author = $1, content = $2 WHERE id_comment = $3";
const deleteComment = "DELETE FROM comments WHERE id_comment = $1";
const getLastComsOfAlbum = "SELECT * FROM comments WHERE album = $1 ORDER BY id_comment DESC LIMIT 5"

module.exports = {getComments, getAllComByAlbum, createComment, updateComment, deleteComment, getLastComsOfAlbum};