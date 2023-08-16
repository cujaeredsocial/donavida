const Rol = require("../models/Rol");//importar rol

//Crear un usuario

exports.post = (req,res) =>{
    //Verificar que ningun campo esta vacio
    const{name,description} = req.body;
    if(!name || !description){
        return res.status(400).json({ message: 'El rol no puede ser creado' });
    }
     //Verificar que el rol no se repita
     Rol.findOne({name:name})
     .then(rol =>{
        if(rol){
            return res.status(400).json({ message: 'El rol ya existe' });
        }else{
            rol = new Rol({
            name:name,
            description:description
        });
        rol.save();
        res.json({ message: 'Rol creado exitosamente', rol });
        //res.send(Json(user));
        }
     })
     .catch(err => {
        res.status(400).json("el error es"  + err);
     });
    

}

 //Verificar que el rol no se repita
 //Crear Rol
 //Guardar Rol
 