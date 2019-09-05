CREATE DATABASE bank_employees IF NOT EXISTS;

USE bank_employees;

CREATE TABLE tokens (
	username VARCHAR(40) NOT NULL,
	user_hash VARCHAR(150) NOT NULL,
	created_by VARCHAR(40),
	PRIMARY KEY (username)
);

