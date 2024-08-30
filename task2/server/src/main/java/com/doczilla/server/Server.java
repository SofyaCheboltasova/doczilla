package com.doczilla.server;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;

@SuppressWarnings("restriction")

public class Server {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.setExecutor(null);
        System.out.println("Server is running on port " + 8000);
        server.start();
    }
}
