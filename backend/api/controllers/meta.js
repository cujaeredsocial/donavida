const Meta = require("../models/Meta");
const Rol = require("../models/Rol");
const mongoose = require("mongoose");

exports.post = (req, resp) => {
  //valido que el rol no este vacio
  const { rol, components } = req.body;
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
          componentes:[],
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
