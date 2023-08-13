
socketControllers = (io) =>{
    io.emit(() =>{
        console.log("hola soy pendejo");
    })
}

module.exports = socketControllers;


//emicion de eventos

/**
 * //1-inicializar la web socket
const io = new Server(server);

//emicion de eventos
io.emit(() =>{
  console.log('Usted esta conectado');//simple llamada para ver que socket.io este instalado y funcionando
});
//Multiplexado solo para el uso de los admins
const admins = io.of('/admin');//esto sirve para las opciones de los gestores

admins.emit(() => {
  console.log("Hola soy admin");
})
//2-escuchar eventos
io.on('connection',(socket) =>{
  sockett.send.json('ho;a')
  console.log("hola mundo");
  console.log('Gracias por utilizar nuestra red');
});
 */