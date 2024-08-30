CREATE TABLE Student (id SERIAL PRIMARY KEY,
																							name VARCHAR(255) NOT NULL,
																							surname VARCHAR(255) NOT NULL,
																							patronymic VARCHAR(255) NOT NULL,
																							birthdate VARCHAR(30) NOT NULL,
																							groupid INTEGER NOT NULL);