const MetaUser = require("../models/MetaUser");
const User = require("../models/user");
const Meta = require("../models/Meta");
const signal = require("../socket.io/socket-io");

//Funcion para actualizar para actualizar el ultimo metaUser
function changeLast(user, rol) {
  MetaUser.findOneAndUpdate(
    { user: user, rol: rol, last: true },
    { last: false },
    { new: true }
  )
    .then(metaU => console.log(metaU))
    .catch(err => console.log(err));
}
//1-Para el primer caso
exports.postCrear = (metauser, socket) => {
  //Obtener y comprobar que los datos no esten vacios
  const { userName, name_rol, componentes } = metauser;
  if (!userName || !name_rol || !componentes) {
    throw new Error("Valores Incompletos");
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
                AsignarRolDonante(user.id, name_rol, componentes);//Aca si es donante asigno su rol
                status = "aceptado";
              } else {//si no se guardara en la base de datos en proceso
                status = "en proceso";
              }
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
                  //Respuesta del metodo
                  socket.emit("Solicitud Enviada", userMeta);
                })
                .catch(err => {
                  throw new Error({ message: "no se ha podido crear" } + err);
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
};
//Cambiar el estado de una solicitud
//Documenta Fabian
/*exports.putStatus = (req, res) => {*/
exports.putStatus = (metauser, socket) => {
  //Validar el id y el estado a cambiar
  const metaUId = metauser._id;//const metaUId = req.params.id;
  const status = metauser.status;//const status = req.body.status;
  
  if (!metaUId) {
    res.status(400).json("MetaUserId no valido");
  }
  if (
    status !== "aceptado" &&
    status !== "denegado" &&
    status !== "en proceso"
  ) {
    res.status(400).json("Estado no valido");
  }
  //Buscar la solicitud que se quiere actualizar
  MetaUser.findById(metaUId)
    .then(metaU => {
      //Verificar existencia
      if (!metaU) {
        throw new Error("No existe MetaUser con ese Id");
      } else if (metaU.status !== status) {
        //Crear el metauser actualizado
        const newuserMeta = new MetaUser({
          user: metaU.user,
          rol: metaU.rol,
          meta: metaU.meta,
          components: metaU.componentes,
          status: status,
          updated: true,
          last: true,
        });
        //Cambiar el estado de la ultima solicitud
        changeLast(
          metaU.user,
          metaU.rol
        );
        if (metaU.rol === "gestor") {
          AsignarRolGestor(metaU.user._id, metaU.rol, metaU.componentes);
        } else {
          AsignarRolSolicitante(metaU.user._id, metaU.rol, metaU.componentes);
        }
        //Guardar el metaUser en la base de datos
        return newuserMeta.save();
      } else {
        signal.SimpleEmit({ message: "La solicitud ya tenia ese estado", metaU: metaU });//Tener en cuenta afro que esto no deberia ocurrir nunca
      }
    })
    .then(metaUpdated => {
      signal.SimpleEmit({ message: "success", metaUpdated: metaUpdated });
    })
    .catch(err => signal.SimpleEmit('Error',"No se pudo cambiar el estado " + err));
};
//Hecho puse de gestor
exports.getInProcessRequests = (req, res) => {
  MetaUser.find({ rol: "gestor", status: "en proceso", last: true })
    .then(metaUs => {
      res.json({ message: "success", metas: metaUs });
    })
    .catch(err => res.status(404).json(err));
};
//Hecho puse de solicitante
exports.getInProcessRequests2 = (req, res) => {
  MetaUser.find({ rol: "solicitante", status: "en proceso", last: true })
    .then(metaUs => {
      res.json({ message: "success", metas: metaUs });
    })
    .catch(err => res.status(404).json(err));
};
exports.getLastReq = (req, res) => {
  const id = req.params.id;
  const rol = req.params.rol;
  MetaUser.findOne({ user: id, rol: rol, last: true })
    .then(metaU => res.json(metaU))
    .catch(err => res.status(400).json(err));
};

//Mostrar el metauser
exports.getMostrarTodos = (req, res) => {
  const { username } = req.params;
  MetaUser.find({ user: username })
    .then(usuarios => {
      if (usuarios) {
        res.json({
          usuarios: usuarios,
          message: "Encontrados",
          cant: usuarios.length,
        });
      } else {
        res.status(404).json({ message: "El usuario dio null" });
      }
    })
    .catch(err => {
      res.status(404).json({
        message: "Existe un error pq no encuentra el usuario",
        error: err,
      });
    });
};

exports.getMostrarElUltimoIntroducido = (req, res) => {
  console.log("Llega");
  MetaUser.find()
    .then(metausers => {
      console.log(metausers);
      if (!metausers) {
        return res.status(404).json({ messge: "No tiene ningun metauser" });
      } else {
        let actual = metausers[0].fecha;

        metausers.forEach(meta => {
          let aux = meta.fecha;
          console.log(actual);
          console.log(meta);
          console.log("actual");
          if (actual > aux) {
            actual = aux;
          }
        });
        res.json(meta);
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
};
//Eliminar el metauser
//Pseudocodigo del metodo Asignar rol

//1-Validar tipo de solicitud
//Documenta Fabian
AsignarRolDonante = function (id, name_rol, componentes) {
  User.findById(id)
    .then(usuario => {
      let i = 0;
      let encontrado = false;
      //Recorro los datos del usuario para verificar que ya haya sido logueado con ese rol
      while (i < usuario.datos_roles.length && !encontrado) {
        if (usuario.datos_roles[i].rol == name_rol) {
          //Si lo encuentro sustituyo los componentes
          componentes.forEach(componente => {
            encontrado = true;
            usuario.datos_roles[i].components.push(componente);
          });
        }
        i++;
      }
      console.log(encontrado);
      if (encontrado) {
        //Si lo encuentra actualizo
        signal.SimpleEmit("Existe", "Su solicitud ha sido actualizada");
        usuario.save();
      } else {
        //Si no lo encuentra en dependencia del rol elijo el flujo
        //  1.1-Si es donante asignar al usuario
        if (name_rol === "donante") {
          //si es donante lo asigno y aviso
          let dato = { rol: name_rol, components: componentes };
          usuario.datos_roles.push(dato);
          usuario.save();
          console.log("0");
          signal.SimpleEmit("Donante", "Usted ha sido logueado como donante");
        } else {
          signal.SimpleEmit("NoDonante", "Su solicitud esta siendo procesada");
        }
      }
    })
    .catch(err => {
      console.log("Ha ocurrido un error ", err);
    });
};
//Documenta Fabian
AsignarRolGestor = function (id, name_rol, componentes) {
  User.findById(id)
    .then(usuario => {
      let i = 0;
      let encontrado = false;
      //Recorro los datos del usuario para verificar que ya haya sido logueado con ese rol
      while (i < usuario.datos_roles.length && !encontrado) {
        if (usuario.datos_roles[i].rol == name_rol) {
          //Si lo encuentro sustituyo los componentes
          componentes.forEach(componente => {
            encontrado = true;
            usuario.datos_roles[i].components.push(componente);
          });
        }
        i++;
      }
      if (encontrado) {
        //Si lo encuentra actualizo
        signal.SimpleEmit("Existe", "Su solicitud ha sido actualizada");
        usuario.save();
      } else {
        //Si no lo encuentra en dependencia del rol elijo el flujo
        //  1.1-Si es donante asignar al usuario
        let dato = { rol: name_rol, components: componentes };
        usuario.datos_roles.push(dato);
        usuario.save();
        console.log("0");
        signal.SimpleEmit("Gestor", "Usted ha sido logueado como donante");
      }
    })
    .catch(err => {
      console.log("Ha ocurrido un error ", err);
    });
};
//Documenta Fabian
AsignarRolSolicitante = function (id, name_rol, componentes) {
  User.findById(id)
    .then(usuario => {
      let i = 0;
      let encontrado = false;
      //Recorro los datos del usuario para verificar que ya haya sido logueado con ese rol
      while (i < usuario.datos_roles.length && !encontrado) {
        if (usuario.datos_roles[i].rol == name_rol) {
          //Si lo encuentro sustituyo los componentes
          componentes.forEach(componente => {
            encontrado = true;
            usuario.datos_roles[i].components.push(componente);
          });
        }
        i++;
      }
      if (encontrado) {
        //Si lo encuentra actualizo
        signal.SimpleEmit("Existe", "Su solicitud ha sido actualizada");
        usuario.save();
      } else {
        //Si no lo encuentra en dependencia del rol elijo el flujo
        //  1.1-Si es donante asignar al usuario
        let dato = { rol: name_rol, components: componentes };
        usuario.datos_roles.push(dato);
        usuario.save();
        console.log("0");
        signal.SimpleEmit("Solicitante", "Usted ha sido logueado como donante");
      }
    })
    .catch(err => {
      console.log("Ha ocurrido un error ", err);
    });
};
/**
 * //Esto es una alternativa que aun no deseo descartar
//Fabian Funcion para elegir que se va a ser en dependencia de la solicitud
//Documenta Fabian
ElegirSegunRol = function (rol) {
  if (rol === "donante") {
    signal.SimpleEmit("Donante", "Usted ha sido aceptado como donante");
  }
  if (rol === "gestor") {
    //Guardar la solicitud en la base de datos de series temporales-Investigar
    //reenviar esa informacion a adolfo y jacke especificando que se envia a los gestores-Recoradar
    //Flujo por parte de jacke y adolfo
    //Si ellos la aceptan la solicitud , emiten un evento y yo se lo reenvio a cristian , si la deniegan
    //seria lo mismo, pero eso igual hay que guardarlo en una colleccion momo de solicitud revisada,
    //para que al cargar la pagina nuevamente el usuario se haga una busqueda en la base de datos(En caso
    //de que haya realizado una solicitud ) y se le de respuesta con la notificacion
    //ojo como eso esta guardado en series temporales, si no se encuentra en la bd su solicitud pq vencio el
    //plazo hay que enviarle un mensaje de que vencio el plazo que eso seria otra colleccion pero de solici-
    //tudes vencidas
  }
};

 */