const init = require('./logica/inicializarBot.js');
const fun = require("./logica/Funciones.js");
fun.guardarClaves("Admin", "User");
console.log(fun.leerClaves(true) + ` ${fun.leerClaves(false)}`);

init.inicializarBot();
console.log("El bot esta funcionando");

