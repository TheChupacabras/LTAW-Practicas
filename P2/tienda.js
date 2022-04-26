// modules
const http = require('http');
const fs = require('fs');
const url = require('url');


const PUERTO = 9090;


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

// mine utilizado
var mine = {
        '/'    : 'text/html',
        'html' : 'text/html',
        'css'  : 'text/css',
        'jpg'  : 'image/jpg',
        'js'   : 'text/js',
        'png'  : 'image/png',
        'gif'  : 'image/gif',
      
    };


//-- Servidor escuchando
console.log("Server is listening");


//-- Server
const server = http.createServer(function (req, res) {
    
    //url solicitada
    let filename = ""
    const myUrl = new URL(req.url, 'http://' + req.headers['host']);
    console.log("\nSe ha solicitado el recurso: " + myUrl.pathname);

    
    console.log("Peticion Recibida: " + myUrl);


    //buscamos archivo
    if(myUrl.pathname == '/'){
        //inicio
        filename += "./tienda.html";
    }else{
        filename += "." + myUrl.pathname;
    }
    
    console.log("Filename:",filename);


    let select = myUrl.pathname.lastIndexOf(".");
    let content_type = myUrl.pathname.slice(select + 1);
    console.log("type of mine:", mine[content_type])


    fs.readFile(filename, function(err, data){

        //si hay error
        if (err) {           
            data = fs.readFileSync('./error.html')
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
            
        }else{
            res.writeHead(200, {'Content-Type': mine[content_type]});
            res.write(data);
            res.end();
        }
    });
});

server.listen(PUERTO);

console.log("Web is working. Listening on port:: " + PUERTO);