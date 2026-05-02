const cases = [
    {
        num: 1,
        title: "Sistema de inventario en un almacén",
        icon: "fa-boxes-stacked",
        context: "Un almacén pequeño gestiona productos almacenados en estantes organizados por filas y columnas. Cada posición tiene un ID de producto, nombre y cantidad disponible. El personal necesita consultar el stock, actualizar cantidades y generar reportes de reabastecimiento.",
        operations: [
            "Encontrar el producto con mayor stock disponible en todo el almacén.",
            "Listar todos los productos de una fila o columna específica.",
            "Generar una lista ordenada de productos por cantidad para priorizar el reabastecimiento."
        ],
        challenge: "¿Qué estructura de datos modela mejor la disposición física del almacén (filas × columnas)? ¿Qué algoritmo de ordenamiento usarías para el reporte y por qué ese y no otro?",
        deliverable: "Carga al menos 12 productos en tu estructura. Demuestra la búsqueda del máximo, el listado por fila y por columna, y genera la lista de reabastecimiento ordenada."
    },
    {
        num: 2,
        title: "Historial de acciones en un editor de texto",
        icon: "fa-file-pen",
        context: "Un editor de texto registra cada acción del usuario (escribir, borrar, pegar, formatear). La funcionalidad «Deshacer» (Ctrl + Z) debe revertir las acciones en orden inverso a su ejecución. El editor también guarda un log de sesiones con el número total de acciones de cada una.",
        operations: [
            "Registrar una nueva acción cuando el usuario edita.",
            "Revertir la acción más reciente cuando se activa Deshacer.",
            "Ordenar el historial de sesiones por número total de acciones para identificar las más complejas."
        ],
        challenge: "¿Qué estructura garantiza que Deshacer siempre revierta la acción más reciente? ¿Qué pasaría si usaras una estructura diferente? ¿Qué algoritmo aplicarías sobre la lista de sesiones?",
        deliverable: "Simula al menos 8 acciones, ejecuta 3 operaciones de Deshacer en secuencia y muestra el resultado. Ordena una lista de 5 sesiones por número de acciones."
    },
    {
        num: 3,
        title: "Sistema de turnos en una clínica",
        icon: "fa-hospital-user",
        context: "Una clínica atiende pacientes en orden de llegada. Cada paciente tiene nombre, hora de llegada y tipo de consulta (regular o urgente). Los pacientes urgentes deben atenderse antes que los regulares. Al final del día se genera un reporte ordenado por hora de llegada.",
        operations: [
            "Registrar un paciente al llegar, diferenciando si es urgente o regular.",
            "Llamar al siguiente paciente: los urgentes tienen prioridad sobre los regulares.",
            "Generar el reporte diario ordenado por hora de llegada."
        ],
        challenge: "¿Cómo manejarías los dos tipos de pacientes con una sola estructura, o necesitarías dos? ¿Qué estructura garantiza el orden correcto de atención? ¿Qué algoritmo ordenará el reporte final?",
        deliverable: "Simula la llegada de 8 pacientes (al menos 2 urgentes), atiende a 5 y genera el reporte diario ordenado."
    },
    {
        num: 4,
        title: "Lista de reproducción de música",
        icon: "fa-music",
        context: "Una aplicación de música mantiene una lista de reproducción dinámica. El usuario puede agregar canciones al final, eliminar una canción específica por título, avanzar a la siguiente pista y ordenar la lista por duración para crear modos de escucha corta o larga.",
        operations: [
            "Agregar una canción al final de la lista.",
            "Eliminar una canción específica buscándola por título.",
            "Ordenar la lista de reproducción por duración (de menor a mayor)."
        ],
        challenge: "¿Qué estructura permite insertar al final y eliminar por valor sin malgastar memoria ni desplazar elementos? ¿Qué algoritmo de ordenamiento aplicarías sobre esa estructura?",
        deliverable: "Construye una lista de al menos 10 canciones, elimina 2 por título y muestra la lista ordenada por duración."
    },
    {
        num: 5,
        title: "Carrito de compras en e-commerce",
        icon: "fa-cart-shopping",
        context: "Una tienda en línea permite agregar y quitar productos del carrito, navegar hacia el artículo anterior o siguiente para revisarlos, e insertar productos en cualquier posición. Al finalizar, el usuario puede ver los artículos ordenados por precio para comparar.",
        operations: [
            "Agregar un producto en cualquier posición del carrito (inicio, medio, final).",
            "Eliminar un producto específico navegando hacia adelante o hacia atrás.",
            "Mostrar el carrito ordenado por precio ascendente y descendente."
        ],
        challenge: "¿Qué estructura admite navegación bidireccional eficiente e inserción en cualquier posición? ¿Qué algoritmo de ordenamiento es más adecuado para esa estructura?",
        deliverable: "Construye un carrito con 8 productos, inserta uno en el medio, elimina uno navegando hacia atrás y muestra el carrito ordenado por precio en ambas direcciones."
    },
    {
        num: 6,
        title: "Planificación de procesos Round-Robin",
        icon: "fa-rotate",
        context: "Un planificador de CPU simplificado asigna tiempo a procesos en ciclos continuos (Round-Robin). Cada proceso recibe un quantum de tiempo y, si no termina, vuelve a esperar. Pueden añadirse nuevos procesos en cualquier momento. Antes de iniciar el ciclo, los procesos se ordenan por nivel de prioridad.",
        operations: [
            "Agregar un proceso nuevo al ciclo.",
            "Avanzar al siguiente proceso de forma que al llegar al último se regrese automáticamente al primero, sin intervención manual.",
            "Ordenar todos los procesos por nivel de prioridad antes de iniciar la ejecución."
        ],
        challenge: "¿Qué estructura modela de forma natural el ciclo continuo sin necesidad de reiniciar manualmente al llegar al final? ¿Qué implicaría usar una estructura lineal en su lugar? ¿Qué algoritmo usarías para ordenar por prioridad?",
        deliverable: "Crea 6 procesos, ordénalos por prioridad, simula 4 ciclos completos y demuestra que el recorrido regresa automáticamente al inicio."
    },
    {
        num: 7,
        title: "Directorio de contactos",
        icon: "fa-address-book",
        context: "Una aplicación de contactos almacena nombres y números de teléfono. El usuario necesita buscar un contacto por nombre de forma rápida (sin recorrer toda la lista), obtener el directorio completo en orden alfabético y ver qué contactos llamó más. La app registra la frecuencia de llamadas de cada contacto.",
        operations: [
            "Agregar un nuevo contacto.",
            "Buscar un contacto por nombre de forma eficiente (sin búsqueda lineal).",
            "Obtener la lista completa de contactos en orden alfabético.",
            "Ordenar los contactos por frecuencia de llamadas (de mayor a menor)."
        ],
        challenge: "¿Qué estructura permite búsqueda mejor que O(n) en el nombre? ¿Qué recorrido produce el orden alfabético de forma natural? ¿Qué algoritmo usarías para ordenar por frecuencia?",
        deliverable: "Carga 12 contactos, demuestra una búsqueda exitosa y una fallida, muestra el recorrido alfabético y ordena por frecuencia de llamadas."
    },
    {
        num: 8,
        title: "Red de amistades en una red social",
        icon: "fa-share-nodes",
        context: "Una red social básica conecta usuarios mediante relaciones de amistad. El sistema debe encontrar amigos de un usuario, sugerir personas con amigos en común y clasificar a todos los usuarios según su número de conexiones.",
        operations: [
            "Agregar un usuario (nodo) y una relación de amistad (arista).",
            "Obtener todos los amigos directos de un usuario.",
            "Sugerir posibles amigos: usuarios que comparten al menos un amigo en común (recorrido a 2 saltos).",
            "Clasificar a todos los usuarios por su número total de conexiones."
        ],
        challenge: "¿Cómo representarías la red de amistades para que agregar conexiones y consultar vecinos sea eficiente? ¿Qué estrategia de recorrido usarías para encontrar amigos en común? ¿Qué algoritmo aplicarías para el ranking?",
        deliverable: "Construye una red de 8 usuarios con al menos 10 amistades, ejecuta el recorrido a 2 saltos desde un nodo y muestra el ranking por número de conexiones."
    },
    {
        num: 9,
        title: "Motor de búsqueda de palabras",
        icon: "fa-magnifying-glass",
        context: "Un buscador simple indexa las palabras de un conjunto de documentos y registra cuántas veces aparece cada palabra y en qué documentos. El sistema permite consultar la frecuencia de cualquier palabra de forma instantánea y genera un ranking de las palabras más frecuentes.",
        operations: [
            "Indexar una palabra junto con su frecuencia de aparición.",
            "Consultar la frecuencia de una palabra específica en tiempo constante o casi constante.",
            "Generar el ranking de las 10 palabras más frecuentes, ordenado de mayor a menor."
        ],
        challenge: "¿Qué estructura ofrece búsqueda en tiempo constante promedio independientemente del tamaño del diccionario? ¿Qué algoritmo de ordenamiento es más adecuado cuando las frecuencias son enteros en un rango conocido?",
        deliverable: "Indexa al menos 25 palabras de un texto de prueba, demuestra la búsqueda de al menos 5 palabras y muestra el ranking de las 10 más frecuentes."
    },
    {
        num: 10,
        title: "Navegación GPS: recursivo vs. iterativo",
        icon: "fa-route",
        context: "Un GPS simplificado encuentra rutas entre ciudades en un mapa representado como grafo. Implementarás el algoritmo de búsqueda dos veces: una versión recursiva (usando la pila de llamadas del sistema) y una iterativa (gestionando la pila de forma explícita). Ambas deben producir el mismo resultado.",
        operations: [
            "Encontrar una ruta entre dos ciudades de forma recursiva.",
            "Encontrar la misma ruta de forma iterativa usando una pila explícita.",
            "Medir y comparar el tiempo de ejecución y el uso de memoria de ambas versiones con al menos 3 tamaños de grafo distintos."
        ],
        challenge: "¿En qué escenarios la versión recursiva es más clara o eficiente? ¿Cuándo la iterativa es preferible? ¿Qué riesgo concreto tiene la recursión profunda y cómo lo mitigarías?",
        deliverable: "Implementa ambas versiones sobre un grafo de al menos 8 ciudades. Ejecuta ambas sobre 3 tamaños de grafo y presenta una tabla comparativa de tiempos y profundidad máxima de pila."
    },
    {
        num: 11,
        title: "Reserva de asientos en un teatro",
        icon: "fa-ticket",
        context: "Un teatro tiene un mapa de asientos organizado en filas y columnas. Cada asiento puede estar disponible o reservado. El sistema debe encontrar el mejor asiento disponible (el más cercano al escenario), permitir reservar y cancelar reservas, y mostrar la lista de asientos disponibles ordenada por proximidad.",
        operations: [
            "Encontrar el primer asiento disponible más cercano al escenario.",
            "Reservar un asiento por fila y columna.",
            "Cancelar una reserva existente.",
            "Listar todos los asientos disponibles ordenados por proximidad al escenario."
        ],
        challenge: "¿Qué estructura modela mejor la distribución física de los asientos? ¿Cómo definirías «proximidad al escenario» y cómo influye eso en tu elección de algoritmo de ordenamiento?",
        deliverable: "Construye un teatro de al menos 5 × 8 con algunas reservas previas. Demuestra encontrar el mejor asiento, reservarlo, cancelar otro y listar los disponibles ordenados."
    },
    {
        num: 12,
        title: "Control de versiones de archivos",
        icon: "fa-code-branch",
        context: "Un sistema de control de versiones simplificado rastrea los cambios de un archivo a lo largo del tiempo. Cada «commit» guarda el contenido del archivo y una marca de tiempo. El usuario puede navegar el historial hacia atrás y hacia adelante, restaurar cualquier versión y ver los commits ordenados cronológicamente.",
        operations: [
            "Guardar una nueva versión (commit) con marca de tiempo.",
            "Navegar el historial hacia atrás (más reciente → más antiguo) y hacia adelante.",
            "Restaurar una versión específica indicada por su posición en el historial.",
            "Mostrar todos los commits ordenados cronológicamente."
        ],
        challenge: "¿Qué estructura permite recorrer el historial en ambas direcciones de forma eficiente? ¿Cómo implementarías la restauración sin perder el historial previo? ¿Qué algoritmo ordena por marca de tiempo?",
        deliverable: "Simula 7 commits, navega hacia atrás 3 pasos y luego hacia adelante 2, restaura la versión 3 y muestra el historial ordenado por fecha."
    },
    {
        num: 13,
        title: "Gestión de tareas en un proyecto de software",
        icon: "fa-list-check",
        context: "Un gestor de tareas para equipos de desarrollo almacena tareas con título, nivel de prioridad (1 = baja, 5 = crítica), fecha límite y estado (pendiente / terminada). Las tareas se ejecutan en el orden en que fueron creadas, a menos que el equipo decida ordenarlas por prioridad. El sistema debe detectar tareas vencidas.",
        operations: [
            "Agregar una tarea al final de la lista pendiente.",
            "Completar la siguiente tarea en orden de creación y moverla al historial.",
            "Ordenar las tareas pendientes por nivel de prioridad para generar una vista de trabajo urgente.",
            "Filtrar y listar todas las tareas cuya fecha límite ya venció."
        ],
        challenge: "¿Qué estructura preserva el orden de creación y permite completar tareas por ese orden de forma natural? ¿Qué algoritmo usarías para ordenar por prioridad? ¿Qué pasa cuando dos tareas tienen la misma prioridad?",
        deliverable: "Crea 10 tareas con distintas prioridades y fechas límite (algunas vencidas), completa 3 en orden de creación, muestra la vista ordenada por prioridad y lista las tareas vencidas."
    },
    {
        num: 14,
        title: "Ranking de jugadores en un videojuego",
        icon: "fa-gamepad",
        context: "Un juego en línea actualiza el puntaje de los jugadores tras cada partida. El sistema mantiene una tabla de clasificación que siempre debe mostrarse ordenada. Cualquier jugador puede consultar su posición actual en el ranking en cualquier momento.",
        operations: [
            "Agregar un jugador nuevo o actualizar su puntaje.",
            "Mostrar los 10 mejores jugadores (top 10) en orden descendente de puntaje.",
            "Consultar la posición exacta de un jugador específico en el ranking."
        ],
        challenge: "¿Qué estructura mantiene los elementos ordenados eficientemente cuando hay inserciones y actualizaciones frecuentes? Si reconstruyeras el ranking completo desde cero, ¿qué algoritmo usarías y por qué?",
        deliverable: "Simula 15 actualizaciones de puntaje para 8 jugadores. Muestra el top-10 después de cada bloque de 5 actualizaciones y consulta la posición de un jugador específico."
    },
    {
        num: 15,
        title: "Sistema de logs de un servidor",
        icon: "fa-server",
        context: "Un servidor web genera entradas de log de forma continua. Cada entrada tiene una marca de tiempo, un nivel de severidad (INFO, WARNING, ERROR, CRITICAL) y un mensaje. El sistema debe permitir agregar entradas rápidamente, buscar todos los errores en un rango de tiempo y mostrar el log completo ordenado por severidad.",
        operations: [
            "Agregar una nueva entrada al log.",
            "Buscar todas las entradas con severidad ERROR o CRITICAL entre dos marcas de tiempo dadas.",
            "Mostrar el log completo ordenado por nivel de severidad (CRITICAL primero, INFO último)."
        ],
        challenge: "¿Qué estructura permite agregar entradas sin reorganizar las existentes? ¿Cómo buscarías eficientemente por rango de tiempo? ¿Qué algoritmo es más adecuado cuando los niveles de severidad son un conjunto pequeño y fijo de valores?",
        deliverable: "Genera 20 entradas de log con distintas severidades y marcas de tiempo. Busca errores en un rango de tiempo específico y muestra el log completo ordenado por severidad."
    },
    {
        num: 16,
        title: "Catálogo de una biblioteca",
        icon: "fa-book",
        context: "El catálogo de una biblioteca pública almacena libros con título, autor, ISBN y disponibilidad. Los usuarios pueden buscar un libro por título, obtener el catálogo completo en orden alfabético y ver todos los libros de un autor específico.",
        operations: [
            "Agregar un libro al catálogo.",
            "Buscar un libro por título de forma eficiente (sin recorrer todo el catálogo linealmente).",
            "Obtener el catálogo completo en orden alfabético por título.",
            "Obtener todos los libros escritos por un autor específico."
        ],
        challenge: "¿Qué estructura permite búsqueda por título mejor que O(n)? ¿Cómo obtendrías el orden alfabético de forma natural? ¿Cómo manejarías la búsqueda por autor sin duplicar toda la estructura?",
        deliverable: "Construye un catálogo de 15 libros. Demuestra búsqueda por título (exitosa y fallida), muestra el catálogo en orden alfabético y lista todos los libros de un autor concreto."
    },
    {
        num: 17,
        title: "Gestión de rutas de delivery",
        icon: "fa-truck-fast",
        context: "Un repartidor tiene una lista de paradas para el día. Cada parada tiene dirección, prioridad y una ventana de tiempo de entrega. El sistema debe permitir agregar paradas, marcarlas como entregadas, mostrar las pendientes en el orden original planificado y también en un orden óptimo según la ventana de tiempo.",
        operations: [
            "Agregar una parada nueva a la ruta.",
            "Marcar una parada como entregada y eliminarla de la lista activa.",
            "Mostrar las paradas pendientes en el orden original de planificación.",
            "Mostrar las paradas pendientes ordenadas por ventana de tiempo de entrega."
        ],
        challenge: "¿Una sola estructura es suficiente para preservar el orden original Y permitir ordenar por ventana de tiempo, o necesitarías dos representaciones? ¿Qué algoritmo usarías para la ventana de tiempo?",
        deliverable: "Crea 10 paradas de entrega, marca 3 como entregadas y muestra las restantes en orden original y ordenadas por ventana de tiempo."
    },
    {
        num: 18,
        title: "Sistema de autocompletado",
        icon: "fa-keyboard",
        context: "Una barra de búsqueda sugiere completaciones mientras el usuario escribe. El sistema tiene un diccionario de palabras con su frecuencia de uso. Cuando el usuario ingresa un prefijo, el sistema devuelve todas las palabras que comienzan con ese prefijo, ordenadas de mayor a menor frecuencia.",
        operations: [
            "Agregar una palabra y su frecuencia al diccionario.",
            "Obtener todas las palabras que comienzan con un prefijo dado sin recorrer todo el diccionario.",
            "Ordenar las palabras encontradas por frecuencia para mostrar las más relevantes primero."
        ],
        challenge: "¿Qué estructura está específicamente diseñada para búsqueda por prefijo de forma eficiente? ¿Cómo se compara con un arreglo o una tabla hash para este caso concreto? ¿Qué algoritmo ordenaría los resultados por frecuencia?",
        deliverable: "Carga un diccionario de al menos 30 palabras con frecuencias. Demuestra búsqueda por prefijo con al menos 3 prefijos distintos y muestra las sugerencias ordenadas por frecuencia para cada uno."
    }
];

const grid = document.getElementById('caseBtnGrid');
const display = document.getElementById('caseDisplay');

cases.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'case-btn';
    btn.textContent = c.num;
    btn.setAttribute('aria-label', `Caso ${c.num}`);
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            closeCase();
        } else {
            showCase(c, btn);
        }
    });
    grid.appendChild(btn);
});

function closeCase() {
    document.querySelectorAll('.case-btn').forEach(b => b.classList.remove('active'));
    display.classList.remove('visible');
}

function showCase(c, btn) {
    document.querySelectorAll('.case-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    display.innerHTML = `
        <div class="case-card">
            <div class="case-card-header">
                <div class="d-flex align-items-center gap-2">
                    <span class="fs-4 text-primary"><i class="fa-solid ${c.icon}"></i></span>
                    <h3 class="mb-0">Caso ${c.num}: ${c.title}</h3>
                </div>
                <button class="case-close-btn" title="Cerrar" onclick="closeCase()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="case-section-label">Descripción del sistema</div>
            <p class="mb-2">${c.context}</p>

            <div class="case-section-label">Operaciones que debe soportar</div>
            <ul class="mb-0">
                ${c.operations.map(op => `<li>${op}</li>`).join('')}
            </ul>

            <div class="case-challenge mt-3">
                <i class="fa-solid fa-lightbulb text-warning me-2"></i>
                <strong>Pregunta central:</strong> ${c.challenge}
            </div>

            <div class="case-section-label mt-3">Mínimo esperado en tu implementación</div>
            <p class="mb-0">${c.deliverable}</p>
        </div>
    `;

    display.classList.add('visible');
    display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
