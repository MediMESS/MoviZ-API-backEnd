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

-- Remove tables
DELETE FROM Users WHERE id =
DELETE FROM Login WHERE id =

-- some examples to register in the App
INSERT INTO login (hash, email) VALUES
  ('AKFDLJAFDJLAFJLAFKL', 'abc@abc.com'), ('AKFDLJAFDJLAFJLAFKL', 'abc@abc.com'), ('AKFDLJAFDJLAFJLAFKL', 'abc@abc.com')
abc
abc@abc.com
1234

abc2
abc2@abc.com
4321
