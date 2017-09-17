SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS recipeitems;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE ingredients(
  name         VARCHAR(255) NOT NULL,
  type         VARCHAR(255),
  description  VARCHAR(255),
  percentage   VARCHAR(255),
  primary key (name)
);

CREATE TABLE recipes(
  name         VARCHAR(255) NOT NULL,
  description  VARCHAR(255),
  primary key(name)
);

CREATE TABLE recipeitems(
  id           INTEGER NOT NULL AUTO_INCREMENT,
  amount       VARCHAR (255) NOT NULL,
  ingredient   VARCHAR (255) NOT NULL,
  recipe       VARCHAR (255) NOT NULL,
  primary key (id),
  foreign key (ingredient) references ingredients(name),
  foreign key (recipe) references recipes(name)
);


INSERT INTO ingredients(name, percentage) values
  ('Vatten', '0%'),
  ('Vodka', '40%'),
  ('Sourz', '17%'),
  ('Redbull', '0%'),
  ('Blue Carbarananull', '27%'),
  ('Gin', '40%'),
  ('Tonic', '0%'),
  ('Tranbärsjuice', '0%'),
  ('Lemonade', '0,7%');

INSERT INTO recipes(name) values
  ('P2'),
  ('Cosmopolitan'),
  ('Galaxy'),
  ('Gin and Tonic'),
  ('Red Bull Vodka');

INSERT INTO recipeitems(amount, ingredient, recipe) values
  ('50cl', 'Redbull', 'Red Bull Vodka'),
  ('5cl', 'Vodka', 'Red Bull Vodka'),
  ('60cl', 'Tonic', 'Gin and Tonic'),
  ('6cl', 'Gin', 'Gin and Tonic');
