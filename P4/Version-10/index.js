const electron = require('electron');
const address = require('ip');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const print = document.getElementById("print");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.electron;
info3.textContent = process.cwd();
info4.textContent = process.versions.chrome;




btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    electron.ipcRenderer.invoke('test', "Mensaje de prueba");
    console.log("Botón apretado!");
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });

  electron.ipcRenderer.on('ip', (event, address) => {
    info6.textContent = address;
    console.log(address);
    
});
electron.ipcRenderer.on('usuario', (event, usuario) => {
  info5.textContent = usuario;
  console.log(usuario);

});

electron.ipcRenderer.on('msg', (event, msg) => {
  display.innerHTML += msg + "<br>";
});
