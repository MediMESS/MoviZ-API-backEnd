CREATE DATABASE moviz

-- list all databases
\l
-- switch database
\c moviz
-- list all tables
\dt

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

postgresqlpassword
\c moviz
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

-- Remove tables
DELETE FROM Users Where id = 4;
DELETE FROM Login Where id = 4;
DELETE FROM Login WHERE id =

-- some examples to register in the App
INSERT INTO login (hash, email) VALUES
  ('AKFDLJAFDJLAFJLAFKL', 'abc@abc.com');
abc
abc@abc.com
1234

abc2
4321
abc2@abc.com
id: 'ttttttt15',
  id_user: 1,
  title: 'Joker',
  year: 2019,
  rating: 8.8,
  url_picture:
   'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
  state: 'liked'
INSERT INTO movies VALUES('ttttt5', 1, 'Joker', 2019, 8.8, 'http://ww.pic.com', 'liked');
INSERT INTO movies VALUES('ttttt4', 2, 'Joker', 2019, 8.8, 'http://ww.pic.com', 'liked');
<a href='http://localhost:3000/' style={{ fontSize: '100px'}}>you've signed LOG OUT!</a>
