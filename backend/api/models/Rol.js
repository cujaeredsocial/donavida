const {Schema,model} = require('mongoose');

const esquemaRol = new Schema ({
    name:{
        require:true,//es obligatorio
        unique:true,//sera unico
        type:String
    },
    //el id sera proveido desde mongoDB, no creo que haya necesidad de asignar un id aca
    description:{
        require:true,//es obligatorio
        unique:true,//sera unico
        type:String
    }
    //Tener en cuenta lo de documentacion tambien
    
   

});
module.exports = model("Rol",esquemaRol);