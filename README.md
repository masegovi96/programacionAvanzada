# Programación Avanzada

Sitio web educativo para la asignatura de **Programación Avanzada**. Incluye explicaciones interactivas y animaciones de estructuras de datos, algoritmos de ordenamiento, recursividad y complejidad algorítmica.

## Estructura del proyecto

```
/
├── index.html                        # Página principal (criterios de evaluación, bienvenida)
├── build.js                          # Script de construcción / generación de páginas
├── components/
│   ├── navbar.html                   # Sidebar de navegación (cargado dinámicamente)
│   ├── head.html                     # Fragmento <head> compartido
│   └── footer.html                   # Pie de página compartido
├── css/
│   ├── styles.css                    # Estilos globales
│   ├── tarea1.css                    # Estilos específicos de Tarea 1
│   └── todo.css                      # Estilos del componente de tareas pendientes
├── js/
│   ├── scripts.js                    # Lógica compartida: sidebar, navbar, accesibilidad
│   ├── sort-animations.js            # Animaciones D3 para algoritmos de ordenamiento
│   ├── data-structure-animations.js  # Animaciones para estructuras de datos
│   ├── tarea1.js                     # Lógica de Tarea 1
│   └── todo.js                       # Componente de lista de tareas pendientes
├── media/                            # Imágenes y recursos multimedia
├── actividad-diagnostico/            # Actividad de diagnóstico (instrucciones y versión resuelta)
├── complejidad/
│   └── complejidad.html              # Notación Big O (introducción a complejidad)
├── estructuras-datos/                # Una página por estructura de datos
│   ├── matrices.html
│   ├── pilas.html
│   ├── colas.html
│   ├── listas-enlazadas.html
│   ├── listas-doblemente-enlazadas.html
│   ├── listas-circulares.html
│   ├── arboles.html
│   ├── grafos.html
│   └── tablas-hash.html
├── metodos-ordenamiento/             # Una página por algoritmo de ordenamiento
│   ├── bubble-sort.html
│   ├── selection-sort.html
│   ├── insertion-sort.html
│   ├── merge-sort.html
│   ├── quick-sort.html
│   ├── heap-sort.html
│   ├── counting-sort.html
│   ├── radix-sort.html
│   └── shell-sort.html
├── Recursividad/
│   └── recursividad.html
├── Proyectos/                        # Especificaciones de proyectos finales
│   ├── generales.html
│   ├── proyecto1.html
│   ├── proyecto2.html
│   ├── proyecto3.html
│   └── proyecto4.html
├── hablame-de-ti/
│   └── hablame-de-ti.html
├── sobre-mi/
│   └── sobre-mi.html
├── reglas-clase/
│   └── reglas.html
├── sorteo-equipos/
│   └── sorteo.html
└── tarea-1/
    └── tarea1.html
```

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 / CSS3 | Estructura y estilos |
| Bootstrap 5.3 | Layout, grid y componentes UI |
| Font Awesome 6 | Iconografía del sidebar |
| Google Fonts (Orbitron, Rubik) | Tipografía |
| D3.js | Animaciones de árboles, grafos, listas circulares y algoritmos de ordenamiento |
| Canvas API | Animaciones de pilas, colas, listas enlazadas y matrices |

## Ejecución local

El proyecto es completamente estático. Se recomienda usar un servidor local para evitar problemas con `fetch()` al cargar los componentes compartidos (navbar, head, footer).

### Con Node.js

```bash
npx serve .
```

### Con Python

```bash
python -m http.server 8080
```

### Con VS Code

Usar la extensión **Live Server** y abrir `index.html`.

> **Nota:** Abrir `index.html` directamente con `file://` causará que los componentes dinámicos (navbar, footer) no se carguen correctamente debido a restricciones de CORS.

## Contenido del curso

### Notación Big O
Introducción a la complejidad algorítmica: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ). Base conceptual para entender el rendimiento de estructuras de datos y algoritmos.

### Estructuras de Datos
Matrices, Pilas, Colas, Listas enlazadas, Listas doblemente enlazadas, Listas circulares, Árboles (Pre/In/Post-orden), Grafos (BFS/DFS) y Tablas Hash. Cada tema incluye animación interactiva, explicación teórica y ejemplos en código.

### Métodos de Ordenamiento
Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort, Radix Sort y Shell Sort. Cada tema incluye análisis de complejidad temporal y espacial, animación paso a paso y pseudocódigo.

### Recursividad
Concepto de recursividad, caso base, caso recursivo y visualización del call stack mediante animación D3.

## Criterios de evaluación

| Criterio | Ponderación |
|---|---|
| Tareas | 25% |
| Participación | 25% |
| Asistencia | 5% |
| Uso de uniforme | 5% |
| Examen | 40% |
