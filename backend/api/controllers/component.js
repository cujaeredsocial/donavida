const Component = require('../models/Component');


exports.post = (req,res) =>{
    const{etiqueta,name,type} = req.body;
    const valor = req.body.value;
    if(!etiqueta || !name || !type){
        console.log("entra al if")
        return res.status(400).json("Parametros incompletos");
    }
    Component.findOne({etiqueta:etiqueta})
    .then(component => {
        if(component){
            console.log("entra al if 2")
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
                message:"Componente creado excitosament",
                component:component
                });
        }
    })
    .catch(err =>{
        console.log("entra al error")
        res.json("Ha ocurrido un error " + err);
    });
};

///ojo la validacion es por la etiqueta pq no tiene sentido que sea la misma