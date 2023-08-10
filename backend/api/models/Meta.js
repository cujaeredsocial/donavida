//Son los templates o plantillas a rellenar para los distintos roles
const{Schema,model} = require('mongoose');
const rol = require('./Rol');
const esquemaComponentes = require('./Component');

const esquemaMeta = new Schema({
    fecha:{
        type:String,
        default:Date.now()
    },
    rol: {
        type:String,
        required: true,
    },
    componentes: [{
        type: Schema.Types.ObjectId,
        ref: 'Component',//e
        default:[]
      }],
      
});

module.exports = model("Meta",esquemaMeta);   /*Clave:{
    type: String,
    default:"String", 
    componentType:{
        type:String,
        required:true
    }      
},


DirPostal:{
    type: String,
    default:"String", 
    componentType:{
        type:String,
        required:true
    }      
},
UsuarioWA:{
    type: String,
    default:"String" , 
    componentType:{
        type:String,
        required:true
    }     
},
 Components :[ {
    NomUsuario:{
        type: String,
        default:"String", 
        componentType:{
            type:String,
            required:true
        }  ,  
        titulo:{
            type:String,
            required:true
        },
        value:{
            type:[String],
            default:[]
        }
    },
    CI:{
        type: String,
        default:"String", 
        componentType:{
            type:String,
            required:true
        } ,  
        titulo:{
            type:String,
            required:true
        },
        value:{
            type:[String],
            default:[]
        }     
    }, 
     NombreCompleto:{
        type: String,
        default:"String", 
        componentType:{
            type:String,
            required:true
        },  
        titulo:{
            type:String,
            required:true
        },
        value:{
            type:[String],
            default:[]
        }      
    },
}],
 UsuarioTelegram:{
        type: String,
        default:"String"  , 
        componentType:{
            type:String,
            required:true
        }    
    },
    DirCorreoE:{
        type: String,
        default:"String", 
        componentType:{
            type:String,
            required:true
        }   
    },*//* idUsuario : {
            type: String,
            default:"int", 
            componentType:{
                type:String,
                required:true
            },
            titulo:{
                type:String,
                required:true
            }  
    },*/