//Son los templates o plantillas a rellenar para los distintos roles
const{Schema,model} = require('mongoose');



const esquemaMeta = new Schema({
    fecha:{
        type:String,
        default:Date.now()
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol'
    },
    components: [{
        type: Schema.Types.ObjectId,
        ref: 'Componente'
      }],
      
});

module.exports = model("Meta",esquemaMeta); 
