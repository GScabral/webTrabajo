const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path');
const routes = require('./routes/routesIndex.js');

require('dotenv');


const server = express();
server.name = "BACKEND";

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
const allowedOrigins = [
    "http://localhost:3006",              // 👈 para desarrollo local
    "https://webtrabajo-1.onrender.com"   // 👈 dominio de tu frontend en Render
];

server.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

server.use('/', routes)


server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);
    res.status(status).send(message)
})


module.exports = server;
