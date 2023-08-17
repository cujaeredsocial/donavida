const MetaUser = require("../models/MetaUser");
const User = require("../models/user");
const Meta = require("../models/Meta");

//Funcion para actualizar para actualizar el ultimo metaUser
function changeLast(user) {
  MetaUser.findOneAndUpdate(
    { user: user, last: true },
    { last: false },
    { new: true }
  )
    .then(metaU => console.log(metaU))
    .catch(err => console.log(err));
}

//Crear el metauser
exports.postCrear = (req, res) => {
  //Obtener y comprobar que los datos no esten vacios
  const { userName, name_rol, componentes } = req.body;
  if (!userName || !name_rol || !componentes) {
    return res.status(404).json("Valores Incompletos");
  }
  //Encontrar el usuario por el nombre
  User.findOne({ userName: userName })
    .then(user => {
      if (!user) {
        return res.status(404).json("El user no existe");
      } else {
        //Encontrar la plantilla por el rol
        Meta.findOne({ rol: name_rol })
          .then(meta => {
            if (!meta) {
              return res.status(404).json("No existe meta con ese rol");
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
                  res.json({
                    sucess: true,
                    usermeta: userMeta,
                    message: "Se ha creado un nuevo meta user",
                  });
                })
                .catch(err => {
                  res
                    .status(404)
                    .json({ message: "no se ha podido crear" + err });
                });
            }
          })
          .catch(err => {
            res.status(404).json("Error en la busqueda del meta" + err);
          });
      }
    })
    .catch(err => {
      res.status(404).json("Error en la busqueda del user" + err);
    });
};

//Cambiar el estado de una solicitud
exports.putStatus = (req, res) => {
  //Validar el id y el estado a cambiar
  const metaUId = req.params.id;
  const status = req.body.status;
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
          rol: metaU.name_rol,
          meta: metaU.meta,
          components: metaU.componentes,
          status: status,
          updated: true,
          last: true,
        });
        //Cambiar el estado de la ultima solicitud
        changeLast(metaU.user);
        //Guardar el metaUser en la base de datos
        return newuserMeta.save();
      } else {
        res.json({ message: "La solicitud ya tenia ese estado", metaU: metaU });
      }
    })
    .then(metaUpdated => {
      res.json({ message: "success", metaUpdated: metaUpdated });
    })
    .catch(err => res.status(400).json("No se pudo cambiar el estado " + err));
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
