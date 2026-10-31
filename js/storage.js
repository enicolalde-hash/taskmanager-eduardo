
/* Clave para identificar nuestras tareas */
const CLAVE = "taskmanager_eduardo_tareas";

/* Recuperar las tareas guardadas */
export function cargarTareas() {
    try {
        const datos = localStorage.getItem(CLAVE);

        if (datos === null) {
            return null;
        }

        const tareas = JSON.parse(datos);

        return Array.isArray(tareas) ? tareas : null;

    } catch (error) {
        console.error("Error al cargar tareas:", error);
        return null;
    }
}

/* Guardar las tareas en el navegador */
export function guardarTareas(tareas) {
    try {
        localStorage.setItem(
            CLAVE,
            JSON.stringify(tareas)
        );

        return true;

    } catch (error) {
        console.error("Error al guardar tareas:", error);
        return false;
    }
}
