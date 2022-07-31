import express, { Application } from 'express';
import { Server } from 'socket.io';
import { app as firebaseApp } from './firebase';
import http from 'http';
import { verifyWithToken } from './auth';
import { cachingUser } from './middleware';
import Redis from 'ioredis';
const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
const redis = new Redis();

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const decodedToken = await verifyWithToken(token);
    io.use(() => {
        cachingUser(decodedToken);
        next();
    });
    next();
});

server.listen(8080, () => {
    console.log('running node');
});
