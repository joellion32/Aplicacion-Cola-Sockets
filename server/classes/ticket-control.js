const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
     this.numero = numero;
     this.escritorio = escritorio;   
    }

}


class TicketControl {

constructor(){
   this.ultimo = 0;
   this.fecha = new Date().getDate();
   let data = require('../data/data.json');
   this.tickets = [];
   this.ultimos4 = [];

   if(data.hoy == this.fecha){
    this.ultimo = data.ultimo;
    this.tickets = data.tickets;
    this.ultimos4 = data.ultimos4;
   }else{
    this.reiniciarConteo();
   }
}

siguienteTicket(){
this.ultimo += 1;
let ticket = new Ticket(this.ultimo, null);
this.tickets.push(ticket);

this.grabarArchivo();

return `Ticket ${this.ultimo}`;
}


reiniciarConteo(){
this.ultimo = 0;   
this.tickets = [];    
this.ultimos4 = []; 
console.log("Se ha inicializado el sistema");  

this.grabarArchivo();
}


ultimoTicket(){
 return `Ticket ${this.ultimo}`; 
}

Ultimos4(){
return this.ultimos4;     
}

AtenderTicket(escritorio){
if(this.tickets.length === 0){
    return 'No hay tickets';
}

let numeroTicket = this.tickets[0].numero;
this.tickets.shift();

let atenderTicket = new Ticket(numeroTicket, escritorio);
this.ultimos4.unshift(atenderTicket);

// para borrar los ultimos 4 cuando sean atendidios
if(this.ultimos4.length > 4){
  this.ultimos4.splice(-1,1); // borra el ultimo  
}

console.log('Ultimos 4');
console.log(this.ultimos4);

this.grabarArchivo();

return atenderTicket;
}


grabarArchivo(){
    let dataJson = {
     ultimo: this.ultimo,
     hoy: this.fecha,   
     tickets: this.tickets,
     ultimos4: this.ultimos4
    }

    let data = JSON.stringify(dataJson);

    // guardar archivo json
    fs.writeFileSync('./server/data/data.json', data);
}


} // cierre de la clase



module.exports = {
    TicketControl
}