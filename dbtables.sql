drop table if exists users;

create table users (
    id serial not null primary key,
    name varchar(40) not null,
    counter int not null
);