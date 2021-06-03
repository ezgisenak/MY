CREATE DATABASE app_database;
--\c into app_database
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255)
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    order_name VARCHAR(255),
    user_id BIGINT REFERENCES users (user_id),
    product_id BIGINT REFERENCES products (product_id) 
);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(255), 
    product_count NUMERIC NOT NULL
);
--products eklenecek, CRUD'ın hepsi yazılacak
--join : order için user ve products birleştir
--controller orderını yap MVC