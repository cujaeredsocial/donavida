const MetaUser = require("../models/MetaUser");
const User = require("../models/user");
const Meta = require("../models/Meta");
const socketIo = require("../socket.io/socket-io");

exports.post = (req, resp) => {
  //valido que el rol no este vacio
  const { rol, components } = req.body;
  if (!rol) {
    return resp.status(400).json("Rol no valido");
  }
  meta = new Meta({
    rol: rol,
    components: [],
  });
  components.forEach(component => {
    meta.components.push(component);
  });

  meta
    .save()
    .then(meta => {
      resp.json({
        success: true,
        message: "Fue creado la plantilla",
        meta: meta,
      });
    })
    .catch(err => {
      resp.status(400).json("Error en la creacion" + err);
    });
};

exports.update = (req, res) => {
  const metaId = req.params.id;
  const updatedComponents = req.body.components;
  // Actualizar el arreglo en la base de datos
  Meta.findByIdAndUpdate(
    metaId,
    { components: updatedComponents },
    { new: true }
  )
    .then(updatedMeta => {
      res.json(updatedMeta);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.update = (req, res) => {
  //Obtener y validar campos
  const rol = req.params.rol;
  const components = req.body.components;
  if (!rol) {
    return res.status(400).json("Rol no valido");
  }
  if (components.lenght > 0) {
    return res.status(400).json("Componentes vacios");
  }
  //Buscar plantilla original
  Meta.findOne({ rol: rol })
    .then(meta => {
      //Crear mapas de ambos arreglos por el titulo para comparar los elemento que fueron agregados
      //modificados y eliminados
      const originalMetaComponentsMap = meta.components.reduce(
        (map, obj) => ((map[obj.title] = obj), map),
        {}
      );
      const changedMetaComponentsMap = components.reduce(
        (map, obj) => ((map[obj.title] = obj), map),
        {}
      );
      //Guardar los componentes agregados
      const added = Object.keys(changedMetaComponentsMap)
        .filter(id => !(id in originalMetaComponentsMap))
        .map(id => changedMetaComponentsMap[id]);
      //Guardar los componentes modificados
      const modified = Object.keys(originalMetaComponentsMap)
        .filter(
          id =>
            id in changedMetaComponentsMap &&
            JSON.stringify(originalMetaComponentsMap[id]) !==
              JSON.stringify(changedMetaComponentsMap[id])
        )
        .map(id => ({
          before: originalMetaComponentsMap[id],
          after: changedMetaComponentsMap[id],
        }));
      //Guardar los componentes eliminados
      const deleted = Object.keys(originalMetaComponentsMap)
        .filter(id => !(id in changedMetaComponentsMap))
        .map(id => originalMetaComponentsMap[id]);
      //Buscar todos los usuarios que deben ser avisados
      //del cambio en la plantilla
      MetaUser.find({ rol: rol, last: true })
        .then(metaUsers => {
          const users = metaUsers.map(metaU => metaU.user);
          //Mandar el mensaje con socket.io

          //Definir el mensaje
          const name = "Cambios en la plantilla del rol " + rol;
          const message = {
            users: users,
            newcomponents: components,
            addedcomponents: added,
            modifiedcomponents: modified,
            deletedcomponents: deleted,
          };
          //Emitir el mensaje
          socketIo.SimpleEmit(name, message);
         
          //Actualizar la platilla
          meta.components = [...components];
          return meta.save();
        })
        .then(meta => {
          res.json({
            message: "Updated Meta and Notification Sended",
            meta: meta,
          });
        })
        .catch(err => res.status(400).json(err));
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
exports.get = (req, res) => {
  const rol = req.params.rol;

  if (!rol) {
    return res.status(400).json("Rol no valido");
  }
  Meta.findOne({ rol: rol })
    .then(meta => {
      res.json(meta);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

/*[
{
    "fecha": "1691777043472",
    "rol": {
        "_id": "64d3f60bf7b90786b68f2d5a",
        "name": "Gestor",
        "description": "Los vecionas aseguran que era un tipo normal",
        "__v": 0
    },
    "components": [
        {
            "label": "Usuario",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67a185fcf320f6aa70fbb"
        },
        {
            "label": "CI",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67a185fcf320f6aa70fbc"
        },
        {
            "label": "Numero de telefono",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67a185fcf320f6aa70fbd"
        }
    ],
    "model": true,
    "_id": "64d67a185fcf320f6aa70fba",
    "__v": 0
},{
    "fecha": "1691777786796",
    "rol": {
        "_id": "64d6516859329ea9ff46430d",
        "name": "Donante",
        "description": "Esto es inicial para probar",
        "__v": 0
    },
    "components": [
        {
            "label": "Usuario",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67cb4f3d03d03beba3f4e"
        },
        {
            "label": "CI",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67cb4f3d03d03beba3f4f"
        },
        {
            "label": "Numero de telefono",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67cb4f3d03d03beba3f50"
        },
        {
            "label": "Tipo de Sangre",
            "type": "String",
            "value": [],
            "regex": "Un ex de 0 a 10 letras",
            "_id": "64d67cb5f3d03d03beba3f51"
        }
    ],
    "model": true,
    "_id": "64d67cb4f3d03d03beba3f4d",
    "__v": 0
}]*/
