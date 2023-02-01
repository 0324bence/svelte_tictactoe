import ioClient from "socket.io-client";
import { PUBLIC_SOCKET_ORIGIN } from "$env/static/public";
const SOCKET = PUBLIC_SOCKET_ORIGIN || "http://localhost:8050";
const ENDPOINT = SOCKET;

const socket = ioClient(ENDPOINT);

socket.on("connect_error", err => {
    console.log(`connect_error due to ${err.message}`);
});

export default socket;
