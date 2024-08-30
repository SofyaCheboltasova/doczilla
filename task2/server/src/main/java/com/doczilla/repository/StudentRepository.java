package com.doczilla.repository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.doczilla.config.DatabaseConfig;
import com.doczilla.model.Student;

public class StudentRepository {
    public List<Student> getStudents() {
        String query = "SELECT * FROM students ORDER BY id";
        try (java.sql.Connection connection = DatabaseConfig.getConnection();
                java.sql.PreparedStatement preparedStatement = connection.prepareStatement(query);
                java.sql.ResultSet resultSet = preparedStatement.executeQuery()) {

            List<Student> students = new ArrayList<>();
            while (resultSet.next()) {
                Student student = new Student();
                student.setId(resultSet.getInt("id"));
                student.setName(resultSet.getString("name"));
                student.setSurname(resultSet.getString("surname"));
                student.setPatronomyc(resultSet.getString("patronomyc"));
                student.setBirthdate(resultSet.getDate("birthdate"));
                student.setGroup(resultSet.getInt("group"));
                students.add(student);
            }
            return students;
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteStudent(int id) {
        String query = "DELETE FROM students WHERE id = ?";

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
        String query = "INSERT INTO students (name, surname, patronomyc, birthdate, group) VALUES (?, ?, ?, ?, ?)";

        try (java.sql.Connection connection = DatabaseConfig.getConnection();
                java.sql.PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getSurname());
            preparedStatement.setString(3, student.getPatronomyc());
            preparedStatement.setDate(4, student.getBirthdate());
            preparedStatement.setInt(5, student.getGroup());
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
