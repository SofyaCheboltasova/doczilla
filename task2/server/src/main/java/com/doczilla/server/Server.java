package com.doczilla.server;

import com.doczilla.controller.StudentController;
import com.doczilla.repository.StudentRepository;
import com.doczilla.service.StudentService;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;

@SuppressWarnings("restriction")

public class Server {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);

        StudentRepository studentRepository = new StudentRepository();
        StudentService studentService = new StudentService(studentRepository);
        StudentController studentController = new StudentController(studentService);

        server.createContext("/students", studentController);

        server.setExecutor(null);
        System.out.println("Server is running on port " + 8000);
        server.start();
    }
}
