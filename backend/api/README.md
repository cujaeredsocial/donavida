# ¿Qué es?
Un proyecto en node.js que contiene el acceso a una base de datos en MongoDB de usuarios. Incluye los métodos CRUD (Create, Read, Update and Delete) de cada usuario, así como una pequeña página web para que prueben las funciones.

# ¿Qué contiene?
Un controlador: user.js donde se encuentran los métodos de acceso a la base de datos para cada tipo de función
Un modelo: user.js, contiene el nombre, contraseña e email
Un archivo de rutas: login.js, une cada URL con cada función respectivamente
4 archivos de página web en views para la vista
El index.js donde se inicia la App y el servidor con la base de datos que se llama donavidaDB

# ¿Cómo abrirlo?
Descomprimen el RAR, van al Visual Code, seleccionan File, Open Folder  y seleccionan la carpeta del proyecto.
Requisitos previos
En caso que no lo tenga, deben descargar e instalar:
NODE.js  https://nodejs.org/es/download
MONGODB  https://www.mongodb.com/try/download/community
Importante: Configurar MongoDB
Una vez instalado, el node.js no necesita configuración, pero el mongoDB si, para ello los siguientes pasos:
1. Busquen en C:\Program Files\MongoDB\Server\6.0\bin y ejecuten mogod.exe
2. Busquen en Visual Code la extensión de MongoDB e instálenla
3. Debe abrirse una pestaña  en VSCode con MongoDB, caso contrario escriban en el buscador view MongoDB, en la ventana izquierda en la esquina superior derecha, presionen en los tres puntos suspensivos y seleccionen Add MongoDB connection
4. Presionen el botón Connect debajo del letrero Connect with Connection String
5. El cursor irá al buscador y copien lo siguiente mongodb://localhost:27017
5. Presionen enter y listo 

# ¿Cómo compilarlo?
Una vez abierto deben ir al archivo index.js, después abren la terminal en View, Terminal.
Ahí escriben el siguiente comando npm start, abren un navegador cualquiera y escriben localhost:2000.
En caso que les diga que falta algún modulo aquí les dejo los módulos que deben instalar (para instalar módulos deben estar conectados a internet)
Módulos necesarios
Una vez abierto deben ir al archivo index.js, después abren la terminal en View, Terminal.
En la terminal, una vez abierta proceden a instalar los módulos necesarios con los siguientes comandos:
npm install –save node
npm install –save path
npm install –save express
npm install –save nodemon
npm install –save body-parser
npm install –save mongodb
npm install –save mongoose
*Fíjense que antes de save son dos plecas.
Una vez hecho todo esto debería funcionar, si no me escriben.
Lo más importante: Como acceder a la base de datos:
Para ello deben tener un previo conocimiento de lo que son los post y los get, que no son más que tipos de peticiones que se hacen desde el front. Ahora, abran el archivo routes/login.js. Verán una serie de métodos que une la URL con una función. Ejemplo:
Router.get(´/login´,userController.getLogin)
Get—es la funcion que les explique antes, puede ser post y muchas otra
/login—la url, si creas un link o un botón en la página web que posea ese url con el método anterior, realizara la función getLogin
.getLogin—la función que accede a base de datos

Pueden usar la función definida en la línea, si cambian la url o el método get o ambos a su gusto, pero es importante tener en cuenta que cada función redirige a otra url.
Funciones:
Tengan en cuenta que todo lo que devuelve cada función es a una página específica, por ejemplo:
exports.getUsers = (req, res, next) => { 
 User.find()
    .then(users => {
      res.render("login", { //Devuelve hacia la página de Login
        title: "Login",
        users: users,  //Un Array de usuarios
      });
    })
    .catch(err => console.log(err));
};
# EndPoint
•	getUsers: Devuelve todos los usuarios de la base de datos 
•	postUser: Recibe un username y un password y devuelve el respectivo usuario, si no existe da error
•	getUpdate: Recibe un id para buscar un usuario y lo pasa a la página web de edición
•	postUpdate: Recibe el usuario del método anterior y le modifica cada parámetro para después guardarlo
•	getRegister: Abre la página de registro de usuario
•	postAddUser: recibe un username, password y un email, crea una nuevo usuario con ellos y lo guarda en la base de datos
•	getUserAndDelete: recibe un id de usuario y elimina el id de ese usuario

Si quisieran usar algún función es tan simple como cambiar la URL en la ruta (routes/login.js) y cambiar la URL que devuelve el método en el controlador (controller/user). De todas formas, si no saben cómo hacer algo específico, pregúntenle a ChatGPT, que para entender estas cosas es bastante útil.
