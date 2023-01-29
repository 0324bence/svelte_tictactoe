import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { Server } from "socket.io";

const config: UserConfig = {
    plugins: [
        sveltekit()
        /* {
            name: "sveltekit-socket-io",
            configureServer(server) {
                if (!server.httpServer) return;
                const io = new Server(server.httpServer);

                io.on("connection", socket => {
                    // Generate a random username and send it to the client to display it
                    let username = `User ${Math.round(Math.random() * 999999)}`;
                    socket.emit("name", username);
                    console.log("connection");

                    // Receive incoming messages and broadcast them
                    socket.on("message", message => {
                        console.log("message");
                        io.emit("message", {
                            from: username,
                            message: message,
                            time: new Date().toLocaleString()
                        });
                    });
                });

                console.log("SocketIO injected");
            }
        } */
    ],
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
    publicDir: "./public"
};

export default config;
