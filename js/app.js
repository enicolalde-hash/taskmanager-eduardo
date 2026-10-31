
import {
    tareas,
    agregarTarea,
    cambiarEstado,
    editarTarea,
    eliminarTarea
} from "./tasks.js";

/* Elementos HTML */
const formulario = document.getElementById("formTarea");
const titulo = document.getElementById("titulo");
const prioridad = document.getElementById("prioridad");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");

const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

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

/* Mostrar todas las tareas */
function mostrarTareas() {
    lista.innerHTML = "";

    if (tareas.length === 0) {
        const aviso = document.createElement("li");
        aviso.textContent = "Todavía no tienes tareas registradas.";
        lista.appendChild(aviso);
        return;
    }

    tareas.forEach(function(tarea) {
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

/* Iniciar la aplicación */
actualizarPantalla();
