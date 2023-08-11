//Son los templates o plantillas a rellenar para los distintos roles
const{Schema,model} = require('mongoose');
const { esquemaComponente } = require('./Component');
const component = require('./Component').esquemaComponente;



const esquemaMeta = new Schema({
    fecha:{
        type:String,
        default:Date.now()
    },
    rol: {
       /* type: Schema.Types.ObjectId,
        ref: 'Rol'*/
        type:String,
        require: true
    },
    components: [esquemaComponente],
      model: { 
        type: Boolean,
        require:true,
      },
      
},
);
esquemaMeta.methods.comparar = (name)=>{
    if(rol.name === name){
      return rol
    }
}

module.exports = model("Meta",esquemaMeta); 
