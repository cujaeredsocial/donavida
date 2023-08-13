class AccesoAPI {
    constructor() { }
    get() {
        fetch(`http://127.00.1:27000/meta/plantilla/Donante`).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response;
        }).then((json) => {
            return json;
        }).catch(() => {
            console.log("Error en la operacion fetch");
        });

    }
    push(parametro) { }
    post(parametro) { }
    deletea(parametro) { }
    close() { }
}
module.exports = { AccesoAPI }



