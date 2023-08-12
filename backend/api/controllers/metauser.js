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
                    console.log(meta + 'este es meta');
                    console.log(userMeta.metas +'este es meta');

                   /* const components = meta.components;
                    console.log('meta.components')
                    components.forEach(component => {
                        console.log('s')
                        userMeta.metas.components.push(component);
                        console.log('s')
                      });*/
                    userMeta.save();
                    res.json({
                        sucess:true,
                        usermeta:userMeta,
                        message:'Se ha creado un nuevo meta user'
                    });
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

/*exports.postCrear = (req, res) => {
    const { username, name_rol } = req.body;
  
    // Validar que no estén vacíos
    if (!username || !name_rol) {
      return res.status(400).json({ message: 'Valores incompletos' });
    }
  
    User.findOne({ userName: username })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'El usuario no existe' });
        } else {
          Meta.findOne({ rol: name_rol })
            .then(meta => {
              if (!meta) {
                return res.status(404).json({ message: 'El meta no existe' });
              } else {
                const userMeta = new UserMeta({
                  user: user._id,
                  metas: [meta._id],
                });
  
                const components = meta.components;
                components.forEach(component => {
                  userMeta.components.push(component);
                });
  
                userMeta.save()
                  .then(() => {
                    res.json({
                      success: true,
                      usermeta: userMeta,
                      message: 'Se ha creado un nuevo meta user',
                    });
                  })
                  .catch(err => {
                    res.status(500).json({ message: 'Error al guardar el UserMeta', error: err });
                  });
              }
            })
            .catch(err => {
              res.status(500).json({ message: 'Error en la búsqueda del meta', error: err });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Error en la búsqueda del usuario', error: err });
      });
  };*/
//Mostrar el metauser
//Eliminar el metauser