const funBot = require('./FuncionesBot.js');
require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const { AccesoAPI } = require('./logica/AccesoAPI.js')
const acceso = new AccesoAPI();
const userListUpdate=()=>{
  userList=acceso.get();
}
function inicializarBot() {
  var state = 'empty';
  const user = {
    username: '',
    password: '',
    email: '',
    id: ''
  }
  bot.command('registrarse', (ctx) => {
    funBot.cleanUser(user);
    state = 'nameReg';
    ctx.reply('Introduzca un nombre de usuario por favor')
  });
  bot.command('autenticarse', (ctx) => {
    state = 'nameLog';
    ctx.reply('Introduzca su nombre de usuario')
    funBot.cleanUser(user);
  });
  bot.hears(/.*/, (ctx) => {
    state = funBot.gestor(ctx, state, user);
  });
  bot.launch();
}
module.exports = { inicializarBot, userListUpdate };