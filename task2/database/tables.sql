CREATE TABLE Student ( id SERIAL PRIMARY KEY,
																							name VARCHAR(255) NOT NULL,
																							surname VARCHAR(255) NOT NULL,
																							patronomic VARCHAR(255) NOT NULL,
																							birthdate DATE NOT NULL,
																							group_id INTEGER NOT NULL);