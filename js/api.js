
/* Dirección de la API pública */
const URL_API = "https://jsonplaceholder.typicode.com/todos";

/* Consultar las tareas por internet */
export async function consultarTareasAPI() {
    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) {
        throw new Error(
            "Error del servidor: " + respuesta.status
        );
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos)) {
        throw new Error("La API no devolvió una lista válida.");
    }

    return datos;
}
