const Usuario = require('./Usuario.js');
const fun = require('./Funciones.js');
const { Scenes, session } = require('telegraf');
const{userModel}=('C:\\Users\\Marcos\\Documents\\repos\\donavida\\backend\\api\\models\\user.js')
function formularioRegistro(bot) {
  const step1 = new Scenes.BaseScene('step1');
  step1.enter((ctx) => ctx.reply('¿Cuál es tu nombre de usuario. Si no agrega ninguno se guardara con su nombre de usuario de telegram?'));
  step1.on('text', (ctx) => {
    ctx.session.name = ctx.message.text === "" ? ctx.from.username : ctx.message.text;
    ctx.scene.enter('step2');
  });
  const step2 = new Scenes.BaseScene('step2');
  step2.enter((ctx) => ctx.reply('Por favor introduzca una contraseña de almenos 6 caracteres'));
  step2.on('text', (ctx) => {
    if (ctx.message.text.length > 5) {
      if (ctx.message.text.length < 10) {
        ctx.session.password = ctx.message.text;
        ctx.scene.enter('step3');
      } else {
        ctx.reply("La contraseña es demaciado larga");
      }
    } else {
      ctx.reply("La contraseña es demaciado corta");
    }


  });
  const step3 = new Scenes.BaseScene('step3');
  step3.enter((ctx) => ctx.reply('Introduzca su correo'));
  step3.on('text', (ctx) => {
    if (fun.validaCorreo(ctx.message.text)) {
      ctx.session.gmail = ctx.message.text;
      bd.postcreateuser({ username: ctx.session.name, email: ctx.session.gmail, password: ctx.session.password },);
      ctx.reply(`Usted ha sido añadido al sistema`);
    } else {
      ctx.reply(`El correo introducido es invalido. intentelo de nuevo`);

    }
  });
  const stage = new Scenes.Stage([step1, step2, step3]);

  bot.use(session());
  bot.use(stage.middleware());

  bot.command('registrarse', (ctx) => ctx.scene.enter('step1'));
}
module.exports = { formularioRegistro }