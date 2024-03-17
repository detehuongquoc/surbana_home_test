CREATE EXTENSION IF NOT EXISTS ltree;
CREATE TABLE IF NOT EXISTS Location (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    location_number VARCHAR(20) NOT NULL,
    area DECIMAL(10, 3) NOT NULL,
    parent_location ltree
);