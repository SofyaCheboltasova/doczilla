package com.doczilla.repository;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.doczilla.config.DatabaseConfig;
import com.doczilla.model.Student;

public class StudentRepository {
    public List<Student> getStudents() {
        String query = "SELECT id, name, surname, patronymic, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate, groupid FROM student ORDER BY id";
        try (Connection connection = DatabaseConfig.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(query);
                ResultSet resultSet = preparedStatement.executeQuery()) {

            List<Student> students = new ArrayList<>();

            while (resultSet.next()) {
                Student student = new Student();
                student.setId(resultSet.getInt("id"));
                student.setName(resultSet.getString("name"));
                student.setSurname(resultSet.getString("surname"));
                student.setPatronymic(resultSet.getString("patronymic"));
                String birthdateString = resultSet.getString("birthdate");
                student.setBirthdate(birthdateString);

                student.setGroup(resultSet.getInt("groupid"));
                students.add(student);
            }
            return students;
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving students from database: " + e.getMessage(), e);
        }
    }

    public void deleteStudent(int id) {
        String query = "DELETE FROM student WHERE id = ?";

        try (java.sql.Connection connection = DatabaseConfig.getConnection();
                java.sql.PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected == 0) {
                throw new RuntimeException("Student with " + id + " wasn't found");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void postStudent(Student student) {
        String query = "INSERT INTO student (name, surname, patronymic, birthdate, groupid) VALUES (?, ?, ?, ?, ?)";
        try (java.sql.Connection connection = DatabaseConfig.getConnection();
                java.sql.PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getSurname());
            preparedStatement.setString(3, student.getPatronymic());

            String birthdateString = student.getBirthdate();
            Date sqlDate = Date.valueOf(birthdateString);
            preparedStatement.setDate(4, sqlDate);

            preparedStatement.setInt(5, student.getGroup());
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            System.out.println("repo err:" + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Map<String, Object>> getSchema() {
        List<Map<String, Object>> columns = new ArrayList<>();
        String tableName = "student";

        try (java.sql.Connection connection = DatabaseConfig.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet resultSet = metaData.getColumns(null, null, tableName, null);

            while (resultSet.next()) {
                Map<String, Object> columnInfo = new HashMap<>();
                columnInfo.put("columnName", resultSet.getString("COLUMN_NAME"));
                columnInfo.put("columnType", resultSet.getString("TYPE_NAME"));
                columnInfo.put("columnSize", resultSet.getInt("COLUMN_SIZE"));
                columnInfo.put("isNullable", resultSet.getInt("NULLABLE") == DatabaseMetaData.columnNullable);
                columns.add(columnInfo);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
        return columns;
    }
}
