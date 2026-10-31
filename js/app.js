
/* Funciones para administrar las tareas */
import {
    tareas,
    agregarTarea,
    cambiarEstado,
    editarTarea,
    eliminarTarea,
    importarTareasApi
} from "./tasks.js";

/* Función para consultar la API REST */
import { consultarTareasAPI } from "./api.js";

/* Función para recuperar los datos locales */
import { cargarTareas } from "./storage.js";


/* Elementos HTML */
const formulario = document.getElementById("formTarea");
const titulo = document.getElementById("titulo");
const prioridad = document.getElementById("prioridad");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");

const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");


/* Controles para buscar, filtrar y ordenar */
const buscar = document.getElementById("buscar");
const filtro = document.getElementById("filtro");
const ordenar = document.getElementById("ordenar");


/* Identificador de la tarea que estamos editando */
let idEnEdicion = null;

/* Crear o actualizar una tarea */
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombreTarea = titulo.value.trim();

    /* Validar que no esté vacío */
    if (nombreTarea === "") {
        mensaje.textContent = "Debes escribir el nombre de la tarea.";
        titulo.focus();
        return;
    }

    if (idEnEdicion !== null) {
        editarTarea(
            idEnEdicion,
            nombreTarea,
            prioridad.value
        );

        mensaje.textContent = "Tarea actualizada correctamente.";
    } else {
        agregarTarea(nombreTarea, prioridad.value);

        mensaje.textContent = "Tarea registrada correctamente.";
    }

    limpiarFormulario();
    actualizarPantalla();
});

/* Preparar el formulario para editar */
function comenzarEdicion(tarea) {
    idEnEdicion = tarea.id;

    titulo.value = tarea.titulo;
    prioridad.value = tarea.prioridad;

    btnGuardar.textContent = "Actualizar tarea";
    btnCancelar.hidden = false;

    titulo.focus();
}

/* Cancelar la edición */
btnCancelar.addEventListener("click", function() {
    limpiarFormulario();
    mensaje.textContent = "Edición cancelada.";
});

/* Limpiar el formulario */
function limpiarFormulario() {
    formulario.reset();

    idEnEdicion = null;

    btnGuardar.textContent = "Guardar tarea";
    btnCancelar.hidden = true;
}


/* Obtener las tareas según los filtros */
function obtenerTareasVisibles() {
    const texto = buscar.value.trim().toLowerCase();
    const estado = filtro.value;

    let resultado = tareas.filter(function(tarea) {
        const coincideTitulo = tarea.titulo
            .toLowerCase()
            .includes(texto);

        const coincideEstado =
            estado === "todas" ||
            (estado === "pendientes" && !tarea.completada) ||
            (estado === "completadas" && tarea.completada);

        return coincideTitulo && coincideEstado;
    });

    /* Ordenar sin modificar el arreglo original */
    resultado = [...resultado];

    if (ordenar.value === "prioridad") {
        const niveles = {
            alta: 3,
            media: 2,
            baja: 1
        };

        resultado.sort(function(a, b) {
            return niveles[b.prioridad] - niveles[a.prioridad];
        });
    } else {
        resultado.sort(function(a, b) {
            return b.fechaCreacion.localeCompare(a.fechaCreacion);
        });
    }

    return resultado;
}


/* Mostrar todas las tareas */
function mostrarTareas() {
    lista.innerHTML = "";
    const tareasVisibles = obtenerTareasVisibles();

    if (tareasVisibles.length === 0) {
        const aviso = document.createElement("li");
        aviso.textContent = "Todavía no tienes tareas registradas.";
        lista.appendChild(aviso);
        return;
    }

    tareasVisibles.forEach(function(tarea) {
        const elemento = document.createElement("li");

        /* Información de la tarea */
        const descripcion = document.createElement("span");

        descripcion.textContent =
            tarea.titulo + " | Prioridad: " + tarea.prioridad;

        if (tarea.completada) {
            descripcion.style.textDecoration = "line-through";
        }

        /* Contenedor de botones */
        const acciones = document.createElement("div");
        acciones.className = "acciones-tarea";

        /* Botón para completar */
        const btnEstado = document.createElement("button");
        btnEstado.type = "button";

        btnEstado.textContent = tarea.completada
            ? "Marcar pendiente"
            : "Completar";

        btnEstado.addEventListener("click", function() {
            cambiarEstado(tarea.id);
            actualizarPantalla();
        });

        /* Botón para editar */
        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";

        btnEditar.addEventListener("click", function() {
            comenzarEdicion(tarea);
        });

        /* Botón para eliminar */
        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";

        btnEliminar.addEventListener("click", function() {
            const confirmar = confirm(
                "¿Deseas eliminar esta tarea?"
            );

            if (confirmar) {
                eliminarTarea(tarea.id);

                if (idEnEdicion === tarea.id) {
                    limpiarFormulario();
                }

                mensaje.textContent = "Tarea eliminada correctamente.";
                actualizarPantalla();
            }
        });

        acciones.appendChild(btnEstado);
        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);

        elemento.appendChild(descripcion);
        elemento.appendChild(acciones);

        lista.appendChild(elemento);
    });
}

/* Actualizar indicadores */
function actualizarDashboard() {
    const total = tareas.length;

    const completadas = tareas.filter(
        tarea => tarea.completada
    ).length;

    const pendientes = total - completadas;

    document.getElementById("totalTareas").textContent = total;
    document.getElementById("tareasPendientes").textContent = pendientes;
    document.getElementById("tareasCompletadas").textContent = completadas;
}

/* Actualizar listado y resumen */
function actualizarPantalla() {
    mostrarTareas();
    actualizarDashboard();
}


/* Buscar mientras el usuario escribe */
buscar.addEventListener("input", mostrarTareas);

/* Filtrar al seleccionar un estado */
filtro.addEventListener("change", mostrarTareas);

/* Ordenar al cambiar la selección */
ordenar.addEventListener("change", mostrarTareas);

/* Iniciar la aplicación */

/* Iniciar TaskManager */
async function iniciarAplicacion() {
    actualizarPantalla();

    /* Si hay datos locales, utilizarlos */
    if (cargarTareas() !== null) {
        mensaje.textContent =
            "Tareas recuperadas del navegador.";
        return;
    }

    /* Si no hay datos, consultar la API */
    try {
        mensaje.textContent =
            "Consultando tareas de ejemplo...";

        const datos = await consultarTareasAPI();

        const cantidad = importarTareasApi(datos);

        mensaje.textContent =
            cantidad + " tareas importadas desde JSONPlaceholder.";

    } catch (error) {
        console.error("Error al consultar la API:", error);

        mensaje.textContent =
            "No pudimos conectar con la API. " +
            "Puedes seguir registrando tareas sin internet.";
    }

    actualizarPantalla();
}

iniciarAplicacion();

