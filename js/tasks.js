
import {
    cargarTareas,
    guardarTareas
} from "./storage.js";

/* Recuperamos las tareas si existen */
export const tareas = cargarTareas() ?? [];

/* Crear una tarea */
export function agregarTarea(titulo, prioridad) {
    const nuevaTarea = {
        id: crypto.randomUUID(),
        titulo: titulo.trim(),
        prioridad: prioridad,
        completada: false,
        fechaCreacion: new Date().toISOString()
    };

    if (nuevaTarea.titulo === "") {
        return;
    }

    tareas.push(nuevaTarea);
    guardarTareas(tareas);
}

/* Completar o marcar pendiente */
export function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        tarea.completada = !tarea.completada;
        guardarTareas(tareas);
    }
}

/* Editar una tarea */
export function editarTarea(id, nuevoTitulo, nuevaPrioridad) {
    const tarea = tareas.find(t => t.id === id);

    if (tarea && nuevoTitulo.trim() !== "") {
        tarea.titulo = nuevoTitulo.trim();
        tarea.prioridad = nuevaPrioridad;

        guardarTareas(tareas);
    }
}

/* Eliminar una tarea */
export function eliminarTarea(id) {
    const posicion = tareas.findIndex(t => t.id === id);

    if (posicion !== -1) {
        tareas.splice(posicion, 1);
        guardarTareas(tareas);
    }
}

/* Importar tareas de JSONPlaceholder */
export function importarTareasApi(datos) {
    let agregadas = 0;

    const idsExistentes = new Set(
        tareas.map(tarea => tarea.id)
    );

    datos.forEach(function(dato) {
        const id = "api-" + dato.id;

        if (
            !Number.isInteger(dato.id) ||
            typeof dato.title !== "string" ||
            dato.title.trim() === "" ||
            idsExistentes.has(id)
        ) {
            return;
        }

        const nuevaTarea = {
            id: id,
            titulo: dato.title.trim(),
            prioridad: "media",
            completada: Boolean(dato.completed),
            fechaCreacion: new Date().toISOString()
        };

        tareas.push(nuevaTarea);
        idsExistentes.add(id);
        agregadas++;
    });

    if (agregadas > 0) {
        if (!guardarTareas(tareas)) {
            throw new Error("No se pudieron guardar las tareas.");
        }
    }

    return agregadas;
}
