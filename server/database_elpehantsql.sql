CREATE TABLE lineitems (
	ID SERIAL PRIMARY KEY,
	budgetID integer NOT NULL,
	description VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL,
	expAmount FLOAT NOT NULL,
	actAmount FLOAT NOT NULL,
	isFixed BOOLEAN NOT NULL,
	isRecurring BOOLEAN NOT NULL,
	isActive BOOLEAN NOT NULL DEFAULT true,
	FOREIGN KEY (budgetID) REFERENCES budgets (ID)
);


CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	pwHashed VARCHAR(255) NOT NULL
);


CREATE TABLE budgets (
	ID SERIAL PRIMARY KEY,
	userID INTEGER NOT NULL,
	title VARCHAR(255) NOT NULL,
	budget INTEGER NOT NULL,
	isActive BOOLEAN NOT NULL DEFAULT true,
	FOREIGN KEY (userID) REFERENCES users(ID)
);


INSERT INTO users (username, firstName, lastName, email, pwHashed)
VALUES('JBradbeer', 'Jake', 'Bradbeer', 'jake@gmail.com', '1234'),
('aallison', 'Adam', 'Allison', 'adam@gmail.com', '1234');