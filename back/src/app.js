const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./routes/routesIndex.js');

require('dotenv').config();

const app = express();
app.name = "BACKEND";

// Orígenes permitidos para CORS
const allowedOrigins = [
  "http://localhost:3006",              // desarrollo local
  "https://webtrabajo-1.onrender.com"   // frontend en Render
];

// Middlewares
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// CORS para rutas HTTP normales
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

app.use('/', routes);

// Manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err);
  res.status(status).send(message);
});

// Crear servidor HTTP y configurar Socket.IO con CORS
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

// Eventos de Socket.IO
io.on("connection", (socket) => {
  console.log("🔌 Usuario conectado:", socket.id);

  socket.on("User-connected", (userId) => {
    console.log("Usuario conectado con ID:", userId);
    // Lógica de usuarios online aquí
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Exporta server para usarlo en indexBack.js
module.exports = server;