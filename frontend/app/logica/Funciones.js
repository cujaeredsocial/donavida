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
function buscarUsuario(listaUsuarios, usuarioNombre) {

    for (var i = 0; i < listaUsuarios.length; i++) {
        if (usuarioNombre === "@" + listaUsuarios[i].nombreUsuario) {
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

function cargar(fichero) {
    try {
        const data = fs.readFileSync(fichero, 'utf8');
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

function actualizar(listaUsuario, fichero) {
    const data = JSON.stringify(listaUsuario);
    fs.writeFileSync(fichero, data);
}

function validarCarnet(carnet) {
    if (carnet === undefined || carnet === null) {
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

function CompativilidadSnguinea(tipoSangre) {
    switch (tipoSangre) {
        case "A+": return ["A+", "AB+"];
        case "A-": return ["A+", "A-", "AB+", "AB-"];
        case "B+": return ["B+", "AB+"];
        case "B-": return ["B+", "B-", "AB+", "AB-"];
        case "AB+": return ["AB+"];
        case "AB-": return ["AB-", "AB+"];
        case "O+": return ["A+", "AB+", "B+", "O+"];
        case "O-": return ["A+", "A-", "AB+", "AB-", "B-", "B+", "O+"];
        default: return null;
    }
}

function generarToken() {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var resultado = "";
    for (var i = 0; i < 10; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}

function guardarClaves(StringToken, booleaAdmin) {
    var rutaArchivo = ".mar"
    const datos = JSON.parse(fs.readFileSync(rutaArchivo));
    if (booleaAdmin) {
        datos.claveAdministrador = StringToken;
    } else {
        datos.claveUsuario = StringToken;
    }
    fs.writeFileSync(rutaArchivo, JSON.stringify(datos));
}

function leerClaves(admin) {
    var rutaArchivo = ".mar"
    const datos = JSON.parse(fs.readFileSync(rutaArchivo));
    return admin ? datos.claveAdministrador : datos.claveUsuario;
}
function validaCorreo(correo) {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(correo);
}

module.exports = { validaCorreo, guardarClaves, leerClaves, generarToken, CompativilidadSnguinea, buscar, buscarUsuario, avisoDeInscripcion, bloquear, enviarMensaje, cargar, actualizar, validarCarnet };