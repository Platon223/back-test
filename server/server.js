const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // For production, specify the exact origin
    },
});

// Serve static files (if needed)
app.use(express.static('public')); 

app.use(cors({
  origin: "https://incandescent-meerkat-bbc6c7.netlify.app", // Replace with your Netlify domain
  credentials: true, // If you're using cookies or authentication
}));

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


let users = 0;
let usernames = [];
const userInfo = [];


io.on('connection', (socket) => {
    users++;

    console.log(usernames);

     socket.emit('see-accounts', usernames);


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

