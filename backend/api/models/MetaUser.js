//Son los templates o plantillas a rellenar para los distintos roles
const{Schema,model} = require('mongoose');


const esquemaMeta = new Schema({
    fecha:{
        type:String,
        default:Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    metas: [{
        type: Schema.Types.ObjectId,
        ref: 'Meta'
      }],
      
});

module.exports = model("Meta",esquemaMeta); 