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
    //2-Tratar directamente los metodos que tengan que ver con la emicion y recibo de imagenes en el archivo
    //socket, afro tenia otra idea pero seriamente asi es como siempre lo he visto
    socket.on("Solicitud",metauser => {
      const { userName, name_rol, componentes } = metauser/*.body*/;
      if (!userName || !name_rol || !componentes) {
        return res.status(404).json("Valores Incompletos");
      }
      //Encontrar el usuario por el nombre
      User.findOne({ userName: userName })
        .then(user => {
          if (!user) {
            throw new Error("El user no existe");
          } else {
            //Encontrar la plantilla por el rol
            Meta.findOne({ rol: name_rol })
              .then(meta => {
                if (!meta) {
                  throw new Error("No existe meta con ese rol");
                } else {
                  //Revisar que cada valor sea valido por su regex
                  const incorrectValues = componentes.filter(component => {
                    //comprobacion de regex
                  });
                  if (incorrectValues.length > 0) {
                    throw new Error(
                      "Los valores" + incorrectValues + "son incorrectos"
                    );
                  }
                  //Establecer el estado de la solicitud, si es donante se acepta directamente, si es de solicitante o
                  // gestor se pone en proceso hasta que la actualicen
                  let status;
                  if (name_rol === "donante") {
                    status = "aceptado";
                  } else {
                    status = "en proceso";
                  }
                  //asignacion del rol al usuario
       //           AsignarRol(user.id,name_rol,componentes);
                  //Creacion del metaUser
                  const userMeta = new MetaUser({
                    user: user,
                    rol: name_rol,
                    meta: meta,
                    components: componentes,
                    status: status,
                    updated: true,
                    last: true,
                  });
                  //Guardar el metaUser en la base de datos
                  userMeta
                    .save()
                    .then(() => {
                      //Emit signal
                      ElegirSegunRol(name_rol);
                      //Respuesta del metodo
                      socket.emit("Solicitud Enviada",userMeta);
                    })
                    .catch(err => {
                      throw new Error({ message: "no se ha podido crear" + err });
                    });
                }
              })
              .catch(err => {
                throw new Error("Error en la busqueda del meta" + err);
              });
          }
        })
        .catch(err => {
          throw new Error("Error en la busqueda del user" + err);
        });
    });

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
