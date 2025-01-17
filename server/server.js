const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const PORT = 4000;


app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));


app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500',
    }
});

let users = 0;
let usernames = [];
const userInfo = [];


io.on('connection', (socket) => {
    users++;

    console.log(usernames);


    socket.emit('test', 'hello');

    socket.on('delete-acc', accName => {
        usernames = usernames.filter(obj => obj.nm !== accName);
        console.log(usernames);
    })

    socket.on('request-accounts', () => {
        socket.emit('launch-accounts', usernames);
    })

    socket.emit('num-users', users);

    socket.on('send-acc', user => {
        usernames.push(user);
    })

    socket.on('disconnect', () => {
        users--;
    });
});

