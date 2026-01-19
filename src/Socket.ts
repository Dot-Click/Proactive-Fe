import { io, Socket } from "socket.io-client";

// Use localhost for development, production URL for production
const SOCKET_URL = import.meta.env.DEV 
  ? "http://localhost:3000" // Adjust port if your backend uses different port
  : "https://proactive-be-production.up.railway.app";

export const socket: Socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    timeout: 20000,
    forceNew: false,
});

// Connection state tracking
let isConnecting = false;
let connectionPromise: Promise<void> | null = null;

export function connectSocket(): Promise<void> {
    // Return existing promise if already connecting
    if (isConnecting && connectionPromise) {
        return connectionPromise;
    }

    // Return resolved promise if already connected
    if (socket.connected) {
        return Promise.resolve();
    }

    isConnecting = true;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    socket.auth = token ? { token, userId } : { userId };

    connectionPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
            isConnecting = false;
            connectionPromise = null;
            reject(new Error('Socket connection timeout'));
        }, 20000); // 20 second timeout

        const onConnect = () => {
            clearTimeout(timeout);
            isConnecting = false;
            connectionPromise = null;
            socket.off('connect', onConnect);
            socket.off('connect_error', onError);
            resolve();
        };

        const onError = (error: Error) => {
            clearTimeout(timeout);
            isConnecting = false;
            connectionPromise = null;
            socket.off('connect', onConnect);
            socket.off('connect_error', onError);
            console.error('Socket connection error:', error);
            // Still resolve to allow app to work without socket (messages will be sent via API only)
            resolve();
        };

        socket.once('connect', onConnect);
        socket.once('connect_error', onError);

        if (!socket.connected) {
            socket.connect();
        } else {
            clearTimeout(timeout);
            isConnecting = false;
            connectionPromise = null;
            socket.off('connect', onConnect);
            socket.off('connect_error', onError);
            resolve();
        }
    });

    return connectionPromise;
}

// Helper function to wait for socket connection
export async function waitForSocketConnection(): Promise<boolean> {
    if (socket.connected) {
        return true;
    }

    try {
        await connectSocket();
        return socket.connected;
    } catch (error) {
        console.error('Failed to connect socket:', error);
        return false;
    }
}
