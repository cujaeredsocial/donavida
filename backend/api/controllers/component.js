const Component = require('../models/Component');


exports.post = (req,res) =>{
    const{etiqueta,name,type} = req.body;
    const valor = req.body.value;
    if(!etiqueta || !name || !type){
            return res.status(400).json("Parametros incompletos");
    }
    Component.findOne({name:name})
    .then(component => {
        if(component){
            return res.status(400).json("Componente ya existente");
        }else{
            console.log("entra al else")
            component  = new Component({
                etiqueta:etiqueta,
                name:name,
                type:type,
                value:valor
            });
            component.save();
            res.json({
                success:true,
                message:"Componente creado exitosamente",
                component:component
                });
        }
    })
    .catch(err =>{
        console.log("entra al error")
        res.json("Ha ocurrido un error " + err);
    });
};




exports.getComponent = (req, res) => {
    const name = req.params.name;
    Component.findOne({name:name}).then(component=>{
        if(component){
            res.json(component);
        }else {
            throw new Error("No existe componente con ese nombre");
        }
    }
        ).catch(err=>{
            res.status(404).json(err);
        })
  };




///ojo la validacion es por la etiqueta pq no tiene sentido que sea la misma