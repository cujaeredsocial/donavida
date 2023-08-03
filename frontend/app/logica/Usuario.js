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
module.exports=Usuario;