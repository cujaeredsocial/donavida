const{Schema,model, SchemaTypes} = require('mongoose');
const Meta = require('../models/Meta'); 
const Component = require('../models/Component'); 


const esquemaMetaUser = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    rol: {
        type: String,
        enum:['donante','gestor','solicitante'],
        require: true
    },
    date:{
        type:Date,
        default:Date.now()
    },  
    meta: Meta.schema,
    components:[Component.schema],
    dateUpdate:{
        type:Date,       
    },
    updated:{
        type: Boolean,
        required : true,
    },
    last:{
        type: Boolean,
        required : true,
    }
    
});

module.exports = model("MetaUser",esquemaMetaUser); 