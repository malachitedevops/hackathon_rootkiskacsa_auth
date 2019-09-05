'use strict';

const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();
const mysql = require('mysql');
const sha512 = require('js-sha512');
const cors = require('cors');

const conn = mysql.createConnection({
	host: process.enc.DB_HOST,
	user: process.enc.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

conn.connect(err => {
	if (err) {
		res.status(500).send('Error connecting to database!');
		return;
	} else {
		res.status(200);
	}
});

app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, index.html));
});

app.post('/createuser', (req, res) => {
	getHash(req.body.creatorname, req.body.creatorpass)
		.then(hash => {
			if (hash !== sha512(`${req.body.creatorname}${req.body.creatorpass}`)) {
				res.status(403).json({
					"message": "Unauthorized access!"
				});
			} else {
				createUser(req.body.newusername, req.body.newuserpass)
			}
		})
});

function getHash(creatorName, creatorPass) {
	return new Promise((resolve, reject) => {
		conn.query(`SELECT user_hash FROM bank_employees WHERE username=?;`, [req.body.creatorname], (err, hash) => {
			if (err) {
				reject(err);
			} else {
				resolve(hash[0]);
			}
		});
	});
}

function createUser(username, password) {
	return new Promise((resolve, reject) => {
		conn.query(`INSERT INTO tokens(username, user_hash, created_by) VALUES(?, ?, ?);`, [req.body.newusername, sha512(${req.body.newusername}${req.body.password}), req.body.creatorname], (err) => {
			if (err)
				reject(err);
			else
				resolve();
		});
	});
}
