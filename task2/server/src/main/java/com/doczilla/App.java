package com.doczilla;

import java.io.IOException;

import com.doczilla.server.Server;

/**
 * Hello world!
 */
public final class App {
    private App() {
    }

    /**
     * Says hello to the world.
     *
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {
        try {
            Server.main(args);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
