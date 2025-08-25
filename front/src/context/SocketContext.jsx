// src/context/SocketContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ infoUser, children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!infoUser?.id) return;

        const newSocket = io("http://localhost:3001", {
            transports: ["websocket"],
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            newSocket.emit("User-connected", infoUser.id);
        });

        newSocket.on("update-online-users", (usuariosOnline) => {
            setOnlineUsers(usuariosOnline);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [infoUser]);


    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
