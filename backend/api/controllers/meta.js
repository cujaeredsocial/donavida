const Meta = require("../models/Meta");
const Rol = require("../models/Rol");

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

exports.get = (req, res) => {
  const namerol = req.params.rol;

  if (!namerol) {
    return res.status(400).json("Rol no valido");
  }
  Meta.findOne({ rol: namerol })
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
