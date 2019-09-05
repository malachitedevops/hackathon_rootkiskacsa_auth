'use strict';

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('view'));
app.use(express.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

require('dotenv').config();
const mysql = require('mysql');
const sha512 = require('js-sha512');
const cors = require('cors');

const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

conn.connect(err => {
	if (err) {
		res.status(500).send('Error connecting to database!');
		return;
	} else {
		console.log('Connection to DB is OK!');
	}
});

app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, index.html));
});

app.post('/createuser', (req, res) => {
	getHash(req.body.creatorname, req.body.creatorpass)
		.then(hash => checkHash(hash, req.body.creatorname, req.body.creatorpass))
		.then(data => createUser(req.body.newusername, req.body.newuserpass, req.body.creatorname))
		.then(data => res.status(200).send())
		.catch(err => {
			res.status(500).send(err)
		})
});

function getHash(creatorName, creatorPass) {
	return new Promise((resolve, reject) => {
		conn.query(`SELECT user_hash FROM tokens WHERE username=?;`, [creatorName], (err, hash) => {
			if (err) {
				reject(err);
			} else {
				resolve(hash[0].user_hash);
			}
		});
	});
}

function checkHash(hash, creatorName, creatorPass) {
	return new Promise((resolve, reject) => {
		if (sha512(`${creatorName}${creatorPass}`) !== hash) {
			reject('Error');
		} else {
			resolve();
		}
	});
}

function createUser(username, password, creatorName) {
	return new Promise((resolve, reject) => {
		conn.query(`INSERT INTO tokens (username, user_hash, created_by) VALUES (?, ?, ?);`, [username, sha512(`${username}${password}`), creatorName], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}!`);
});
