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

    toString() {
        return `Nombre Usuario: @${this.nombreUsuario}\n funcion: ${this.admin ? "admin" : "donador"}\n ${this.bloqueado ? "bloqueado" : "no bloqueado"}\n Carnet: ${this.carnet}\n ${this.donador ? "donador\n" : ""} Tipo de sangre: ${this.tipoSanguineo !== undefined ? this.tipoSanguineo : "no establecido"}`;
    }
}
module.exports = Usuario;