VERSION 1.4
A partir de ahora voy a hacer un indice con el (NUEVO) y (ACTUALIZADO) en lo que tengan que revisar
Cambios:

# 1 ¿Qué es? (ACTUALIZADO)

# 2 ¿Qué contiene? (ACTUALIZADO)

# 3 ¿Cómo abrirlo?

# 4 ¿Cómo compilarlo? (ACTUALIZADO)

# 5 EndPoints (ACTUALIZADO)

# 6 Errores Tratados

# 7 Errores Comunes

# 8 Base de datos de prueba

# 9 Tokens (NUEVO)

# 1 ¿Qué es?

La API en node.js que contiene el acceso a una base de datos en MongoDB de usuarios. Incluye los métodos CRUD (Create, Read, Update and Delete) de cada usuario.

# 2 ¿Qué contiene?

Controladores:

1. user.js: Contiene todos los endpoint de los usuarios.

Base de Datos de Prueba: literal eso, ver sección para más detalles.

Middlewares: Actualmente una función de de autentificación para usarla cuando sea necesario.

Modelos:

1.  Usuario:
    userName: type:String, required:true, minLength:[4,'Name should be minimum of 4 characters']
    email: type:String,required:true, unique:true
    password:type:String,required:true,minLength:[8,'Password should be minimum of 8 characters']
    token:type:String (se añade solo, no hay que pasarlo)

Rutas:

1. users.js: conecta todas las rutas de los endpoint que tienen que ver con los usuarios.

index principal con la creación del server y la conexión a mongoDB.

# 3 ¿Cómo abrirlo?

Actualizan el proyecto con el que esta en GitHub
Requisitos previos
En caso que no lo tenga, deben descargar e instalar:
NODE.js https://nodejs.org/es/download
MONGODB https://www.mongodb.com/try/download/community
Importante: Configurar MongoDB
Una vez instalado, el node.js no necesita configuración, pero el mongoDB si, para ello los siguientes pasos:

1. Busquen en C:\Program Files\MongoDB\Server\6.0\bin y ejecuten mogod.exe
2. Busquen en Visual Code la extensión de MongoDB e instálenla
3. Debe abrirse una pestaña en VSCode con MongoDB, caso contrario escriban en el buscador view MongoDB, en la ventana izquierda en la esquina superior derecha, presionen en los tres puntos suspensivos y seleccionen Add MongoDB connection
4. Presionen el botón Connect debajo del letrero Connect with Connection String
5. El cursor irá al buscador y copien lo siguiente mongodb://localhost:27017
6. Presionen enter y listo

# 4 ¿Cómo compilarlo?

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
npm install –-save bcryptjs (NUEVO)
npm install –-save cookie-parser (NUEVO)
npm install –-save cors (NUEVO)
npm install –-save jsonwebtoken (NUEVO)

*Fíjense que antes de save son dos plecas.
Una vez hecho todo esto debería funcionar, si no me escriben.
Lo más importante: Como acceder a la base de datos:
Usar solicitudes de tipo POST o GET (hasta ahora) en dependencia del metodo que quieran, la seccion siguiente les dice la URL que deben mandar en la solicitud para cada metodo

# 5 EndPoints

En los endpoints nuevos hay 7 que se explicaran a continuacion, 4 terminados y 3 en desarrollo:
\*Importante todo se devuelve en un archivo JSON
Metodos POST:

1. Crear un usuario:

- Descripción: Verifica que los datos que se les pasan no estan vacios y que el email no se repita, una vez esto genera una contraseña con hash, y un token (ver seccion 9) firmado con el id del usuario para identificación.
- Nombre: postCreateUser
- URL: '/createuser'
- Recibe: username:String, email:String, password:String, manager:boolean
- Devuelve:
  - Correcto: Mensaje de correcto mas la informacion del usuario recien creado
  - Incorrecto: Mensaje de error con las caracteristicas de error y estatus 401

* Importante al crear un usuario el email es unico, se se repite no lo guarda y devuelve un error de duplicado

2. Autentificar un usuario:

- Descripción: Busca primeramente el usuario por el EMAIL y compara la contraseña insertada con la contraseña del usuario anteriormente encontrado mediante una comparación con hash, firma el token.
- Nombre: postAuthenticateUser
- URL: '/login'
- Recibe: email:String, password:String
- Devuelve:
  - Correcto: Mensaje de correcto mas la informacion del usuario recien encontrado
  - Incorrecto: Mensaje de error con las caracteristicas de error y estatus 404

3. Actualizar un usuario:

- Nombre: postUpdateUser
- URL: '/updateuser'
- Recibe: userId: String, username:String, email:String, password:String, manager:boolean
- Devuelve:
  - Correcto: Mensaje de correcto mas la informacion del usuario recien actualizado
  - Incorrecto: Mensaje de error con las caracteristicas de error

* Importante el id del usuario se genera automaticamente cuando se crea y para pedirselo es la variable de tipo_usuario.\_id.

4. Eliminar un usuario:

- Nombre: postDeleteUser
- URL: '/deleteuser'
- Recibe: userId:String
- Devuelve:
  - Correcto: Mensaje de correcto mas la informacion del recien eliminado
  - Incorrecto: Mensaje de error con las caracteristicas de error

* Importante el id del usuario se genera automaticamente cuando se crea y para pedirselo es la variable de tipo_usuario.\_id.

5. Buscar todos los usuarios:
- Metodo: GET
- Nombre: postAllUsers
- URL: 'allusers'
- Recibe: nada
- Devuelve:
  - Correcto: Un arreglo con todos los usuarios
  - Incorrecto: Mensaje de error con las caracteristicas de error y el estatus 403



# 6 Errores Tratados

- 400 : error de inscripcion
- 401 : error de filtrado
- 402 : error de actualizacion
- 403 : error de busqueda
- 404 : error de eliminacion

# 7 Errores Comunes

1. A la hora de escribir npm start deben estar en .backend/api, o sea cual sea la direccion del package.json del archivo; esto es en la terminal integrada
2. Tengan en cuenta que la URL y el nombre de la funcion son cosas distintas por ejemplo al metodo de crear usuarios postCreateUser, de hacerlo mediante la URL: http://localhost:2000/createuser

# 8 Base de datos de prueba

En la siguiente ruta donavida/backend/api/dump_db hay dos archivo:

1.  El archivo donavidaDB.json NO es necesario importarlo si ya han usado la base de datos antes, ese archivo es simplemente la configuracion de la conexion, lo que vendria siendo lo mismo que conectarse a mongodb://localhost:27017 en MongoDBCompass o en la extension de MongoDB de Visual Code

2.  El archivo donavidaDB.users.json es el juego de datos para que prueben funciones, para añadirla los siguientes pasos:
    - Si ya te ha conectado anteriormente
    1. Abrir el MongoDBCompass y presionar Connect
    2. Seleccionar la base de datos donavidaDB.
    3. Seleccionar la colección users.
    4. Presionar ADD DATA
    5. Presionar Import JSON or CSV file
    6. Buscar el archivo donavidaDB.users.json
    - Si no te has conectado anteriormente
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

# 9 Tokens (NUEVO)
En el contexto de JWT (JSON Web Tokens), un token es una cadena de caracteres que se utiliza para representar y transmitir información de forma segura entre dos partes. Un token JWT consta de tres partes separadas por puntos: el encabezado (header), la carga útil (payload) y la firma (signature).