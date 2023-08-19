VERSION 1.0.3

# Breve introducción

Esto es una API en node.js con express que contiene el acceso a una base de datos en MongoDB, utilizando Mongoose como framework de MongoDB. Además para el uso de tokens de autentificación se usa JWToken y Socket.io como websockets.

# Despliegue

Actualizan el proyecto con el que esta en GitHub

# Requisitos previos

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

   # ¿Cómo compilarlo?

Una vez abierto deben ir al archivo index.js, después abren la terminal en View, Terminal.
Ahí escriben el siguiente comando npm start, abren un navegador cualquiera y escriben localhost:27000.
En caso que les diga que falta algún modulo pueden dar `npm i` para que se instale todo en el package.json. Ademas pueden hacer instalar de forma manual (para instalar módulos deben estar conectados a internet)

# Módulos necesarios

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

\*Fíjense que antes de save son dos plecas.
Una vez hecho todo esto debería funcionar, si no me escriben.
Lo más importante: Como acceder a la base de datos:

# Contenido y funcionalidad

1. Usuario:

   Atributos:
   userName: el nombre del usuario, es obligatorio, único y una longitud mínima de 4 letras: String.
   email: el email del usuario, es obligatorio y único: String.
   password: la contraseña, es obligatorio y una longitud mínima de 8 letras: String.
   fecha: fecha de creación, automática: Date.
   activate: para saber si el usuario esta activado, cuando se crea es verdadero: Boolean.

   Endpoints:
   postCreateUser:
   tipo: Post
   ruta:/createuser.  
    descripción: Crea un nuevo usuario y lo guarda en la base de datos
   entrada: userName: String, email: String, password: String
   salida: Mensaje de éxito y el usuario recien creado
   errores:
   postAuthenticateUser:
   tipo: Post
   ruta:/login.
   descripción: Loguea y autentifica un usuario
   entrada: userName: String, password: String
   salida: mensaje de éxito y token de usuario (en las cookies, no en el JSON)
   errores:  
    postUpdateUser:
   tipo: Post
   ruta:/updateuser.
   descripción: Actualiza la información de un usuario
   entrada: id de del usuario (para extraer el id de un objeto cualquiera es: object_id, en este caso seria user.\_id), userName: String, email: String, password: String
   salida: Mensaje de éxito, el usuario actualizado
   errores:  
    getAllUsers:
   tipo: Get
   ruta:/allusers.
   descripción: Devuelve todos los usuarios
   entrada: ninguna
   salida: todos los usuarios
   errores:  
    postDeleteUser:
   tipo: Post
   ruta:/deleteuser.
   descripción: Elimina un usuario por su ID
   entrada: id de del usuario (para extraer el id de un objeto cualquiera es: object_id, en este caso seria user.\_id)
   salida: Mensaje de exito y el usuario eliminado
   errores:

2. Rol:

   Atributos:
   name: el nombre del rol, es obligatorio, único: String.
   descripción: la descripción del rol, es obligatorio, único: String.

   Endpoints:
   post:
   tipo: Post
   ruta:rol/create.  
    descripción: Crea un nuevo rol y lo guarda en la base de datos
   entrada: name: String, description: String
   salida: Mensaje de éxito y el rol recien creado
   errores:

3. Componente:

   Atributos:
   title: la etiqueta del componente, obligatorio: String.
   dataType: el tipo de dato, como entero o string, obligatorio: String.
   values: en caso de que sea un campo de selección, los valores de esa selección: cualquiera[]
   data: los datos introducidos por el usuario: cualquiera
   regex: el regex de validacion: String.
   message: para un mensaje predeterminado.

   Ejemplo de un componente:
   {
   "title": "Sexo",
   "dataType": "char",
   "values": [
   "M",
   "F",
   "O"
   ],
   "data": "M",
   "regex": "/^(M|F|O)$/",
   "message": "M de masculino, F de feminino, O de otro"
   }

   Endpoints:
   <por ahora ninguno, pues no se tratan independientes>

4. Meta:

   Atributos:
   rol: rol al que pertenece, es obligatorio, único y solo puede ser donante, gestor y solicitante: String.
   components: arreglo donde cada elemento es un componente visual.

   Endpoints:
   post:
   tipo: Post
   ruta:meta/create.  
    descripción: Crea un nuevo meta y lo guarda en la base de datos
   entrada: rol: donante||gestor||solicitante, components: [], password: String
   salida: Mensaje de éxito y el meta recien creado
   errores:
   get:
   tipo: Get
   ruta:/meta/plantilla/<rol>.
   (puede ser /meta/plantilla/donante ; /metaplantilla/gestor ; /meta/plantilla/solicitante)
   descripción: Devuelve el meta de un rol especifico
   entrada: ninguna
   salida: meta especifico de un rol
   errores:  
    update:
   tipo: Put
   ruta:/meta/update/<rol>.
   (puede ser /meta/update/donante ; /meta/update/gestor ; /meta/update/solicitante)
   descripción: Actualiza el arreglo de componentes de un meta, manda un mensaje con socket.io con el nombre Cambios en la plantilla del rol <rol>.Dentro del mensaje estan los usuarios que tienen ese meta en su ultima solicitud, el nuevo arreglo de componentes, los componentes arreglados, los modificados y los eliminados.
   IMPORTANTE: todos estos cambios los lee a partir del titulo del componente, por lo tanto cualquier agrego que se haga debe ser con otro titulo, y cualquier modificacion no se debe cambiar el titulo, en caso de cambiarse el titulo, no deja de funcionara, pero manda ese componente como agregado y no como modificado.
   entrada: components:Component[]
   salida:
   En el JSON: el meta actualizado con los nuevos componentes,
   En el mensaje de io.emit:
   users: los usuarios con la ultima solicitud de este tipo,
   newcomponents: componentes nuevos,
   addedcomponents: componentes agregados,
   modifiedcomponents: componentes modificados,
   deletedcomponents: componentes eliminados,
   errores:

5. MetaUser:

   Atributos:
   user: la referencia del usuario, es obligatorio: ObjectId.
   rol: rol del usuario, es obligatorio: donante||gestor||solicitante.
   date: fecha de creacion, automatica: Date.
   meta: el template o meta de la solicitud: Meta.
   components: arreglo de componentes visuales: Component[].
   dateUpdate: fecha de modificacion: Date.
   status:El estado de la solicitud:en proceso|| aceptado|| denagado
   updated: para saber si esta actualizdo con respecto a su template origen, cuando se crea es verdadero: Boolean.
   last: para saber si es el ultimo de su respectivo usuario, cuando se crea es verdadero: Boolean.

   Endpoints:
   postCrear:
   tipo: Post
   ruta:/metauser/create.  
    descripción: Crea un nuevo metauser y lo guarda en la base de datos
   entrada: userName: String, name_rol: donante||gestor||solicitante,componentes: Component[]
   salida: Mensaje de éxito y el metauser recien creado
   errores:  
    putState:
   tipo: Put
   ruta:/metauser/changestate/<id>.(id del metaUser que se va actualizar el estado
   ejemplo: /metauser/changestate/64dd8b83db99d14bcd444378 )  
    descripción: cambia el estado de una solicitud a aceptado, denegado o en proceso.
   entrada: status:aceptado||denegado||en proceso
   salida: Mensaje de éxito y el metauser con el estado actualizado
   errores:  
    getInProcessRequests:
   tipo: Get
   ruta:/metauser/inprocessrequests
   descripción: devuelve todos las solicitudes que estan en proceso, sin importar el rol
   entrada: ninguna
   salida: Mensaje de éxito y un arreglo con todas las solicitudes en procesp
   errores:  
    getLastREq:
   tipo: Get
   ruta:/metauser/request/<rol>/<id>(el nombre del rol y el id del usuario,
   ejemplo: /metauser/request/gestor/64dd8af637db26bda1dadbe6)
   descripción: devuelve el ultimo metauser de un usuario en dependencia del rol
   entrada: ninguna
   salida: Mensaje de éxito y la ultima solicitud del rol especificado
   errores:

# Errores Comunes

1. A la hora de escribir npm start deben estar en .backend/api, o sea cual sea la direccion del package.json del archivo; esto es en la terminal integrada
2. Tengan en cuenta que la URL y el nombre de la funcion son cosas distintas por ejemplo al metodo de crear usuarios postCreateUser, de hacerlo mediante la URL: http://localhost:2000/createuser

# Base de datos de prueba
 Para cargar la base de datos:
 1. Conectar la app: abrir el backend/api/index.js en una terminal integrada (click derecho en index.js, Open in Integrated Terminal)
 2. Escribir npm start
 3. Escribir en el POSTMAN(*metodo GET) o en cualquier navegador la URL http://127.0.0.1:27000/database
 Descripcion de la base de datos:
 El endpoint crea tres archivos metas, uno de cada rol, con dos componentes: nombre y edad, cada uno.
 Ademas crea 10 usuarios con nombre, email y contrasenna, y a cada uno le crea una solicitud (metauser) con un rol aleatorio cada vez que se crea. IMPORTANTE: Cada vez que se usa el endpoint verifica que existen las 3 solicitudes de cada rol, y cada usuario por su nombre, en caso de que exista no lo crea de nuevo ni los sobresscribe, eso es para no borrar cambios que hayan hecho y quieran cargar de nuevo los datos, pero SI BORRA los metauser para crearlos de nuevo, porque si el usuario no existe y se crea de nuevo, cambia el ID y el metauser ya no le pertenece, tenganlo en cuenta.
 Juego de datos:
  const users = [
      {
        userName: "JohnDoe",
        email: "johndoe@example.com",
        password: "Doe123!Afro",
      },
      {
        userName: "JaneSmith",
        email: "janesmith@example.com",
        password: "Smith987#Afro",
      },
      {
        userName: "MarkJohnson",
        email: "markjohnson@example.com",
        password: "Joh3nsonAfro",
      },
      {
        userName: "EmilyBrown",
        email: "emilybrown@example.com",
        password: "Brownie456Afro",
      },
      {
        userName: "MichaelDavis",
        email: "michaeldavis@example.com",
        password: "Davis12@Afro",
      },
      {
        userName: "SarahMiller",
        email: "sarahmiller@example.com",
        password: "M!llerAfro",
      },
      {
        userName: "DavidWilson",
        email: "davidwilson@example.com",
        password: "Wilson1234$Afro",
      },
      {
        userName: "OliviaTaylor",
        email: "oliviataylor@example.com",
        password: "Taylor2019Afro",
      },
      {
        userName: "DanielAnderson",
        email: "danielanderson@example.com",
        password: "And3r$onAfro",
      },
      {
        userName: "EmmaJohnson",
        email: "emmajohnson@example.com",
        password: "J0hnson@2021Afro",
      },
    ];
    const metas = [
      {
        rol: "donante",
        components: [
          {
            title: "Nombre",
            dataType: "String",
            regex: "^[A-Za-zs]{1,50}$",
            message: "El nombre insertado no es valido",
          },
          {
            title: "Edad",
            dataType: "int",
            regex: "^(1[89]|[2-5]d|6[0-4])$",
            message: "La edad debe ser mayor que 18 y menor que 65",
          },
        ],
      },
      {
        rol: "gestor",
        components: [
          {
            title: "Nombre",
            dataType: "String",
            regex: "^[A-Za-zs]{1,50}$",
            message: "El nombre insertado no es valido",
          },
          {
            title: "Edad",
            dataType: "int",
            regex: "^(1[89]|[2-5]d|6[0-4])$",
            message: "La edad debe ser mayor que 18 y menor que 65",
          },
        ],
      },
      {
        rol: "solicitante",
        components: [
          {
            title: "Nombre",
            dataType: "String",
            regex: "^[A-Za-zs]{1,50}$",
            message: "El nombre insertado no es valido",
          },
          {
            title: "Edad",
            dataType: "int",
            regex: "^(1[89]|[2-5]d|6[0-4])$",
            message: "La edad debe ser mayor que 18 y menor que 65",
          },
        ],
      },
    ];
   *Los metauser se crean con roles random con cada usuario, un metauser para cada usuario.

# 9 Tokens (NUEVO)

En el contexto de JWT (JSON Web Tokens), un token es una cadena de caracteres que se utiliza para representar y transmitir información de forma segura entre dos partes. Un token JWT consta de tres partes separadas por puntos: el encabezado (header), la carga útil (payload) y la firma (signature).
