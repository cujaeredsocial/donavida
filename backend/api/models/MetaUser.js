//Son los templates o plantillas a rellenar para los distintos roles
const{Schema,model} = require('mongoose');


const esquemaMetaUser = new Schema({
    fecha:{
        type:String,
        default:Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    metas: [{
        type: Schema.Types.ObjectId,
        ref: 'Meta'
      }],
      
});

module.exports = model("MetaUser",esquemaMetaUser); 