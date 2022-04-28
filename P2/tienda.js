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


//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form1.html','utf-8');

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync('form1-resp2.html', 'utf-8');


// mine utilizado
var mine = {
        '/'    : 'text/html',
        'html' : 'text/html',
        'css'  : 'text/css',
        'jpg'  : 'image/jpg',
        'js'   : 'text/js',
        'png'  : 'image/png',
        'gif'  : 'image/gif',
        'procesar' : 'text/html'
    };


//-- Servidor escuchando
console.log("Server is listening");


//-- Server
const server = http.createServer(function (req, res) {
    
    //url solicitada
    let filename = ""
    const myUrl = new URL(req.url, 'http://' + req.headers['host']);
    console.log("\nSe ha solicitado el recurso: " + myUrl.pathname);
    let content_type = "text/html";
    
    
    console.log("Peticion Recibida: " + myUrl);
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + myUrl.pathname);
    console.log("  Parametros: " + myUrl.searchParams);


    if(myUrl.pathname == '/procesar'){
        console.log("Lo ha pilñlado");
        content_type = "text/html";
        let nombre = myUrl.searchParams.get('nombre');
        let apellidos = myUrl.searchParams.get('apellidos');
        data = RESPUESTA.replace("NOMBRE", nombre);
        data = data.replace("APELLIDOS", apellidos);
         //-- Enviar la respuesta
        res.setHeader('Content-Type', content_type);
        res.write(data);
    }else if(myUrl.pathname == '/'){
        filename += "./tienda.html";
        let select = myUrl.pathname.lastIndexOf(".");
        content_type = myUrl.pathname.slice(select + 1);
        console.log("type of mine:", mine[content_type])
    }else{
        filename += "." + myUrl.pathname;
        console.log("Filename:",filename);
        let select = myUrl.pathname.lastIndexOf(".");
        content_type = myUrl.pathname.slice(select + 1);
        console.log("type of mine:", mine[content_type])
    }


    


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