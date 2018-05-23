-- create restaurants table
CREATE TABLE
IF NOT EXISTS restaurants
(
  id SERIAL PRIMARY KEY,
  name varchar
(255)
);
-- create users table
CREATE TABLE
IF NOT EXISTS users
(
  id SERIAL PRIMARY KEY,
  last_name varchar
(255),
  first_name varchar
(255),
  email varchar
(255),
  password varchar
(255)
);
-- create days table
CREATE TABLE
IF NOT EXISTS days
(
  id SERIAL PRIMARY KEY,
  day VARCHAR
(255)
);
-- create openingtime
CREATE TABLE
IF NOT EXISTS openingtime
(
  restaurant_id INTEGER REFERENCES restaurants
(id),
  day_id INTEGER REFERENCES days
(id),
  start_time time NOT NULL,
  end_time time NOT NULL
);
-- create friendlist table
CREATE TABLE
IF NOT EXISTS friendlist
(
  user_id INTEGER REFERENCES users
(id),
  friend_id INTEGER REFERENCES users
(id)
);
-- create collections table
CREATE TABLE
IF NOT EXISTS collections
(
  id SERIAL PRIMARY KEY,
  collection_name VARCHAR
(255),
  user_id INTEGER REFERENCES users
(id)
);
-- create collection details table
CREATE TABLE
IF NOT EXISTS collectiondetails
(
  collection_id INTEGER REFERENCES collections
(id),
  restaurant_id INTEGER REFERENCES restaurants
(id)
);




