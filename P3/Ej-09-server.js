//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8080;

var usuario = 0;
nombreusuario = [1];

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);




//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/Ej-09.html">Test</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  usuario += 1;
  nombreusuario.push(socket.id);
  socket.send('<p style="color:red">' + "Bienvenido" + '</p');
  console.log('** NUEVA CONEXIÓN **'.yellow);
  var index = nombreusuario.indexOf(socket.id);
  io.send("SE HA CONECTADO " + 'usuario'+ index  + ': ');
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    usuario -= 1;
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    
    if (msg== '/help') { 
      socket.send('<p style="color:red">' + "Los comandos permitidos son:"   + "<br/>/list: Devolverá el número de usuarios conectados" +
      "<br/>/hello: El servidor nos devolverá el saludo"  + "<br/>/date: Nos devolverá la fecha");   
    } else if (msg== '/list') { 
      socket.send('<p style="color:red">' + "Hay: " + usuario + " usuarios conectados" + '</p');
    } else if (msg.split("/")[0] == "") {  
      socket.send('<p style="color:red">' + "Comando no valido consulte /help para ver los comandos disponibles" + '</p'); 
    } else {
      console.log("Mensaje Recibido!: " + msg.blue);
    var index = nombreusuario.indexOf(socket.id);
    //-- Reenviarlo a todos los clientes conectados
    io.send('usuario'+ index  + ': ' + msg);
    }
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);
