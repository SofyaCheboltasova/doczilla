CREATE TABLE Student (id SERIAL PRIMARY KEY,
																							name VARCHAR(255) NOT NULL,
																							surname VARCHAR(255) NOT NULL,
																							patronymic VARCHAR(255) NOT NULL,
																							birthdate DATE NOT NULL,
																							groupid INTEGER NOT NULL);