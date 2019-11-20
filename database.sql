CREATE DATABASE moviz

-- list all databases
\l
-- switch database
\c moviz
-- list all tables
\dt

-- Drop tables
DROP TABLE Users;
DROP TABLE Login;

-- create table users
CREATE TABLE Users (
  id serial PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  url_profile_picture TEXT DEFAULT '',
  favorite_movie VARCHAR(50) NOT NULL,
  city VARCHAR(20) DEFAULT '',
  country VARCHAR(20) DEFAULT '',
  joined TIMESTAMP NOT NULL
);

CREATE TABLE Login (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(100) NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TYPE movizState AS ENUM ('liked', 'recommended');
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  id_user SERIAL REFERENCES users(id),
  title VARCHAR(50) NOT NULL,
  year INTEGER,
  rating REAL,
  url_picture TEXT DEFAULT '',
  state movizState
);

-- Remove tables
DELETE FROM Users Where first_name = 'a';
DELETE FROM Login WHERE id =

-- some examples to register in the App
INSERT INTO login (hash, email) VALUES
  ('AKFDLJAFDJLAFJLAFKL', 'abc@abc.com');
abc
abc@abc.com
1234

abc2
abc2@abc.com
4321

<a href='http://localhost:3000/' style={{ fontSize: '100px'}}>you've signed LOG OUT!</a>
