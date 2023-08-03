const Usuario = require('./Usuario.js');
const fun = require('./Funciones.js');
require('dotenv').config();
const botToken = process.env.BOT_TOKEN;
var tokenAdmin = "Admin"
var tokenUser = "User"
const { Telegraf, Context } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN);
const mensajeAyuda = "comandos:\n/start: Iniciar chat.\n/registrarse: Crear una cuenta en el bot. Luego del comando tiene que poner el token y su carnet dearado por espacios. Ej: /registrarse token 02091212340.\n/listaUsuarios->Admins: Obtener la lista de usuarios inscritos al bot.\n/bloquear->Admins: Bloquear a un usuario.\n/detener: Eliminar tu cuenta de la lista de usuarios.\n/lanzarEvento->Admins: informar de una solicitud de donacion.\n/miFicha: Ver la informacion de tu ficha.\n/serDonador->Los admins: Los admins se no son donadores a menos que asi lo definan con este comando.\n/definirTipoSangre: Registra tu tipo de sangre.";
var listaUsuarios = [];
function inicializarBot() {

  //################ CODIGO ##############//
  if (listaUsuarios.length === 0) {
    listaUsuarios = fun.cargar();
  }

  bot.help((ctx) => {
    var pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (!listaUsuarios[pos].bloqueado) {
        ctx.reply(mensajeAyuda);
      } else {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      }
    } else {
      tx.reply("Por favor introduzca un toquen antes de interactuar.")
    }
  });

  bot.start((ctx) => {
    if (listaUsuarios.length === 0) {
      ctx.reply("Hola bienvenido. Introduzca un token");
    } else {
      const pos = fun.buscar(ctx, listaUsuarios);
      if (pos !== -1) {
        if (!(listaUsuarios[pos].bloqueado)) {
          ctx.reply("Hola bienvendido de nuevo");
        } else {
          ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
        }
      } else {
        ctx.reply("Hola bienvenido. Introduzca un token");
      }
    }
  });

  bot.command("registrarse", (ctx) => {
    var info = ctx.update.message.text.split(" ")
    if (info.length < 3) {
      ctx.reply("Te ha faltado un elemento. La estructura del comando es: /Comando token carnetIdentidad")
    } else if (info.length < 3) {
      ctx.reply("Te ha sobrado un elemento o colocaste espacios en donde no iba. La estructura del comando es: /Comando token carnetIdentidad")
    } else {
      if (fun.validarCarnet(info[2])) {
        var admin = (info[1] === tokenAdmin) ? true : false;
        if (info[1] !== tokenAdmin && info[1] !== tokenUser) {
          ctx.reply("Los tokens son invalidos.");
        } else {
          if (listaUsuarios.length === 0) {
            listaUsuarios[0] = new Usuario(ctx.chat.id, admin, ctx.message.from.username, info[2]);
            fun.actualizar(listaUsuarios);
            var resp = admin ? "Administrador" : "Usuarios";
            ctx.reply("@" + ctx.chat.username + " Usted se ha autenticado como " + resp);
            fun.avisoDeInscripcion(ctx.message.from.username, listaUsuarios, bot, admin);
          } else {
            const pos = fun.buscar(ctx, listaUsuarios);
            if (pos !== -1) {
              if (listaUsuarios[pos].bloqueado) {
                ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
              }
            } else {
              listaUsuarios.push(new Usuario(ctx.chat.id, admin, ctx.message.from.username, info[2]));
              fun.actualizar(listaUsuarios);
              var resp = admin ? "Administrador" : "Usuarios";
              ctx.reply("@" + ctx.chat.username + " Usted se ha autenticado como " + resp);
              fun.avisoDeInscripcion(ctx.message.from.username, listaUsuarios, bot, admin);
            }

          }
        }
      } else if (fun.validarCarnet(info[1])) {
        ctx.reply("El carnet de identidad es lo ultimo que se coloca. La estructura del comando es: /Comando token carnetIdentidad")
      } else {
        ctx.reply("El carnet introducido es invalido")
      }
    }
  });

  bot.command("listaUsuarios", (ctx) => {
    var texto = ""
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      } else if (listaUsuarios[pos].admin) {
        for (var i = 0; i < listaUsuarios.length; i++) {
          texto += "@" + listaUsuarios[i].chat.nombreChat;
          if (listaUsuarios[i].bloqueado) {
            texto += "-bloqueado";
          }
          texto += "\n";
        }
        ctx.reply(texto);
      } else {
        ctx.reply("Esta accion solo es valida para los administradores")
      }
    } else {
      ctx.reply("Por favor introduzca un toquen antes de interactuar.")
    }
  });

  bot.command("bloquear", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      } else if (listaUsuarios[pos].admin) {
        if (fun.bloquear(ctx.update.message.text.split(" ")[1], listaUsuarios, bot)) {
          actualizar(listaUsuarios);
          ctx.reply("Bloqueo exitoso")
        } else {
          ctx.reply("Algo fallo. El usuario no fue encontrado")
        }
      } else {
        ctx.reply("Esta accion solo es valida para los administradores")
      }

    } else {
      ctx.reply("Por favor introduzca un toquen antes de interactuar.")
    }
  });

  bot.command("detener", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("Usted esta bloqueado. Es imnecesario que detenga el bot");
      } else {
        listaUsuarios.splice(pos, 1);
        ctx.reply("bot detenido");
        actualizar(listaUsuarios);
      }
    } else {
      ctx.reply("Usted no esta inscrito en el bot. Inscribace con un token");
    }
  });

  bot.command("T", (ctx) => {
    console.log(listaUsuarios);
  });

  bot.command("lanzarEvento", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      } else if (listaUsuarios[pos].admin) {
        fun.enviarMensaje(ctx, listaUsuarios, bot);
      } else {
        ctx.reply("Esta accion solo es valida para los administradores")
      }

    } else {
      ctx.reply("Por favor introduzca un token antes de interactuar.")
    }
  });

  bot.command("miFicha", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      ctx.reply(listaUsuarios[pos]);
    } else {
      tx.reply("Por favor introduzca un token antes de interactuar.")

    }
  });

  bot.command("serDonador", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      } else if (listaUsuarios[pos].donador) {
        ctx.reply("Ya eres donador");
      } else {
        ctx.reply("Ahora eres donador");
        listaUsuario[pos].donador = true;
        actualizar(listaUsuarios);
      }

    } else {
      ctx.reply("Por favor introduzca un token antes de interactuar.")
    }
  });
  bot.command("definirTipoSangre", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      } else {
        if (!listaUsuarios[pos].donador) {
          listaUsuarios[pos].donador = true;
        }
        const sms = ctx.update.message.text;
        listaUsuarios[pos].setTipoSangre(sms.slice(14, sms.length));
        ctx.reply("Tipo de sangre: " + listaUsuarios[pos].tipoSanguineo + "<<guardado>>");
        actualizar(listaUsuarios);
      }

    } else {
      ctx.reply("Por favor introduzca un token antes de interactuar.")
    }
  });

  bot.launch();
}
module.exports = { inicializarBot };