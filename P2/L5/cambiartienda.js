//-- Crear una variable con la estructura definida
//-- en un fichero JSON

const fs = require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"


//-- NOmbre del fichero JSON de salida
const FICHERO_JSON_OUT = "Ej-04-tienda-modificacion.json"

//-- Leer el fichero JSON
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);


//-- Modificar el nombre del producto 2
tienda.productos[0]["stock"] = 16
tienda.productos[1]["stock"] = 16
tienda.productos[2]["stock"] = 16


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
tienda.pedidos.forEach((element, pedidos)=>{
    console.log("Detalles pedido: " + (pedidos + 1) + ": " + element["usuario"] +" metodo de pago: "+ element["tarjeta"] + " Dirección: " + element["direccion"]);
});
console.log( "\n");


//-- Convertir la variable a cadena JSON
let myJSON = JSON.stringify(tienda);

//-- Guardarla en el fichero destino
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log("Información guardada en fichero: " + FICHERO_JSON_OUT);
