const MetaUser = require('../models/MetaUser');
const User = require('../models/user');
const Meta = require('../models/Meta');

// exports.postSafeMeta=(req,res)=>{
// const {userName,metaId,components} = req.body;

// let meta;

// Meta.findById(metaId).then(metaModel=>{
//     if(!metaModel){throw new Error('Plantilla no encontrada')}else{
//         meta = {...metaModel};
//         components.every
//         meta.components = {...components}
//     }
// })

// User.findOne({userName:userName}).then(user=>{
//     return MetaUser.findOne({user:user});
// }).then(metauser=>{

// })

// }