const {io} = require('../../server/app');
const {TicketControl} = require('../classes/ticket-control');

const ticket = new TicketControl();

// conexion desde el fronted
io.on('connection', (client) => {
console.log('Usuario conectado');    

client.on('disconnect', () => {
console.log('usuario desconectado');
});

client.on('siguienteTicket', (data, callback) =>{
let nuevoticket = ticket.siguienteTicket();
callback(nuevoticket);
});


// emitir el evento ultimo ticket
client.emit('ultimoTicket', {
ultimo:  ticket.ultimoTicket(),
ultimos4: ticket.Ultimos4()
});


// atender ticket
client.on('atenderTicket', (data, callback) => {
if(!data.escritorio){
return callback ({
error: true,
mensaje: 'Error falta el escritorio'    
});    
}

let atenderTicket = ticket.AtenderTicket(data.escritorio);
callback(atenderTicket);

// para que todos los usuarios vean la informacion
client.broadcast.emit('ultimos4', {
ultimos4: ticket.Ultimos4()
});

});
});

