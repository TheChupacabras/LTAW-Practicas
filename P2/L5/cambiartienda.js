//-- Crear una variable con la estructura definida
//-- en un fichero JSON

const fs = require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Leer el fichero JSON
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre productos la tienda
console.log("Productos en la tienda: " + tienda.productos.length + "\n");

//-- Recorrer el array de productos
tienda.productos.forEach((element,index)=>{
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});
console.log( "\n");

//-- Mostrar informacion sobre usuarios de la tienda
console.log("Usuarios en la tienda: " + tienda.usuarios.length + "\n");

//-- Recorrer el array de usuarios
tienda.usuarios.forEach((element,index)=>{
    console.log("Usuario: " + (index + 1) + ": " + element["usuario"]);
});
console.log( "\n");

//-- Mostrar informacion sobre pedidios de la tienda
console.log("Pedidos en la tienda: " + tienda.pedidos.length + "\n");

//-- Recorrer el array de pediddos
tienda.pedidios.forEach((element,index)=>{
    console.log("Pedido: " + (index + 1) + ": " + element["tarjeta"]);
});
console.log( "\n");

