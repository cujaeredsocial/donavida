class Usuario {

    constructor(nombreUsuario, clave, correo, id) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
        this.correo = correo;
        this.bloqueado=false;
        this.eliminado=false;
    }

}
module.exports = Usuario;