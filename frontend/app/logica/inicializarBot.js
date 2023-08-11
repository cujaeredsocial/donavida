const funBot=require('./FuncionesBot.js');
require('dotenv').config();
const { Telegraf} = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN);
function inicializarBot() {
  funBot.formularioRegistro(bot);
  

  bot.launch();
}
module.exports = { inicializarBot };