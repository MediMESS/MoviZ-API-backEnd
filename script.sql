CREATE DATABASE Moviz;
\c moviz;
-- Drop tables
DROP TABLE Movies;
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
  id VARCHAR(10) PRIMARY KEY,
  id_user SERIAL REFERENCES users(id),
  title VARCHAR(50) NOT NULL,
  year INTEGER,
  rating REAL,
  url_picture TEXT DEFAULT '',
  state movizState
);
