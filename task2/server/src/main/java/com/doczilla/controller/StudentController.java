package com.doczilla.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import com.google.gson.Gson;
import com.doczilla.model.Student;
import com.doczilla.service.StudentService;

@SuppressWarnings("restriction")
public class StudentController implements HttpHandler {
    private static final Gson gson = new Gson();;
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);

        String path = exchange.getRequestURI().getPath();

        if ("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        if (path.equals("/students") && "GET".equals(exchange.getRequestMethod())) {
            handleGet(exchange);
        } else if (path.equals("/students") && "DELETE".equals(exchange.getRequestMethod())) {
            handleDelete(exchange);
        } else if (path.equals("/students") && "POST".equals(exchange.getRequestMethod())) {
            System.out.println("handle post");
            handlePost(exchange);
        } else if (path.equals("/students/schema") && "GET".equals(exchange.getRequestMethod())) {
            try {
                handleGetSchema(exchange);
            } catch (IOException | SQLException e) {
                exchange.sendResponseHeaders(404, -1);
            }
        } else {
            exchange.sendResponseHeaders(404, -1);
        }
    }

    private void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
    }

    protected void handleGet(HttpExchange exchange) throws IOException {
        List<Student> students = this.studentService.getStudents();
        String response = gson.toJson(students);

        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, response.getBytes().length);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    protected void handleDelete(HttpExchange exchange) throws IOException {
        try {
            Student student = gson.fromJson(new InputStreamReader(exchange.getRequestBody()), Student.class);
            studentService.deleteStudent(student.getId());
            exchange.sendResponseHeaders(200, -1);
        } catch (SQLException e) {
            exchange.sendResponseHeaders(404, -1);
        }
    }

    protected void handlePost(HttpExchange exchange) throws IOException {
        InputStream requestBodyStream = exchange.getRequestBody();
        @SuppressWarnings("resource")
        String requestBody = new BufferedReader(new InputStreamReader(requestBodyStream))
                .lines()
                .collect(Collectors.joining("\n"));

        System.out.println("Request Body: " + requestBody);

        try {
            Student student = gson.fromJson(requestBody, Student.class);
            System.out.println("controller:" + student);

            studentService.postStudent(student);
            exchange.sendResponseHeaders(201, -1);
        } catch (SQLException e) {
            System.out.println("handle post error");

            exchange.sendResponseHeaders(400, -1);
        }
    }

    protected void handleGetSchema(HttpExchange exchange) throws IOException, SQLException {
        List<Map<String, Object>> schema = this.studentService.getStudentSchema();
        String response = gson.toJson(schema);

        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, response.getBytes().length);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}
