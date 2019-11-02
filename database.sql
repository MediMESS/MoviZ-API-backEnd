CREATE DATABASE moviz

-- list all databases
\l
-- switch database
\c moviz
-- list all tables
\dt


-- create table users
CREATE TABLE Users (
  id serial PRIMARY KEY,
  name VARCHAR(50),
  last_name VARCHAR(50),
  email TEXT UNIQUE NOT NULL,
  joined TIMESTAMP NOT NULL
);

CREATE TABLE Login (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(100) NOT NULL,
  email TEXT UNIQUE NOT NULL
);
