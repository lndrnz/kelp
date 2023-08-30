create table products (
    id int,
    name varchar(50),
    price int,
    on_sale boolean
);

alter table products add column featured boolean;
alter table products drop column featured

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    LOCATION VARCHAR(50) NOT NULL,
    price_range INT NOT NULL, CHECK(price_range >= 1 and price_range <= 5)
);
