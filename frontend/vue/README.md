# Front-end proyecto Donavida Introducción
Este subproyecto de DonaVida se encarga de la vista que tendrá el cliente con toda la aplicacion donde se dispone de funcionalidades para suplir distintas tareas las cuales serán explicadas a detalle en una sección de este documento.

# Funcionalidades y versionado
VERSIÓN 1.0.1
Primera etapa de desarrollo donde el objetivo fue crear una vista amigable para el cliente

Para esta versión el equipo de desarrollo contaba con: 
-vista de bienvenida al cliente donde se le brinda la opción de iniciar sesión o registrarse(WelcomeView.vue)
-formulario de inicio de sesión en caso de tener una cuenta(LoginView.vue)
-formulario de registro para los casos que visiten por primera vez la aplicación(RegisterView.vue)
-vista principal luego de realizar la acción de autenticarse como usuario donde cuenta con breve(MainView.vue) informacion del proyecto y un apartado para ver las donaciones existentes en proceso de suplencia(en desarrollo), cuenta con un acceso a demas funcionalidades de la aplicación principalmente las relacionadas con el usuario y su información, así como una vista donde tendrá información general de las donaciones de sangre


VERSIÓN 1.0.2
Segunda etapa de desarrollo donde el objetivo fue mejorar los cambios realizados en la primera etapa y brindar al cliente la posibilidad de formar parte de algunos de los roles de nuestra aplicación(Donante, Gestor, Solicitante)

Para esta versión:
-En la vista principal se le brindó acceso al cliente a la funcionalidad de realizar una solicitud para ser un gestor , un donante o un solicitante de donación(MainView.vue)
-En la vista para realizar la solicitud el cliente puede elegir cual realizar y el formulario(MetaUser.vue)
correspondiente se creará de forma dinámica con la información solicitada por el backend de la aplicación, el cliente tiene la posibilidad de revisar su solicitud antes de enviarla, hacer cambios y cuando esté seguro enviarla para que sea aprobada (Definir tiempo promedio que tendrá que esperar por la respuesta)
-Se agregó una vista donde el usuario podrá visualizar las solicitudes realizadas por fecha donde se actualizarán los estados de las mismas en caso de cambios(SolView.vue)

VERSÓN 1.0.3
Tercera etapa de desarrollo donde el objetivo es asignar un rol al usuario y notificarle de esta asignación y agregar los permisos y las funcionalidades a las que tendrá acceso dependiendo del rol que le corresponda

Para esta versión:
-Crear un centro de notificaciones donde el usuario pueda visualizar toda la información nueva de importancia
-Un panel desplegable con la informacion de las notificaciones
-El front maneja las notificaciones segun el mensaje que se emita desde el back utilizando socket io
-Brindar la posibilidad para aquellos que necesitan una donación de seleccionar un nuevo lugar dentro de los que ya estan definidos

## Pasos para instalar y compilar
-Clonar o actualizar el proyecto desde el repositorio

-Instalar las dependencias necesarias abriendo una terminal integrada de la carpeta vue en frontend, para eso utilizar el siguente comando: 
```
npm install
```

-Para compilar utilizar el siguiente comando (Igual desde una terminal integrada):
```
npm run serve
```

-Una vez compilado tocar la direccion q sale en la consola presionando Control+Clic o escribiendola directamente en el navegador

-Tener en cuenta que para que funcione correctamente debe estar montada la API, para mas informacion ver [Readme de la API](https://github.com/cujaeredsocial/donavida/tree/main/backend/api#readme).
##¿Que tiene el proyecto?
