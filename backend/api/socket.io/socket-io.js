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

