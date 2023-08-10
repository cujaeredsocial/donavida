const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true,
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

    activate:{
        type:Boolean,
        default:true
    },//cuando se loguea al rpincipio esta activado
    token:{
        type:String
    }
})


const userModel = mongoose.model('user',userSchema);
module.exports = userModel;