//Son los templates o plantillas a rellenar para los distintos roles
const { Schema, model } = require("mongoose");


const centerSchema = new Schema({
    name:{
        type: String,
        require:true,
        unique:true    
    },
    description:{
        type:String,        
    },
    imageURL:{
        type:String,
    }, 
    ubication:{
        lat:{type:String,},
        long:{type:String,}
    }, 
    mapConection:{
        type:String,
    }, 
    category:{
        type:String,
        require:true,
        enum:['Hospital','Banco de donacion','Policlinico','Deambulante']
    }
});


module.exports = model("Center", centerSchema);
