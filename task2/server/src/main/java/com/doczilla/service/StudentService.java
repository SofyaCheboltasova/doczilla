package com.doczilla.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.doczilla.model.Student;
import com.doczilla.repository.StudentRepository;

public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getStudents() {
        return repository.getStudents();
    }

    public void deleteStudent(int id) throws SQLException {
        repository.deleteStudent(id);
    }

    public Student postStudent(Student student) throws SQLException {
        repository.postStudent(student);
        List<Student> students = getStudents();
        return students.get(students.size() - 1);
    }

    public List<Map<String, Object>> getStudentSchema() throws SQLException {
        return repository.getSchema();
    }
}
