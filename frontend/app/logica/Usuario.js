const Chat = require('./Chat.js');
class Usuario {
    constructor(id, admin, nombreChat, carnet) {
        this._chat = new Chat(id, nombreChat);
        this._admin = admin;
        this._bloqueado = false;
        this._donador = !admin;
        this._carnet = carnet;
        this._tipoSanguineo = undefined;
    }
    //############setters###########
    set TipoSangre(tipoSanguineo) {
        this._tipoSanguineo = tipoSanguineo;
    }
    set admin(admin) {
        this._admin = admin;
    }
    set bloqueado(bloqueado) {
        this._bloqueado = bloqueado;
    }
    set donador(donador) {
        this._donador = donador;
    }
    set carnet(carnet) {
        this._carnet = carnet;
    }
    //############getters###########
    get TipoSangre() {
        return _tipoSanguineo;
    }
    get admin() {
        return admin;
    }
    get bloqueado() {
        return _bloqueado;
    }
    get donador() {
        return _donador;
    }
    get carnet() {
        return _carnet;
    }

    toString() {
        console.log("{\ntipoSanguineo:String=" + tipoSanguineo + "\nadmin:booleano=" + admin + "\n..." + "\nchat:Chat=" + "{\n" + this._chat.toString + "\n}");
    }

}
module.exports = Usuario;