import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://proactive-be-production.up.railway.app";

export const socket: Socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ['websocket', 'polling'],
});

export function connectSocket() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    socket.auth = token ? { token, userId } : { userId };

    if (!socket.connected) {
        socket.connect();
    }
}
