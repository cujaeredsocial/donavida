class Chat {
    constructor(id, nombreChat) {
        this._nombreChat = nombreChat;
        this._id = id;
    }
    set _id(id) {
        this._id = id;
    }
    get _id() {
        return this._id;
    }

    set nombreChat(nombreChat) {
        this._nombreChat = nombreChat;
    }
    get nombreChat() {
        return this._nombreChat
    }
}

module.exports = Chat;