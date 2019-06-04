//Require the express module
const express = require('express');
const app = express();
const dateTime = require('simple-datetime-formater');
const bodyParser = require('body-parser');


//require the http module
const http = require('http').Server(app);

//reqire the socket.io module
const io = require('socket.io');

const port = 5000;

app.use(bodyParser.json());

//routes

//express.static middleware
app.use(express.static(__dirname + '/public'));


const socket = io(http);

//database connection
const Chat = require('./models/Chat');
const connect = require('./dbconnect');

//create an event listener
//To listen to messages
socket.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnected', () => {
        console.log('Disconnected');
    });

    socket.on('typing', data => {
        socket.broadcast.emit('notifyTyping', {
            user: data.user,
            message: data.message
        });
    });

    //when someone stops typing
    socket.on('stopTyping', () => {
        socket.broadcast.emit('notifyStopTyping');
    });

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);

        //broadcast message to everyone in port:5000 except yourself
        socket.broadcast.emit('received', { message: msg });

        //save chat to database
        connect.then(db => {
            console.log('connected correctly to the server');
            let chatMessage = new Chat({ message: msg, sender: "Anonymous" });

            chatMessage.save();
        });
    });
});

//wire up the server to listen to our port 500
http.listen(port, () => {
    console.log('connected to port: ' + port)
});
