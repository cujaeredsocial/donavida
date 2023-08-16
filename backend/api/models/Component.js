const{Schema,model, SchemaTypes} = require('mongoose');



const esquemaComponent = new Schema({ 
        title:{ //la etiqueta del componente
            type: String,
            require: true,
        },
        dataType:{ //el tipo de dato, como entero o string
            type: String,
            require: true,
        },
        componentType:{  //el tipo de componente, combobox o textfield
            type: String, 
            require: true,          
        },
        values:[{ //Valores, en caso de que sea un campo de selección, los valores de esa selección
            value: SchemaTypes.Mixed,           
        }],
        data:{ //, los datos introducidos por el usuario
            type: Mixed,           
        },
        regex:{
            type: String,
            require: true,
        },
        message:{//para un mensaje predeterminado de ayuda
            type: String,            
        },
    },  
    
);

module.exports = model("Component",esquemaComponent); 