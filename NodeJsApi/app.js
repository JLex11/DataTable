const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { response } = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());

//mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cinemax",
});

//Route
app.get("/", (req, res) => {
    res.send("Welcome my api");
});

//Movies
app.get("/movies", (req, res) => {
    const sql = "SELECT * FROM pelicula";

    connection.query(sql, (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("Not result");
        }
    });
});

app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM pelicula WHERE idpelicula = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("Not result");
        }
    });
});

app.post("/add", (req, res) => {
    const sql = "INSERT INTO pelicula SET ?";

    const movieObj = {
        titulooriginal: capitalize(req.body.titulooriginal),
        titulolatino: capitalize(req.body.titulooriginal),
        foto: capitalize(req.body.foto),
        idtipo: capitalize(req.body.idtipo),
        idpais: capitalize(req.body.idpais),
        lanzamiento: capitalize(req.body.lanzamiento),
        duracion: capitalize(req.body.duracion),
        resena: capitalize(req.body.resena),
        estado: capitalize(req.body.estado),
    };

    connection.query(sql, movieObj, (error, results) => {
        if (error) throw error;

        res.send("Movie saved");
    });
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const movieObj = {
        titulooriginal: capitalize(req.body.titulooriginal),
        titulolatino: capitalize(req.body.titulooriginal),
        foto: capitalize(req.body.foto),
        idtipo: capitalize(req.body.idtipo),
        idpais: capitalize(req.body.idpais),
        lanzamiento: capitalize(req.body.lanzamiento),
        duracion: capitalize(req.body.duracion),
        resena: capitalize(req.body.resena),
        estado: capitalize(req.body.estado),
    };

    const sql = `UPDATE pelicula SET ? WHERE idpelicula = ${id}`;
    connection.query(sql, movieObj, (error, results) => {
        if (error) throw error;

        res.send("Movie update");
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE pelicula SET estado = 'F' WHERE idpelicula = ${id}`;
    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.send("Movie dropped");
    });
});

//Check connect
connection.connect((err) => {
    if (err) throw err;
    console.log("Database server is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
