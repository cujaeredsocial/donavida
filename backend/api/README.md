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

*Fíjense que antes de save son dos plecas.
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
          entrada: id de del usuario (para extraer el id de un objeto cualquiera es: object_id, en este caso seria user._id), userName: String, email: String, password: String
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
          entrada: id de del usuario (para extraer el id de un objeto cualquiera es: object_id, en este caso seria user._id)
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
        componentType:	el tipo de componente, combobox o textfield, obligatorio: String.
        values: en caso de que sea un campo de selección, los valores de esa selección: cualquiera[]
        data: los datos introducidos por el usuario: cualquiera
        regex: el regex de validacion: String.
        message: para un mensaje predeterminado.

        Ejemplo de un componente:
        {
                "title": "Sexo",
                "dataType": "char",
                "componentType":"combobox"
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
          ruta:/plantilla/<rol>.
          (puede ser /plantilla/donante ; plantilla/gestor ; plantilla/solicitante) 
          descripción: Devuelve el meta de un rol especifico
          entrada: ninguna
          salida: meta especifico de un rol
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


# Errores Comunes

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

