CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email text NOT NULL
);

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title text NOT NULL,
	author text NOT NULL,
	genre text NULL,
	rating smallint NULL,
	subject text NULL,
	setting text NULL,
	time_period text NULL,
	language text NOT NULL
);

CREATE TABLE shelves (
	book_id integer REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
	shelf text NOT NULL CHECK (shelf in ('read', 'want', 'current', 'dnf', 'burn')),
	Primary key (book_id, user_id)
);

CREATE TABLE notes (
	book_id integer REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
	notes text NOT NULL,
	PRIMARY KEY (book_id, user_id)
);


ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE shelves
DROP CONSTRAINT shelf_check;

ALTER TABLE books
ADD ISBN char(13) NULL UNIQUE;

ALTER TABLE shelves
DROP CONSTRAINT shelves_pkey;

ALTER TABLE shelves
ADD CONSTRAINT shelves_pkey PRIMARY KEY (user_id);


-- dummy data
INSERT INTO users (email) VALUES ('oddell@gmail.com');
INSERT INTO users (email) VALUES ('maggie@gmail.com');
INSERT INTO users (email) VALUES ('mechial@gmail.com');
INSERT INTO users (email) VALUES ('kate@gmail.com');
INSERT INTO users (email) VALUES ('rusmel@gmail.com');

INSERT INTO books (title, author, genre, rating, language) VALUES ('Byzantium', 'Stephen Lawhead', 'Historical Fiction', 5, 'English');
INSERT INTO books (title, author, genre, rating, language) VALUES ('Patrick', 'Stephen Lawhead', 'Historical Fiction', 5, 'English');
INSERT INTO books (title, author, genre, rating, language) VALUES ('O Alquimista', 'Paulo Coelho', 'Fiction', 4, 'Portuguese');
INSERT INTO books (title, author, genre, rating, language) VALUES ('Cracking the Coding Interview', 'Gayle Laakmann McDowell', 'Self Help', 3.5, 'English');

INSERT INTO shelves (book_id, user_id, shelf) VALUES (1, 1, 'read');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (1, 2, 'read');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (1, 4, 'want');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (2, 1, 'dnf');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (3, 1, 'burn');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (2, 3, 'current');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (4, 3, 'read');
INSERT INTO shelves (book_id, user_id, shelf) VALUES (4, 1, 'want');

INSERT INTO books (title, author, genre, rating, subject, setting, time_period, language) 
VALUES ('The Hobbit', 'J.R.R. Tolkein', 'Fantasy', '5', 'triology', 'Middle-earth', 'Never', 'English')
WHERE shelf = 'want' AND user_id = '1';

INSERT INTO notes (book_id, user_id, notes) VALUES ('1', '1', 'this is another note');
