-- psql -d eccommerce_app -U app
-- \i /docker-entrypoint-initdb.d/create.sql

drop table eccommerce_app.product;
drop table eccommerce_app.coupons;
drop table eccommerce_app.order;
drop table eccommerce_app.item;
drop schema eccommerce_app;

create schema eccommerce_app;

create table eccommerce_app.product (
    id_product integer primary key,
    description text,
    price numeric,
    width integer,
    height integer,
    length integer,
    weight numeric,
    currency text
);

insert into eccommerce_app.product (id_product, description, price, width, height, length, weight, currency) values (1, 'A', 1000, 100, 30, 10, 3, 'BRL');
insert into eccommerce_app.product (id_product, description, price, width, height, length, weight, currency) values (2, 'B', 5000, 50, 50, 50, 22, 'BRL');
insert into eccommerce_app.product (id_product, description, price, width, height, length, weight, currency) values (3, 'C', 30, 10, 10, 10, 0.9, 'BRL');
insert into eccommerce_app.product (id_product, description, price, width, height, length, weight, currency) values (4, 'D', 100, 100, 30, 10, 3, 'USD');

create table eccommerce_app.coupons (
    code text primary key,
    percentage numeric,
    expire_date timestamp
);

insert into eccommerce_app.coupons (code, percentage, expire_date) values ('VALE20', 20, '2024-04-30');
insert into eccommerce_app.coupons (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2024-03-30');

create table eccommerce_app.order (
    id_order serial primary key,
    coupon_code text,
    coupon_percentage numeric,
    code text,
    cpf text,
    email text,
    issue_date timestamp,
    freight numeric,
    total numeric,
    sequence integer
);

create table eccommerce_app.item (
    id_order integer references eccommerce_app.order (id_order),
    id_product integer references eccommerce_app.product (id_product),
    price numeric,
    quantity integer,
    primary key (id_order, id_product)
);