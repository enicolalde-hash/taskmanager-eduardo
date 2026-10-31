
/* Lista donde guardamos las tareas */
export const tareas = [];

/* Crear una nueva tarea */
export function agregarTarea(titulo, prioridad) {
    const nuevaTarea = {
        id: crypto.randomUUID(),
        titulo: titulo,
        prioridad: prioridad,
        completada: false,
        fechaCreacion: new Date().toISOString()
    };

    tareas.push(nuevaTarea);
}

/* Cambiar entre pendiente y completada */
export function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        tarea.completada = !tarea.completada;
    }
}

/* Editar una tarea existente */
export function editarTarea(id, nuevoTitulo, nuevaPrioridad) {
    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        tarea.titulo = nuevoTitulo;
        tarea.prioridad = nuevaPrioridad;
    }
}

/* Eliminar una tarea */
export function eliminarTarea(id) {
    const posicion = tareas.findIndex(t => t.id === id);

    if (posicion !== -1) {
        tareas.splice(posicion, 1);
    }
}
