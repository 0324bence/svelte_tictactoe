import ioClient from "socket.io-client";
import { env } from "$env/dynamic/public";
const SOCKET = env.PUBLIC_SOCKET_ORIGIN || "http://localhost:8050";
const ENDPOINT = SOCKET;

const socket = ioClient(ENDPOINT);

socket.on("connect_error", err => {
    console.log(`connect_error due to ${err.message}`);
});

export default socket;
