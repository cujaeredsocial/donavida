const fun = require('./Funciones.js');
//const { Scenes, session } = require('telegraf');
const { AccesoAPI } = require('./AccesoAPI.js');
const acceso = new AccesoAPI();
const gestor = (ctx, state, user) => {
  switch (state) {
    case 'empty':
      ctx.reply('Lo lamento. mis funciones no son capaces aun de llevar una conversacion abierta');
      return state;
    case 'nameReg':
      user.username = ctx.message.text;
      ctx.reply('Por favor introduzca una contraseña');
      state = 'passwordReg';
      return state;
    case 'passwordReg':
      user.username = ctx.message.text;
      ctx.reply('Por favor introduzca un correo')
      state = 'emailReg';
      return state;
    case 'emailReg':
      user.email = ctx.message.text;
      user.id = ctx.message.from.id;
      acceso.post(user);
      cleanUser(user);
      state = 'empty';
      ctx.reply("Usted ha sido añadido al sistema")
      return state;
    case 'nameLog':
      const userList = acceso.get();
      user.mame = ctx.message.text;
      //?Asumo que la API me devuelva una lista de json
      acceso.get(user.name);
      var isInList = false;
      for (var i = 0; i < userList.lenght; i++) {
        if (userList[i] === user.mame) {
          isInList = true;
          user = userList[i];
        }
      }
      if (isInList) {
        ctx.reply("Introduca su contraseña");
        state = 'passwordLog';
        return state;
      } else {
        ctx.reply("No fue encontrado en el sistema. Revise la ortografia o inscribase ( /registrarse )");
        cleanUser(user);
        return 'empty';
      }
    case 'passwordLog':
      if (ctx.message.text === user.password) {
        user.id=ctx.message.from.id;
        acceso.push(user);
        cleanUser(user);
        ctx.reply('Usted se ha autentificado en el sistema');
        return 'empty';
      }else{
        ctx.reply("Contraseña incorrecta");
        cleanUser(user);
        return 'empty';
      }
    case 'cancelar':
      ctx.reply("Formulario cancelado")
      cleanUser(user);
      return state;
  }
}
const cleanUser = (user) => {
  user.name = '';
  user.id = '';
  user.password = '';
  user.email = '';
}


module.exports = { gestor, cleanUser };