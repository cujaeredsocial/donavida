class Chat{
    constructor(id,nombreUsuario){
        this.id=id;
        this.nombreUsuario=nombreUsuario;
    }
    toString(){
        return `Nombre grupo: @${this.nombreUsuario}\nTipo: Gupo`;
    }
}
module.exports = Chat;