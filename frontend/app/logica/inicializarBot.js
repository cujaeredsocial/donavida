const Usuario = require('./Usuario.js');
const fun = require('./Funciones.js');
require('dotenv').config();
const botToken = process.env.BOT_TOKEN;
const { Telegraf, Context } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN);
const mensajeAyuda = "comandos:\n/start: Iniciar chat.\n/registrarse: Crear una cuenta en el bot. Luego del comando tiene que poner el token y su carnet dearado por espacios. Ej: /registrarse token 02091212340.\n/listaUsuarios->Admins: Obtener la lista de usuarios inscritos al bot.\n/bloquear->Admins: Bloquear a un usuario.\n/detener: Eliminar tu cuenta de la lista de usuarios.\n/lanzarEvento->Admins: informar de una solicitud de donacion.\n/miFicha: Ver la informacion de tu ficha.\n/serDonador->Los admins: Los admins se no son donadores a menos que asi lo definan con este comando.\n/definirTipoSangre: Registra tu tipo de sangre.";
function inicializarBot() {
  var tokenAdmin = fun.leerClaves(true);
  var tokenUser = fun.leerClaves(false);
  var listaUsuarios = fun.cargar();
  //################ CODIGO ##############//
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
            listaUsuarios[0] = new Usuario(ctx.from.id, admin, ctx.message.from.username, info[2]);
            fun.actualizar(listaUsuarios);
            var resp = admin ? "Administrador" : "Usuarios";
            ctx.reply("@" + ctx.form.username + " Usted se ha autenticado como " + resp);
            fun.avisoDeInscripcion(ctx.message.from.username, listaUsuarios, bot, admin);
          } else {
            const pos = fun.buscar(ctx, listaUsuarios);
            if (pos !== -1) {
              if (listaUsuarios[pos].bloqueado) {
                ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
              }
            } else {
              listaUsuarios.push(new Usuario(ctx.from.id, admin, ctx.message.from.username, info[2]));
              fun.actualizar(listaUsuarios);
              var resp = admin ? "Administrador" : "Usuarios";
              ctx.reply("@" + ctx.from.username + " Usted se ha autenticado como " + resp);
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
  bot.command("desbloquear", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
      } else if (listaUsuarios[pos].admin) {
        if (ctx.update.message.text.split(" ").length === 2) {
          const posU = fun.buscarUsuario(listaUsuarios, ctx.update.message.text.split(" ")[1]);
          if (posU === -1) {
            ctx.reply(`El usuario instroducido no existe. Consulte la lista de usuarios e intentelo de nuevo`);
          } else if (!listaUsuarios[posU].bloqueado) {
            ctx.reply(`El usuario introducido no esta boqueado`);
          } else {
            listaUsuarios[posU].bloqueado = false;
            bot.telegram.sendMessage(listaUsuarios[posU].id, `Usted ha sido desbloqueado por un Administrador`);
            ctx.reply(`@${listaUsuarios[posU].nombreUsuario} ha sido desbloqueado con exito`);
          }
        } else {
          ctx.reply(`La cantidad de elementos introducida es invalida`);
        }
      } else {
        ctx.reply("Esta accion solo es valida para los administradores");
      }
    } else {
      ctx.reply("Por favor introduzca un toquen antes de interactuar. Recuerde la estructura es: Comando @usuario");
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
          texto += "@" + listaUsuarios[i].nombreUsuario;
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
        if (ctx.update.message.text.split(" ").length === 2) {
          if (fun.bloquear(ctx.update.message.text.split(" ")[1], listaUsuarios, bot)) {
            fun.actualizar(listaUsuarios);
            ctx.reply("Bloqueo exitoso")
          } else {
            ctx.reply("Algo fallo. El usuario no fue encontrado")
          }
        } else {
          ctx.reply(`La cantidad de elementos introducida es invalida`);
        }
      } else {
        ctx.reply("Esta accion solo es valida para los administradores");
      }
    } else {
      ctx.reply("Por favor introduzca un toquen antes de interactuar. Recuerde la estructura es: Comando @usuario");
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
  bot.command("tokens", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      if (listaUsuarios[pos].bloqueado) {
        ctx.reply("Usted esta bloqueado. Es imnecesario que detenga el bot");
      } else {
        ctx.reply(`Token usuario: ${fun.leerClaves(false)}\nToken administrador: ${fun.leerClaves(true)} `);
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
      ctx.reply(listaUsuarios[pos].toString() + "\nPosibles receptores: " + fun.CompativilidadSnguinea(listaUsuarios[pos].tipoSanguineo));
    } else {
      tx.reply("Por favor introduzca un token antes de interactuar.")

    }
  });
  bot.command("generarToken", (ctx) => {
    const pos = fun.buscar(ctx, listaUsuarios);
    if (pos !== -1) {
      var sms = ctx.update.message.text.split(" ");
      if (sms.length === 2) {
        if (listaUsuarios[pos].bloqueado) {
          ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
        } else if (listaUsuarios[pos].admin) {
          if (sms[1] === "Administrador") {
            tokenAdmin=fun.generarToken();
            fun.guardarClaves(tokenAdmin,true);
            ctx.reply("el nuevo token de Administrador es: " + tokenAdmin);
          } else if (sms[1] === "Usuario") {
            tokenUser=fun.generarToken();
            fun.guardarClaves(tokenUser,false);
            ctx.reply("el nuevo token de Usuario es: " + tokenUser);
          } else {
            ctx.reply("Solamente se puede generer tokens para usuario o administrador");
          }
        } else {
          ctx.reply("Esta accion solo es valida para los administradores")
        }
      } else {
        ctx.reply(`La cantidad de elementos introducida es invalida`);
      }

    } else {
      ctx.reply("Por favor introduzca un token antes de interactuar.")
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
        listaUsuarios[pos].setTipoSangre(sms.slice(19, sms.length));
        ctx.reply("Tipo de sangre: " + listaUsuarios[pos].tipoSanguineo + "\n<<guardado>>");
        fun.actualizar(listaUsuarios);
      }

    } else {
      ctx.reply("Por favor introduzca un token antes de interactuar.")
    }
  });

  bot.launch();
}
module.exports = { inicializarBot };