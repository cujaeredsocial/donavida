
const fs = require('fs');
const Usuario = require('./Usuario.js');
function buscar(ctx, listaU) {
    for (var i = 0; i < listaU.length; i++) {
        if (ctx.from.id === listaU[i].id) {
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

function enviarMensaje(ctx, listadoU, bot) {
    var sms = ctx.update.message.text;
    sms = sms.slice(13, sms.length - 1);
    for (var i = 0; i < listadoU.length; i++) {
        if (!listadoU[i].bloqueado && listadoU[i].id !== ctx.from.id) {
            if (listadoU[i].donador) {
                bot.telegram.sendMessage(listadoU[i].id, sms);
            }
        }
    }
}

function cargar() {
    try {
        const data = fs.readFileSync('Usuarios.json', 'utf8');
        const usuariosData = JSON.parse(data);
        const usuarios = usuariosData.map(usuarioData => {
            const usuario = new Usuario();
            Object.assign(usuario, usuarioData);
            return usuario;
        });
        return usuarios;
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
    if(carnet===undefined||carnet===null){
        return false;
    }
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
module.exports={buscar,avisoDeInscripcion,bloquear,enviarMensaje,cargar,actualizar,validarCarnet};