//TODO algo que esta pendiente
//! problema en el codigo
//? Algo que debo quitar o mejorar
//* Informacion importante

const init = require('./logica/inicializarBot.js');
//init.inicializarBot();
const mongoose=require('mongoose');
const dbURL='mongodb://127.0.0.1:27017';//TE cambie esto, ya te debe pinchar

const{userModel}=('C:\\Users\\Marcos\\Documents\\repos\\donavida\\backend\\api\\models\\user.js');
mongoose.connect(dbURL,{UserNewUrlParser:true,userUnidiedTopology:true,userCreateIndex:true},(error)=>{
    if(error){
        console.error('Error al conectar a la base de datos');
    }else{
        console.log('Consexion existosa');
    }
});
const crearUsuario=()=>{
    userModel.create({
        userName:'PEPE',
        email:'tiquitiqui@gmail.com',
        password:'12345678',
        token:'021221'
    });
}
crearUsuario();
console.log("El bot esta funcionando");

