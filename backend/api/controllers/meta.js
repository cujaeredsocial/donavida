const Meta = require("../models/Meta");
const Rol = require("../models/Rol");
const mongoose = require("mongoose");

exports.post = (req, resp) => {
  //valido que el rol no este vacio
  const { rol, components, model } = req.body;
  if (!rol) {
    return resp.status(400).json("Rol no valido");
  }
  //Valido la existencia de ese rol
  Rol.findOne({ name: rol })
    .then(rol => {
      console.log(rol);
      if (!rol) {
        throw new Error("Rol no existe");
      } else {
        meta = new Meta({
          rol: rol,
          components: [],
          model: model,
        });
        components.forEach(component => {
          meta.components.push(component);
        });

        return meta.save();
      }
    })
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
  const rol = req.params.rol;

  if (!rol) {
    return resp.status(400).json("Rol no valido");
  }
  Rol.findOne({ name: rol })
    .then(rol => {     
      if (!rol) {
        throw new Error("Rol no existe");
      } else {
        return Meta.findOne({ rol: rol, model: true });
      }
    })
    .then(meta => {
      res.json(meta);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

exports.delete = (req, res) => {
  const rol = req.params.rol;
  if (!rol) {
    return resp.status(400).json("Rol no valido");
  }
  Rol.findOneAndRemove({ rol: rol })
    .then(rol => {
      if (!rol) {
        throw new Error("Rol no existe");
      } else {
        return Meta.findOne({ rol: rol, model: true });
      }
    })
    .then(meta => {
      res.json("Borrado exitosamente", meta);
    })
    .catch(err => {
      res.status(401).json(err);
    });
};
