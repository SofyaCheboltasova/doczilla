package com.doczilla.server;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

@SuppressWarnings("restriction")

public class Server {
    public static void main(String[] args) throws IOException {
        File fileDir = new File("client/dist");

        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/", new FileHandler(fileDir));
        server.setExecutor(null);
        System.out.println("Server is running on port " + 8000);
        server.start();
    }

    static class FileHandler implements HttpHandler {
        private final File directory;

        public FileHandler(File directory) {
            this.directory = directory;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String requestURI = exchange.getRequestURI().getPath();
            File file = new File(directory, requestURI.equals("/") ? "index.html" : requestURI);

            if (file.exists() && !file.isDirectory()) {
                try (FileInputStream fis = new FileInputStream(file)) {
                    exchange.sendResponseHeaders(200, file.length());
                    OutputStream os = exchange.getResponseBody();
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = fis.read(buffer)) != -1) {
                        os.write(buffer, 0, bytesRead);
                    }
                    os.close();
                }
            } else {
                String response = "404 Not Found";
                exchange.sendResponseHeaders(404, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
    }
}
