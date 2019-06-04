socket = io();
var messages = document.getElementById('messages');

(function() {
    $('form').submit(function(e) {
        let li = document.createElement('li');
        e.preventDefault(); //prevents page reloading
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
       return true; 
    });
}) ();