VERSION 1.3
Cambios:
1. Cambios en el endpoint
2. Explicación de los endpoints nuevos
3. Nuevo campo de manager en el modelo de usuario
4. Se quito la pequeña pagina web que hice por ya no estar acorde a lo nuevo
5. Agrego de problemas comunes
6. Agrego y explicacion de como importar la base de datos

# ¿Qué es?
Un proyecto en node.js que contiene el acceso a una base de datos en MongoDB de usuarios. Incluye los métodos CRUD (Create, Read, Update and Delete) de cada usuario, así como una pequeña página web para que prueben las funciones.

# ¿Qué contiene?
Un controlador: user.js donde se encuentran los métodos de acceso a la base de datos para cada tipo de función
Un modelo: user.js, contiene el nombre, contraseña, email y si es manager o no (boolean, si es verdadero es gestor, si es falso es donante) 
Un archivo de rutas: login.js, une cada URL con cada función respectivamente
El index.js donde se inicia la App y el servidor con la base de datos que se llama donavidaDB

# ¿Cómo abrirlo?
Actualizan el proyecto con el que esta en GitHub
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
Ahí escriben el siguiente comando npm start, abren un navegador cualquiera y escriben localhost:27000.
En caso que les diga que falta algún modulo pueden dar `npm i` para que se instale todo en el package.json. Ademas pueden hacer instalar de forma manual (para instalar módulos deben estar conectados a internet)
Módulos necesarios
Una vez abierto deben ir al archivo index.js, después abren la terminal en View, Terminal.
En la terminal, una vez abierta proceden a instalar los módulos necesarios con los siguientes comandos:
npm install –-save node
npm install –-save path
npm install –-save express
npm install -–save nodemon
npm install –-save body-parser
npm install –-save mongodb
npm install –-save mongoose
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
En los endpoints nuevos hay 7 que se explicaran a continuacion, 4 terminados y 3 en desarrollo:
*Importante todo se devuelve en un archivo JSON
Metodos POST:
1. Crear un usuario:
  - Nombre: postCreateUser
  - URL: '/createuser'
  - Recibe: username:String, email:String, password:String, manager:boolean
  - Devuelve:
    + Correcto: Mensaje de correcto mas la informacion del usuario recien creado
    + Incorrecto: Mensaje de error con las caracteristicas de error
  * Importante al crear un usuario el email es unico, se se repite no lo guarda y devuelve un error de duplicado
2. Actualizar un usuario:
  - Nombre: postUpdateUser
  - URL: '/updateuser'
  - Recibe: userId: String, username:String, email:String, password:String, manager:boolean
  - Devuelve:
    + Correcto: Mensaje de correcto mas la informacion del usuario recien actualizado
    + Incorrecto: Mensaje de error con las caracteristicas de error
  * Importante el id del usuario se genera automaticamente cuando se crea y para pedirselo es la variable de tipo_usuario._id.
3. Buscar todos los donantes:
  - Nombre: postAllDonorsUsers
  - URL: '/donorssusers'
  - Recibe: NADA
  - Devuelve:
    + Correcto: Mensaje de correcto mas la informacion de todos los usuarios donantes
    + Incorrecto: Mensaje de error con las caracteristicas de error
4. Eliminar un usuario:
  - Nombre: postDeleteUser
  - URL: '/deleteuser'
  - Recibe: userId:String
  - Devuelve:
    + Correcto: Mensaje de correcto mas la informacion del recien eliminado
    + Incorrecto: Mensaje de error con las caracteristicas de error
  * Importante el id del usuario se genera automaticamente cuando se crea y para pedirselo es la variable de tipo_usuario._id.
  5. Leer un usuario por nombre y contrasenna:
  - Nombre: postReedUser
  - URL: '/user'
  - Recibe: username:String, password:String
  - Devuelve:
    + Correcto: El usuario si existe o un User not exist si no lo hace
    + Incorrecto: Mensaje de error con las caracteristicas de error
  6. Buscar todos los usuarios:
  - Nombre: postCreateUser
  - URL: 'allusers'
  - Recibe: nada
  - Devuelve:
    + Correcto: Un arreglo con todos los usuarios
    + Incorrecto: Mensaje de error con las caracteristicas de error
  7. Buscar todos los usuarios gestores:
  - Nombre: postAllManagersUsers
  - URL: '/managersuser'
  - Recibe: NADA
  - Devuelve:
    + Correcto: Mensaje de correcto mas la informacion de todos los manager donantes
    + Incorrecto: Mensaje de error con las caracteristicas de error
# Errores Tratados
  - 400 : error de inscripcion
  - 401 : error de filtrado
  - 402 : error de actualizacion
  - 403 : error de busqueda
  - 404 : error de eliminacion

# Errores Comunes
1. A la hora de escribir npm start deben estar en .backend/api, o sea cual sea la direccion del package.json del archivo; esto es en la terminal integrada
2. Tengan en cuenta que la URL y el nombre de la funcion son cosas distintas por ejemplo al metodo de crear usuarios postCreateUser, de hacerlo mediante la URL: http://localhost:2000/createuser

# Base de datos de prueba
 En la siguiente ruta donavida/backend/api/dump_db hay dos archivo:
 1. El archivo donavidaDB.json NO es necesario importarlo si ya han usado la base de datos antes, ese archivo es simplemente la configuracion de la conexion, lo que vendria siendo lo mismo que conectarse a mongodb://localhost:27017 en MongoDBCompass o en la extension de MongoDB de Visual Code
 
 2. El archivo donavidaDB.users.json es el juego de datos para que prueben funciones, para añadirla los siguientes pasos:
    * Si ya te ha conectado anteriormente 
    1. Abrir el MongoDBCompass y presionar Connect
    2. Seleccionar la base de datos donavidaDB.
    3. Seleccionar la colección users.
    4. Presionar ADD DATA
    5. Presionar Import JSON or CSV file
    6. Buscar el archivo donavidaDB.users.json
    * Si no te has conectado anteriormente
    1. Abrir el MongoDBCompass
    2. Importar el archivo anterior o copiar en la URL "mongodb://localhost:27017".
    3. Presionar Connect
    4. Crear la base de datos tocando en el botón + al lado de Databases con el nombre: donavidaDB.
    5. Seleccionar la base de datos donavidaDB.
    6. Crear la coleccion tocando en el botón + al lado de donavidaDB con el nombre: users.
    7. Seleccionar users
    8. Presionar ADD DATA
    9. Presionar Import JSON or CSV file
    10. Buscar el archivo donavidaDB.users.json
    