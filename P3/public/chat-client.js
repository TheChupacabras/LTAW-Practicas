//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const sound = document.getElementById("sound");
const nickname = document.getElementById("nick");



//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Escribir el nick
var nick = prompt("Escriba su nick");
console.log(nick);

//-- Envio el nick al servidor
socket.emit('nick', nick);


socket.on("message", (msg)=>{
  display.innerHTML +=   msg + '</p>';
  sound.play();
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}
