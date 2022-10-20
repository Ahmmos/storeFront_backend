CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id bigint NOT NULL REFERENCES products(id),
    order_id bigint NOT NULL REFERENCES orders(id)
    
);
