const Chat=require('./Chat');
class Usuario {
    _chat;
    _tipoSanguineo;
    _id;
    _admin;
    _bloqueado;
    _donador;
    _carnet;
    constructor(id, admin, nombreChat, carnet) {
        this._chat = new Chat(id, nombreChat);
        this._admin = admin;
        this._bloqueado = false;
        this._donador = !admin;
        this._carnet = carnet;
        tipoSanguineo=null;
    }
    /**
     * @param {String} tipoSanguineo
     */
    set TipoSangre(tipoSanguineo) {
        this._tipoSanguineo = tipoSanguineo;
    }
    get TipoSangre() {
        return _tipoSanguineo;
    }

}
module.exports = Usuario;