const { postCrear } = require('../controllers/metauser');

let io;

//Inicializar io para llamarlo desde cualquier archivo
//Hemos presentado problemas para conectar socket con los endpoints, por tanto presento varias opciones

exports.socketConnection = server => {
  io = require("socket.io")(server);
  io.on("connection", socket => {
    console.info(`Client connected [id=${socket.id}]`); 
    socket.join(socket.request._query.id);
    //-------------------------------------------------------------------------------------------------------------
   // 1-Enviar ademas de el metauser un objeto socket al metodo con el que se emitiran las notificacioines en vez
    //de enviar una respuesta
    socket.on("Solicitud",(metauser) =>{
      //postCrear(metauser,socket.handshake.res);// este es un modo para trabajar con la res pero hay que actualizar socket
      postCrear(metauser,socket);
    })
    socket.on("disconnect", () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

exports.SimpleEmit = (name, message) => {
  io.emit(name, message);
 
  };

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
