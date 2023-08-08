//TODO algo que esta pendiente
//! problema en el codigo
//? Algo que debo quitar o mejorar
//* Informacion importante

const init = require('./logica/inicializarBot.js');
const fun = require("./logica/Funciones.js");
fun.guardarClaves("Admin", "User");

init.inicializarBot();
console.log("El bot esta funcionando");

