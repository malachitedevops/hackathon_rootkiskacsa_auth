CREATE DATABASE IF NOT EXISTS bank_employees;

USE bank_employees;

CREATE TABLE IF NOT EXISTS tokens (
	username VARCHAR(40) NOT NULL,
	user_hash VARCHAR(150) NOT NULL,
	created_by VARCHAR(40),
	PRIMARY KEY (username)
);

