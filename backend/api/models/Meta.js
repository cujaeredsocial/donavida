//Son los templates o plantillas a rellenar para los distintos roles
const { Schema, model } = require("mongoose");
const Component = require("./Component");

const esquemaMeta = new Schema({
  rol: {
    type: String,
    enum: ["donante", "gestor", "solicitante"],
    require: true,
  },
  components: [Component.schema]  
});
esquemaMeta.methods.comparar = name => {
  if (rol === name) {
    return rol;
  }
};

module.exports = model("Meta", esquemaMeta);
