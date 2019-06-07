var socket = io();
var messages = document.getElementById('messages');

(function() {
    $('form').submit(function(e) {
        let li = document.createElement('li');
        e.preventDefault(); //prevents page reloading
        socket.emit('chat message', $('#message').val());

        
        $('#message').val('');
       return true; 
    });

    socket.on('received', data => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        var messages = document.getElementById('messages');
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append('by' + 'anonymous' + ": " + 'just now');
        console.log('Hello bingo!');
    })
}) ();

//fetching initial chat messages from the database
(function() {
    fetch('/simple-chat')
    .then(data => {
        return data.json();
    })
    .then(json => {
        json.map(data => {
            let li = document.createElement('li');
            let span = document.createElement('span');
            messages.appendChild(li).append(data.message);
            messages.appendChild(span).append('by ' + data.sender + ': ' + formatTimeAgo(data.createdAt))
        });
    });
})();