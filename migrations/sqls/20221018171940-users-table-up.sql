
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  userName VARCHAR(50) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);