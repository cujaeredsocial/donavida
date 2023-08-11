const{Schema,model} = require('mongoose');

const esquemaComponente = new Schema({
    label:{//nombre de la etiqueta ex sexo
        type:String,       
        required:true
    },
    type:{//tipo de dato que va a tener el componente
        type:String,
        required:true
    },
    value:{
        type:[String],
        default:[]
    },
    regex:{//regex para el campo
        type:String,    
    },

});
const modelSchema = model('Componente',esquemaComponente);
module.exports = {modelSchema, esquemaComponente};