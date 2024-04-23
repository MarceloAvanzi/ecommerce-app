-- psql -d eccommerce_app -U app
-- \i /docker-entrypoint-initdb.d/create.sql

drop table eccommerce_app.product;
drop table eccommerce_app.coupons;
drop schema eccommerce_app;

create schema eccommerce_app;

create table eccommerce_app.product (
    id_product integer primary key,
    description text,
    price numeric,
    width integer,
    height integer,
    length integer,
    weight numeric
);

insert into eccommerce_app.product (id_product, description, price, width, height, length, weight) values (1, 'A', 1000, 100, 30, 10, 3);
insert into eccommerce_app.product (id_product, description, price, width, height, length, weight) values (2, 'B', 5000, 50, 50, 50, 22);
insert into eccommerce_app.product (id_product, description, price, width, height, length, weight) values (3, 'C', 30, 10, 10, 10, 0.9);

create table eccommerce_app.coupons (
    code text primary key,
    percentage numeric,
    expire_date timestamp
);

insert into eccommerce_app.coupons (code, percentage, expire_date) values ('VALE20', 20, '2024-04-30');
insert into eccommerce_app.coupons (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2024-03-30');