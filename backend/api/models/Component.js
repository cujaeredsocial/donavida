const{Schema,model} = require('mongoose');

const esquemaComponente = new Schema({
    etiqueta:{//nombre de la etiqueta ex sexo
        type:String,
        required:true
    },
    name:{//nombre del componente
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
//regex para el campo
});

module.exports = model('Componente',esquemaComponente);