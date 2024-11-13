import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'front')));

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'front/index.html'));
});

io.on('connection', (socket) => {
    console.log('[INFO] New user connected');

    socket.on('data', (message: string) => {
        console.log(`[MESSAGE] ${message}`);
        socket.broadcast.emit('data', message);
    });

    socket.on('new_user', (name: string) => {
        console.log(`[INFO] New user: ${name}`);
        socket.broadcast.emit('user_connect', `${name} joined the chat`);
    });

    socket.on('disconnect', () => {
        console.log('[INFO] User disconnected');
    });
});

httpServer.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
