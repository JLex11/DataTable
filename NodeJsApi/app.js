const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

console.log("process", process.env.PORT);
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());

//mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Cinemax'
});

//Check connect
connection.connect(err => {
    if (err) throw err;
    console.log('Database server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));