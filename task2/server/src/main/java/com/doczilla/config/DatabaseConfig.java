package com.doczilla.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseConfig {
    private static final String URL = "jdbc:postgresql://host.docker.internal:5432/doczillatask2";
    private static final String USER = "postgres";
    private static final String PASSWORD = "Sofya2002";

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("PostgreSQL Driver not found", e);
        }

        Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);

        String createTableSQL = "CREATE TABLE IF NOT EXISTS Student ("
                + "id SERIAL PRIMARY KEY, "
                + "name VARCHAR(255) NOT NULL, "
                + "surname VARCHAR(255) NOT NULL, "
                + "patronymic VARCHAR(255) NOT NULL, "
                + "birthdate DATE NOT NULL, "
                + "groupid INTEGER NOT NULL);";

        try (Statement stmt = connection.createStatement()) {
            stmt.execute(createTableSQL);
            System.out.println("Table 'Student' checked/created successfully!");
        } catch (SQLException e) {
            throw new SQLException("Error creating table 'Student'", e);
        }

        return connection;
    }
}
