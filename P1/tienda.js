// modules
const http = require('http');
const fs = require('fs');
const url = require('url');


const PUERTO = 9090;


// mine utilizado
var mine = {
        '/'    : 'text/html',
        'html' : 'text/html',
        'css'  : 'text/css',
        'jpg'  : 'image/jpg',
        'js'   : 'text/js',
        'png'  : 'im-ñlage/png',
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
        filename = "./tienda.html";
    }else{
        filename = "." + myUrl.pathname;
    }
    
    console.log("Filename:",filename);


    let select = myUrl.pathname.lastIndexOf(".");
    let content_type = myUrl.pathname.slice(select + 1);
    console.log("Tipo de mine:", mine[content_type])


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

console.log("La pagina está activa. Escuchando en puerto: " + PUERTO);