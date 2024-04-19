drop table eccommerce_app.product;
drop table eccommerce_app.coupons;
drop schema eccommerce_app;

create schema eccommerce_app;

create table eccommerce_app.product (
    id_product integer primary key,
    description text,
    price numeric
);

insert into eccommerce_app.product (id_product, description, price) values (1, 'A', 1000);
insert into eccommerce_app.product (id_product, description, price) values (2, 'B', 5000);
insert into eccommerce_app.product (id_product, description, price) values (3, 'C', 30);

create table eccommerce_app.coupons (
    code text primary key,
    percentage numeric
);

insert into eccommerce_app.coupons (code, percentage) values ('VALE20', 20);