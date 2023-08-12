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

//Crear el metauser
exports.postCrear = (req,res) => {
    const {username,name_rol} = req.body;
    //Validar que no esten vacios
    if(!username || !name_rol){
        return res.status(404).json('Valores Incompletos');
    }
    User.findOne({userName:username})
    .then(user =>{
        if(!user){
            return res.status(404).json('El user no existe');
        }else{
            Meta.findOne({rol:name_rol})
            .then(meta => {
                if(!meta){
                    return res.status(404).json('El meta no existe');
                }else{
                    const userMeta = new MetaUser({
                        user:user,
                        metas:new Meta({
                            rol:meta.rol,
                            components:meta.components,
                            model: meta.model
                        }),
                    });
                    userMeta.save()
                    .then(()=>{
                        res.json({
                            sucess:true,
                            usermeta:userMeta,
                            message:'Se ha creado un nuevo meta user'
                        });
                    })
                    .catch(err =>{
                        res.status(404).json({message: 'no se ha podido crear' + err});
                    })
                    
                }
            })
            .catch(err =>{
                res.status(404).json('Error en la busqueda del meta' + err);
            });
        }
    })
    .catch(err =>{
        res.status(404).json('Error en la busqueda del user' + err);
    })
    
}

//Mostrar el metauser
exports.getMostrarTodos = (req,res) =>{
    const {username} = req.params;
    MetaUser.find({user:username})
    .then(usuarios => {
        if(usuarios){
            res.json({usuarios:usuarios
                ,message:'Encontrados',
                cant:usuarios.length
            });
         }else{
            res.status(404).json({message:"El usuario dio null"});
         }
    })
    .catch(err =>{
        res.status(404).json({
            message:"Existe un error pq no encuentra el usuario",
            error:err
        });
    })
}
//Eliminar el metauser