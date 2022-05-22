//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const ip = require('ip');
//-- Cargar el módulo de electron
const electron = require('electron');

const PUERTO = 8080;


var seudonimo = [];

var usuario = 0;
nombreusuario = [1];

let address = 'http://' + ip.address()+ ':'+ PUERTO + '/public/main.html';
console.log(address);

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido)
//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);




//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
res.sendFile(__dirname + "/public/main.html");
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));


  

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  

  //-- pedimos un nick al usuario
  socket.on("nick", (nick) => {
  seudonimo.push(nick);
  usuario += 1;
  nombreusuario.push(socket.id);
  win.webContents.send('usuario', usuario);
  socket.send('<p style="color:red">' + "Bienvenido" + '</p');
  console.log('** NUEVA CONEXIÓN **'.yellow);
  
  var index = nombreusuario.indexOf(socket.id);
  io.send('<p style="color:red">' + "Se ha conectado " + seudonimo[usuario-1] + '</p');
  
  

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    usuario -= 1;
    io.send('<p style="color:red">'+ nick + " ha abandonado el chat" + '</p');
    let cliente = seudonimo.indexOf(nick);
    seudonimo.splice(cliente, 1);
    win.webContents.send('usuario', usuario);
  });  

//-- Cojo el nombre
socket.on("nick", (nick) => {
  seudonimo.push(nick);
}); 
  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    
    if (msg== '/help') { 
      socket.send('<p style="color:red">' + "Los comandos permitidos son:"   + "<br/>/list: Devolverá el número de usuarios conectados" +
      "<br/>/hello: El servidor nos devolverá el saludo"  + "<br/>/date: Nos devolverá la fecha");   
    } else if (msg== '/list') { 
      socket.send('<p style="color:red">' + "Hay: " + usuario + " usuarios conectados" + '</p');
    } else if (msg== '/hello') { 
      socket.send('<p style="color:red">' + "El servidor manda saludos a usuario" + usuario +  '</p');
    } else if (msg== '/date') { 
      socket.send('<p style="color:red">' + hoy.toDateString() +  '</p');
    } else if (msg== '/users') { 
      socket.send('<p style="color:red">' +  "Actualmente estan conectados " + seudonimo  + '</p');
    } else if (msg.split("/")[0] == "") {  
      socket.send('<p style="color:red">' + "Comando no valido consulte /help para ver los comandos disponibles" + '</p'); 
      
    } else {
      console.log("Mensaje Recibido!: " + msg.blue);
    var index = nombreusuario.indexOf(socket.id);
    //-- Reenviarlo a todos los clientes conectados
    io.send(nick +  ': ' + msg);
    win.webContents.send('msg', msg);
    }
  });
});
});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!



console.log("Arrancando electron...");

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 800,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

  //-- Cargar contenido web en la ventana
  //-- La ventana es en realidad.... ¡un navegador!
  //win.loadURL('https://www.urjc.es/etsit');

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

  //-- Esperar a que la página se cargue y se muestre
  //-- y luego enviar el mensaje al proceso de renderizado para que 
  //-- lo saque por la interfaz gráfica
  win.on('ready-to-show', () => {
    console.log("HOLA?");
    win.webContents.send('ip', address);
  });

});


//cuando se pulsa boton se envia a los usuarios conectados
electron.ipcMain.handle('test', (event, msg) => {
  console.log(msg);
  io.send(msg);
});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);