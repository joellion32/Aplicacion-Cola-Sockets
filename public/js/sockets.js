var socket = io();
var label = $("#lblNuevoTicket");

socket.on('connect', function(client){
console.log('conectado al servidor');
});

socket.on('disconnect', function(){
console.log('desconectado del servidor');
});

// recibir ultimo ticket
socket.on('ultimoTicket', function(data) {
$(label).text(data.ultimo); 
});

$("button").on('click', function () {
    socket.emit('siguienteTicket', null, function(siguienteTicket){
       $(label).text(siguienteTicket); 
    });
});