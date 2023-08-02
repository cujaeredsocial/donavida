const fs = require('fs');
const db = require("mongoose");
const DB_URI = "";
{
    var tokenAdmin = "Admin"
    var tokenUser = "User"
    const { Telegraf, Context } = require('telegraf');
    const axios = require('axios');
    const bot = new Telegraf('6165948452:AAEI05zCauAj1gk94z4_U2mP9cc_KfrZ1lU');
    const mensajeAyuda = "comandos:\n/start: Iniciar chat.\n/registrarse: Crear una cuenta en el bot. Luego del comando tiene que poner el token y su carnet dearado por espacios. Ej: /registrarse token 02091212340.\n/listaUsuarios->Admins: Obtener la lista de usuarios inscritos al bot.\n/bloquear->Admins: Bloquear a un usuario.\n/detener: Eliminar tu cuenta de la lista de usuarios.\n/lanzarEvento->Admins: informar de una solicitud de donacion.\n/miFicha: Ver la informacion de tu ficha.\n/serDonador->Los admins: Los admins se no son donadores a menos que asi lo definan con este comando.\n/definirTipoSangre: Registra tu tipo de sangre.";
    var listaUsuarios = [];

    //################ CODIGO ##############//
    if (listaUsuarios.length === 0) {
        listaUsuarios = cargar();
    }

    bot.help((ctx) => {
        var pos = buscar(ctx, listaUsuarios);
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
            const pos = buscar(ctx, listaUsuarios);
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
        if(validarCarnet(info[2])){
        var admin = (info[1] === tokenAdmin) ? true : false;
        if (info[1] !== tokenAdmin && info[1] !== tokenUser) {
            ctx.reply("Los tokens son invalidos");
        } else {
            if (listaUsuarios.length === 0) {
                listaUsuarios[0] = new Usuario(ctx.chat.id, admin, ctx.message.from.username, info[2]);
                actualizar(listaUsuarios);
                var resp = admin ? "Administrador" : "Usuarios";
                ctx.reply("@" + ctx.chat.username + " Usted se ha autenticado como " + resp);
                avisoDeInscripcion(ctx.message.from.username, listaUsuarios, bot, admin);
            } else {
                const pos = buscar(ctx, listaUsuarios);
                if (pos !== -1) {
                    if (listaUsuarios[pos].bloqueado) {
                        ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
                    }
                } else {
                    listaUsuarios.push(new Usuario(ctx.chat.id, admin, ctx.message.from.username, info[2]));
                    actualizar(listaUsuarios);
                    var resp = admin ? "Administrador" : "Usuarios";
                    ctx.reply("@" + ctx.chat.username + " Usted se ha autenticado como " + resp);
                    avisoDeInscripcion(ctx.message.from.username, listaUsuarios, bot, admin);
                }

            }
        }}else{
            ctx.reply("El carnet introducido es invalido")
        }
    });

    bot.command("listaUsuarios", (ctx) => {
        var texto = ""
        const pos = buscar(ctx, listaUsuarios);
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
        const pos = buscar(ctx, listaUsuarios);
        if (pos !== -1) {
            if (listaUsuarios[pos].bloqueado) {
                ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
            } else if (listaUsuarios[pos].admin) {
                if (bloquear(ctx.update.message.text.split(" ")[1], listaUsuarios, bot)) {
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
        const pos = buscar(ctx, listaUsuarios);
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
        const pos = buscar(ctx, listaUsuarios);
        if (pos !== -1) {
            if (listaUsuarios[pos].bloqueado) {
                ctx.reply("No puede usar la aplicacion. Esta bloqueado. Comuniquese con algun Administrador.");
            } else if (listaUsuarios[pos].admin) {
                enviarMensaje(ctx, listaUsuarios, bot);
            } else {
                ctx.reply("Esta accion solo es valida para los administradores")
            }

        } else {
            ctx.reply("Por favor introduzca un token antes de interactuar.")
        }
    });

    bot.command("miFicha", (ctx) => {
        const pos = buscar(ctx, listaUsuarios);
        if (pos !== -1) {
            ctx.reply(listaUsuarios[pos]);
        } else {
            tx.reply("Por favor introduzca un token antes de interactuar.")

        }
    });

    bot.command("serDonador", (ctx) => {
        const pos = buscar(ctx, listaUsuarios);
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
        const pos = buscar(ctx, listaUsuarios);
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

function buscar(ctx, listaU) {
    for (var i = 0; i < listaU.length; i++) {
        if (ctx.chat.id === listaU[i].id) {
            return i;
        }
    }

    return -1;
}

function avisoDeInscripcion(nuevoMiembro, listaU, bot, admin) {
    for (var i = 0; i < listaU.length; i++) {
        if (listaU[i].nombreUsuario !== nuevoMiembro) {
            if (listaU[i].admin) {
                if (admin) {
                    bot.telegram.sendMessage(listaU[i].id, "@" + nuevoMiembro + " se ha unido al bot como Administrador");
                } else {
                    bot.telegram.sendMessage(listaU[i].id, "@" + nuevoMiembro + " se ha unido al bot como Donador");
                }
            }
        }
    }
}

function bloquear(nombre, listaU, bot) {
    for (var i = 0; i < listaU.length; i++) {
        if (nombre === "@" + listaU[i].nombreUsuario) {
            listaU[i].bloqueado = true;
            bot.telegram.sendMessage(listaU[i].id, "Usted ha sido bloqueado. Contacte a alguno de los administradores para mas informacion");
            return true;
        }
    }
    return false;
}

class Usuario {
    tipoSanguineo;
    id;
    admin;
    bloqueado;
    nombreUsuario;
    donador;
    carnet;
    constructor(id, admin, nombreUsuario, carnet) {
        this.id = id;
        this.admin = admin;
        this.bloqueado = false;
        this.nombreUsuario = nombreUsuario;
        this.donador = !admin;
        this.carnet = carnet;

    }
    setTipoSangre(tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
    }


}

function enviarMensaje(ctx, listadoU, bot) {
    var sms = ctx.update.message.text;
    sms = sms.slice(13, sms.length - 1);
    for (var i = 0; i < listadoU.length; i++) {
        if (!listadoU[i].bloqueado && listadoU[i].id !== ctx.chat.id) {
            if (listadoU[i].donador) {
                bot.telegram.sendMessage(listadoU[i].id, sms);
            }
        }
    }
}

function cargar() {
    try {
        const data = fs.readFileSync('Usuarios.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        } else {
            throw err;
        }
    }
}

function actualizar(listaUsuario) {
    const data = JSON.stringify(listaUsuario);
    fs.writeFileSync('Usuarios.json', data);
}
function validarCarnet(carnet) {
    if (carnet.length !== 11) {
        return false;
    }
    let fechaNacimiento = carnet.slice(0, 6);
    let anio = parseInt(fechaNacimiento.slice(0, 2));
    let mes = parseInt(fechaNacimiento.slice(2, 4));
    let dia = parseInt(fechaNacimiento.slice(4, 6));
    if (isNaN(anio) || isNaN(mes) || isNaN(dia)) {
        return false;
    }
    if (mes < 1 || mes > 12) {
        return false;
    }
    if (dia < 1 || dia > 31) {
        return false;
    }
    return true;
}
