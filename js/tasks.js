
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


/* Importar ejemplos desde JSONPlaceholder */
export function importarTareasApi(datos) {
    const ejemplos = [
        ["Revisar los ultimos detalles de mi actividad integradora", "alta"],
        ["Organizar las capturas para el informe de Programacion Web", "alta"],
        ["Comprobar que TaskManager funcione en GitHub Pages", "alta"],
        ["Terminar el informe y revisar las referencias", "alta"],
        ["Repasar los modulos de JavaScript vistos en clase", "media"],
        ["Practicar consultas a una API REST", "media"],
        ["Revisar las tareas pendientes de la universidad", "media"],
        ["Organizar las actividades de esta semana", "media"],
        ["Revisar los pendientes del trabajo", "alta"],
        ["Actualizar la documentacion de mis proyectos", "media"],
        ["Dedicar unos minutos a practicar ingles", "baja"],
        ["Ordenar los archivos y materiales de estudio", "baja"]
    ];

    let agregadas = 0;
    const idsExistentes = new Set(tareas.map(tarea => tarea.id));

    datos.slice(0, ejemplos.length).forEach(function(dato, indice) {
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
            titulo: ejemplos[indice][0],
            prioridad: ejemplos[indice][1],
            completada: Boolean(dato.completed),
            fechaCreacion: new Date().toISOString()
        };

        tareas.push(nuevaTarea);
        idsExistentes.add(id);
        agregadas++;
    });

    if (agregadas > 0 && !guardarTareas(tareas)) {
        throw new Error("No se pudieron guardar las tareas.");
    }

    return agregadas;
}
