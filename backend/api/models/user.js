const mongoose = require('mongoose');
const Component = require('./Component');


const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true,
        unique:true,
        minLength:[4,'Name should be minimum of 4 characters']
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'Password should be minimum of 8 characters']
    }, 
        
    fecha:{
        type:Date,
        default:Date.now()
    },
     //cuando se loguea al principio esta activado
    activate:{
        type:Boolean,
        default:true
    },
    datos_roles :[{//aca va un arreglo con el rol y los componentes
        rol :{
            type:String,
        },
        components: [Component.schema] 
    }]
    
});


const userModel = mongoose.model('user',userSchema);
module.exports = userModel;