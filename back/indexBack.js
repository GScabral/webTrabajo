// index.js
const expressApp = require('./src/app.js');
const { conn } = require('./src/db.js');
const http = require('http');
const { Server } = require('socket.io');
const initSuperAdmin = require("./src/utils/createAdmin")

const server = http.createServer(expressApp); // ⬅️ Usamos el servidor HTTP clásico
let onlineUsers = new Map();

// Configurar WebSocket con Socket.io
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3006",
            "https://webtrabajo-1.onrender.com"
        ],
        credentials: true,
        methods: ["GET", "POST"]
    }
});
// WebSocket: eventos
io.on("connection", (socket) => {
    // console.log("🔌 Usuario conectado:", socket.id);


    // 🔐 Recibir identificación del usuario al conectar
    socket.on("User-connected", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`🟢usuario ${userId} esta en linea`);


        // Notificar a todos los clientes quiénes están online
        io.emit("update-online-users", Array.from(onlineUsers.keys()));
    });

    socket.on("joinRoom", ({ userId, chatWith }) => {
        const roomId = [userId, chatWith].sort().join("-");
        socket.join(roomId);
        console.log(`🟢 Usuario ${userId} entró en sala ${roomId}`);
    });

    socket.on("sendMensaje", (mensaje) => {
        const roomId = [mensaje.emisor_id, mensaje.receptor_id].sort().join("-");
        io.to(roomId).emit("mensajeNuevo", mensaje);
        console.log(`📨 Mensaje enviado a sala ${roomId}`);
    });

    socket.on("disconnect", () => {
        // ❌ Buscar y eliminar al usuario desconectado
        for (const [userId, sockId] of onlineUsers.entries()) {
            if (sockId === socket.id) {
                onlineUsers.delete(userId);
                console.log("❌ Usuario desconectado:", socket.id);
                break;
            }
        }
        io.emit("update-online-users", Array.from(onlineUsers.keys()))
    });
    socket.on("user-disconnected", (userId) => {
        if (onlineUsers.has(userId)) {
            onlineUsers.delete(userId);
            console.log(`🔴 Usuario ${userId} cerró sesión manualmente`);
            io.emit("update-online-users", Array.from(onlineUsers.keys()));
        }
    });
});

// Base de datos + iniciar servidor
const PORT = process.env.PORT || 3001;

conn.sync({ alter: true }).then(async () => {
  // 👇 Crear admin al iniciar si no existe
  await initSuperAdmin();

  server.listen(PORT, () => {
    console.log(`🚀 Server + WebSocket corriendo en puerto ${PORT}`);
  });
});
