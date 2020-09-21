CREATE TABLE restaurant (
    id serial PRIMARY KEY,
    name text NOT NULL,
    distance integer,
    stars integer,
    category text,
    favorite_dish text,
    takeout boolean,
    ate_last timestamp
);

CREATE TABLE reviewer (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email varchar,
    karma int CHECK (karma <= 7)
);

CREATE TABLE review (
    id serial PRIMARY KEY,
    reviewer_id int,
    restaurant_id int,
    stars int CHECK (stars <= 5) NOT NULL,
    title text,
    review text,
    FOREIGN KEY (reviewer_id) REFERENCES reviewer (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
);

create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500)
);
