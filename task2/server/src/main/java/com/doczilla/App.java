package com.doczilla;

import java.io.IOException;

import com.doczilla.server.Server;

public final class App {
    public static void main(String[] args) {
        try {
            Server.main(args);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
