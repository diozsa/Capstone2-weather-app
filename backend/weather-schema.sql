CREATE TABLE users (
  username VARCHAR(30) PRIMARY KEY,
  password TEXT NOT NULL
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  location TEXT NOT NULL,
  username VARCHAR(30)
    REFERENCES users ON DELETE CASCADE
);