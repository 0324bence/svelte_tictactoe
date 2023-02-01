import type { Handle } from "@sveltejs/kit";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import { env } from "$env/dynamic/private";

export const handle = (async ({ event, resolve }) => {
    return await resolve(event);
}) satisfies Handle;

const PORT = 8050;
const ORIGIN = env.ORIGIN || "http://localhost:3000";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [ORIGIN, "http://localhost:3000", "http://localhost:3000"]
    },
    allowEIO3: true
});

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
    socket.on("name", () => {
        socket.emit("name", username);
    });
});

console.log("SocketIO injected");

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
