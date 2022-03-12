const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password : "ouistiti1",
    host : "localhost",
    port : "5432",
    database : "Projet-Web"
});

module.exports  = pool;