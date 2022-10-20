CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id integer NOT NULL REFERENCES users(id)
);


