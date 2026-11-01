# Mi TaskManager

**Estudiante:** Eduardo Enrique Nicolalde Reinoso  
**Universidad:** ECOTEC  
**Asignatura:** Programación de Sistemas Web  
**Actividad:** Integradora 2  
**Año:** 2026

## Descripción del proyecto

TaskManager es una aplicación web sencilla para organizar tareas. Permite registrar una actividad, elegir su prioridad y marcarla cuando esté terminada. La desarrollé para practicar lo aprendido sobre HTML, CSS y JavaScript.

Durante la actividad también trabajé con una API REST y aprendí a guardar información en el navegador, de modo que las tareas se conserven al actualizar la página.

## Funcionalidades

- Crear, visualizar, editar y eliminar tareas.
- Evitar el registro de tareas sin título.
- Marcar las tareas como pendientes o completadas.
- Buscar tareas por su título y filtrarlas por estado.
- Ordenarlas por fecha de creación o prioridad (alta, media y baja).
- Mostrar el total de tareas, las pendientes y las completadas.
- Importar tareas de ejemplo desde JSONPlaceholder cuando no existen datos locales.
- Guardar los cambios en `localStorage` y recuperarlos al actualizar el navegador.
- Continuar trabajando con las tareas guardadas cuando no hay conexión a internet.
- Mostrar un aviso si ocurre un error al consultar la API.

## Herramientas utilizadas

- **HTML5:** estructura y contenido de la página.
- **CSS3:** diseño, colores y presentación.
- **JavaScript (ES6+):** funciones y comportamiento de la aplicación.
- **Visual Studio Code:** edición del proyecto.
- **XAMPP (Apache):** pruebas con un servidor local.
- **Git:** registro de los avances del desarrollo.
- **GitHub:** publicación del repositorio.

## Estructura del proyecto

```text
taskmanager-eduardo/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── tasks.js
│   ├── api.js
│   └── storage.js
├── docs/
│   └── evidencias/
├── README.md
└── AI_DECLARATION.md
```

Los archivos JavaScript tienen funciones diferentes: `app.js` controla la interfaz; `tasks.js` administra las tareas; `api.js` consulta la API; y `storage.js` guarda y recupera los datos del navegador.

## Cómo ejecutar TaskManager

1. Colocar la carpeta `taskmanager-eduardo` dentro de `C:\xampp\htdocs`.
2. Iniciar **Apache** desde el panel de XAMPP.
3. Abrir esta dirección en el navegador: `http://localhost/taskmanager-eduardo/`.

Si todavía no hay tareas guardadas y existe conexión a internet, la aplicación consulta la API de ejemplo: https://jsonplaceholder.typicode.com/todos.

Si ya hay tareas en `localStorage`, las recupera sin volver a importarlas.

## Investigación: módulos ES6

Elegí la **opción A: arquitectura modular ES6**. Esta forma de trabajo permite separar el código JavaScript en varios archivos y compartir funciones mediante `import` y `export`.

Organizar las funciones por archivo me ayudó a entender mejor qué hace cada parte y a encontrar los errores durante las pruebas.

## Pruebas realizadas

Probé la creación, edición y eliminación de tareas, el cambio de estado, los filtros y el ordenamiento. También comprobé que los indicadores de la pantalla se actualizaran con los cambios.

En una sesión nueva del navegador se importaron **200 tareas** desde JSONPlaceholder. Después verifiqué que quedaran almacenadas en `localStorage` y que no se importaran nuevamente cuando ya existían datos.

Además, hice una prueba sin internet. La aplicación mostró un mensaje al fallar la consulta de la API, permitió registrar una tarea manualmente y la recuperó después de actualizar la página.

## Lo que aprendí

Esta actividad me ayudó a comprender cómo JavaScript permite interactuar con una página HTML y actualizar su contenido. Aprendí también a utilizar `localStorage`, consultar una API y revisar los errores desde la consola del navegador.

**Estado:** desarrollo y pruebas locales completados. Enlace del repositorio público por incorporar cuando finalice la publicación.
