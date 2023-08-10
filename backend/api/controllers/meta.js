const Meta = require('../models/Meta');
const Rol = require('../models/Rol');


exports.post = async(req,resp) => {
    //valido que el rol no este vacio
    const {rol,componentes} = req.body;
    if(!rol){
       return resp.status(400).json('Rol no valido');
    }
    //Valido la existencia de ese rol
    const rolexist = await Rol.exists({name:rol});
    if(!rolexist){
        console.log("entra al if")
       return resp.status(400).json('Este rol no existe');
    }
    Meta.findOne({rol:rol})
    .then(meta => {
        if(meta){
            console.log("entra al 2 if")
           Meta.updateOne({rol:rol},{componentes :componentes});
        }else{
            console.log("entra al else")
            meta = new Meta({
            rol: req.body.rol,
            componentes :req.body.componentes
        });
        meta.save();
        resp.json({
            success:true,
            message:"Fue creado la plantilla",
            meta: meta
        });
        }
    })
    .catch(err =>{
        resp.status(400).json("Error en la creacion" + err);
    })

}