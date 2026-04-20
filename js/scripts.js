// Función para alternar menús (definida globalmente)
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.toggle('active');
    } else {
        console.error(`El menú con ID "${menuId}" no existe.`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Función genérica para inicializar un SVG
    function createSVG(containerId, width, height) {
        return d3.select(`#${containerId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    }

    // Función genérica para crear barras
    function createBars(svg, data, barWidth, height, maxHeight) {
        return svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - (d / maxHeight) * height)
            .attr("width", barWidth - 5)
            .attr("height", d => (d / maxHeight) * height)
            .attr("fill", "steelblue");
    }

    // Función genérica para crear etiquetas
    function createLabels(svg, data, barWidth, height, maxHeight) {
        return svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
            .attr("y", d => height - (d / maxHeight) * height - 10)
            .text(d => d)
            .attr("fill", "black")
            .attr("font-size", "14px");
    }

    // Función genérica para actualizar barras y etiquetas
    function updateBarsAndLabels(bars, labels, data, barWidth, height, maxHeight) {
        bars.data(data)
            .transition()
            .duration(1000) // Transición más lenta
            .attr("x", (d, i) => i * (barWidth + 10)) // Ajustar la posición horizontal
            .attr("y", d => height - (d / maxHeight) * height) // Ajustar la posición vertical
            .attr("height", d => (d / maxHeight) * height); // Ajustar la altura

        labels.data(data)
            .transition()
            .duration(1000) // Transición más lenta
            .attr("x", (d, i) => i * (barWidth + 10) + barWidth / 2 - 10) // Ajustar la posición horizontal
            .attr("y", d => height - (d / maxHeight) * height - 10) // Ajustar la posición vertical
            .text(d => d);
    }

    // Función genérica para resaltar una barra
    function highlightBar(bars, index, color) {
        bars.filter((d, idx) => idx === index)
            .transition()
            .duration(1000) // Transición más lenta
            .attr("fill", color)
            .transition()
            .duration(1000) // Transición más lenta
            .attr("fill", "steelblue");
    }

    // Función genérica para crear texto explicativo
    function createExplanation(svg, width, text) {
        return svg.append("text")
            .attr("x", width / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "16px")
            .text(text);
    }

    // Animación para Shell Sort
    function animateShellSort() {
        const data = [35, 33, 42, 10, 14, 19, 27, 44]; // Datos iniciales
        const width = 800;
        const height = 400;
        const barSpacing = 10; // Espacio entre barras
        const barWidth = (width - (data.length - 1) * barSpacing) / data.length; // Ancho dinámico de las barras
        const maxHeight = Math.max(...data); // Altura máxima para escalar las barras
        const scaleFactor = 0.9; // Factor de escalado para dejar margen superior

        // Crear el SVG
        const svg = d3.select("#shellSortAnimation")
            .append("svg")
            .attr("width", width)
            .attr("height", height + 100); // Incrementar el alto para espacio del texto

        // Crear las barras iniciales
        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (barWidth + barSpacing)) // Agregar espacio entre las barras
            .attr("y", d => height - (d / maxHeight) * height * scaleFactor) // Escalar las barras dinámicamente
            .attr("width", barWidth)
            .attr("height", d => (d / maxHeight) * height * scaleFactor) // Escalar las barras dinámicamente
            .attr("fill", "steelblue");

        // Crear los textos iniciales
        const labels = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d, i) => i * (barWidth + barSpacing) + barWidth / 2) // Centrar el texto en la barra
            .attr("y", d => height - (d / maxHeight) * height * scaleFactor - 5) // Ajustar la posición vertical
            .text(d => d)
            .attr("fill", "black")
            .attr("font-size", "12px")
            .attr("text-anchor", "middle");

        // Crear un texto explicativo
        const explanation = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 50) // Posición vertical en la parte inferior
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "16px")
            .text("Iniciando Shell Sort...");

        async function shellSort(arr) {
            let gap = Math.floor(arr.length / 2);

            while (gap > 0) {
                explanation.text(`Usando intervalo (gap): ${gap}`);
                for (let i = gap; i < arr.length; i++) {
                    let temp = arr[i];
                    let j = i;

                    // Resaltar la barra actual
                    highlightBar(bars, j, "orange");

                    while (j >= gap && arr[j - gap] > temp) {
                        explanation.text(`Comparando: ${arr[j - gap]} y ${temp}`);
                        arr[j] = arr[j - gap];
                        updateBarsAndLabels(bars, labels, arr, barWidth, height, maxHeight, barSpacing, scaleFactor);
                        j -= gap;
                        await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa más larga para mostrar el movimiento
                    }

                    arr[j] = temp;
                    updateBarsAndLabels(bars, labels, arr, barWidth, height, maxHeight, barSpacing, scaleFactor);
                    await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa más larga para mostrar el cambio
                }

                gap = Math.floor(gap / 2);
            }

            explanation.text("Shell Sort completado.");
            bars.attr("fill", "green"); // Resaltar todas las barras en verde al finalizar
        }

        // Función para resaltar una barra
        function highlightBar(bars, index, color) {
            bars.filter((d, idx) => idx === index)
                .transition()
                .duration(1500) // Transición más lenta
                .attr("fill", color)
                .transition()
                .duration(1500) // Transición más lenta
                .attr("fill", "steelblue");
        }

        // Función para actualizar barras y etiquetas
        function updateBarsAndLabels(bars, labels, data, barWidth, height, maxHeight, barSpacing, scaleFactor) {
            bars.data(data)
                .transition()
                .duration(1500) // Transición más lenta
                .attr("x", (d, i) => i * (barWidth + barSpacing)) // Ajustar la posición horizontal
                .attr("y", d => height - (d / maxHeight) * height * scaleFactor) // Ajustar la posición vertical
                .attr("height", d => (d / maxHeight) * height * scaleFactor); // Ajustar la altura

            labels.data(data)
                .transition()
                .duration(1500) // Transición más lenta
                .attr("x", (d, i) => i * (barWidth + barSpacing) + barWidth / 2) // Ajustar la posición horizontal
                .attr("y", d => height - (d / maxHeight) * height * scaleFactor - 5) // Ajustar la posición vertical
                .text(d => d);
        }

        // Iniciar el proceso de Shell Sort
        shellSort(data);
    }

    // Vincular la animación al modal
    const shellSortModal = document.getElementById("shellSortModal");
    if (shellSortModal) {
        shellSortModal.addEventListener("shown.bs.modal", () => {
            d3.select("#shellSortAnimation").selectAll("*").remove();
            animateShellSort();
        });
    } else {
        console.error("El modal con ID 'shellSortModal' no existe.");
    }

    // Ruta base calculada desde el src del propio script (funciona tanto en index.html como en subcarpetas)
    const baseURL = (() => {
        const el = document.querySelector('script[src*="scripts.js"]');
        return el ? el.src.replace(/js\/scripts\.js.*$/, '') : '../';
    })();

    // Cargar el navbar desde un archivo externo
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
        fetch(`${baseURL}components/navbar.html`)
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
            })
            .catch(error => console.error("Error al cargar el navbar:", error));
    }

    // Cargar el footer desde un archivo externo
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch(`${baseURL}components/footer.html`)
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error al cargar el footer:", error));
    }

    // Mostrar/ocultar el panel de accesibilidad
    const accessibilityBtn = document.getElementById("accessibility-btn");
    const accessibilityPanel = document.getElementById("accessibility-panel");

    if (accessibilityBtn && accessibilityPanel) {
        accessibilityBtn.addEventListener("click", () => {
            accessibilityPanel.style.display = accessibilityPanel.style.display === "none" ? "block" : "none";
        });

        // Funcionalidades de accesibilidad
        document.getElementById("increase-text").addEventListener("change", (e) => {
            document.documentElement.style.fontSize = e.target.checked ? "1.2rem" : "1rem";
        });

        document.getElementById("high-contrast").addEventListener("change", (e) => {
            document.body.style.backgroundColor = e.target.checked ? "#000" : "";
            document.body.style.color = e.target.checked ? "#fff" : "";
        });

        document.getElementById("readable-font").addEventListener("change", (e) => {
            document.body.style.fontFamily = e.target.checked ? "'Arial', sans-serif" : "'Rubik', sans-serif";
        });

        document.getElementById("underline-links").addEventListener("change", (e) => {
            const links = document.querySelectorAll("a");
            links.forEach(link => {
                link.style.textDecoration = e.target.checked ? "underline" : "none";
            });
        });
    }

    // Función para realizar el sorteo
    function realizarSorteo() {
        let lideres = ["David Castro", "Bryant Dzul", "Michael Alavez"];
        let miembrosA = ["Castillo Pinzón", "Salomón Campos", "Diaz León"];
        let miembrosB = ["Inurreta Brito", "Pool Cruz", "Barbosa Vidal"];
        let proyectos = ["Proyecto 1", "Proyecto 2", "Proyecto 3"];

        const equipos = []; // Aquí se almacenarán los equipos

        // Función para seleccionar y eliminar un elemento aleatorio de un arreglo
        function seleccionarYEliminar(arr) {
            const index = Math.floor(Math.random() * arr.length);
            return arr.splice(index, 1)[0];
        }

        // Crear los equipos
        while (lideres.length > 0 && miembrosA.length > 0 && miembrosB.length > 0 && proyectos.length > 0) {
            const equipo = {
                lider: seleccionarYEliminar(lideres),
                miembroA: seleccionarYEliminar(miembrosA),
                miembroB: seleccionarYEliminar(miembrosB),
                proyecto: seleccionarYEliminar(proyectos)
            };
            equipos.push(equipo);
        }

        // Mostrar resultados con animación
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = ""; // Limpiar resultados previos

        equipos.forEach((equipo, index) => {
            setTimeout(() => {
                const equipoDiv = document.createElement("div");
                equipoDiv.className = "result-item";
                equipoDiv.innerHTML = `
                    <strong>Equipo ${index + 1}:</strong><br>
                    <strong>Líder:</strong> ${equipo.lider}<br>
                    <strong>Miembro A:</strong> ${equipo.miembroA}<br>
                    <strong>Miembro B:</strong> ${equipo.miembroB}<br>
                    <strong>Proyecto:</strong> ${equipo.proyecto}
                `;
                resultDiv.appendChild(equipoDiv);

                // Animación de aparición
                equipoDiv.style.opacity = 0;
                equipoDiv.style.transform = "translateY(-20px)";
                setTimeout(() => {
                    equipoDiv.style.transition = "opacity 0.5s, transform 0.5s";
                    equipoDiv.style.opacity = 1;
                    equipoDiv.style.transform = "translateY(0)";
                }, 50);
            }, index * 1500); // Retraso entre cada equipo
        });
    }

    // Agregar evento al botón de sorteo
    const sorteoBtn = document.getElementById("sorteoBtn");
    if (sorteoBtn) {
        sorteoBtn.addEventListener("click", realizarSorteo);
    }

    // Animación para explicar cómo funcionan las matrices
    const canvas = document.getElementById("matrixAnimation");
    const modal = document.getElementById("animationModal");

    if (canvas && modal) {
        const ctx = canvas.getContext("2d");

        const rows = 3;
        const cols = 3;
        const cellSize = 100;
        const cellHeight = cellSize; // Asegurar que cellHeight esté definido
        let currentRow = 0;
        let currentCol = 0;

        // Dibujar la matriz
        const drawMatrix = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "16px Arial";

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * cellSize;
                    const y = i * cellHeight;

                    // Resaltar la celda actual
                    if (i === currentRow && j === currentCol) {
                        ctx.fillStyle = "#f0ad4e"; // Color de resaltado
                        ctx.fillRect(x, y, cellSize, cellHeight);
                    }

                    // Dibujar celda
                    ctx.strokeStyle = "#000";
                    ctx.strokeRect(x, y, cellSize, cellHeight);

                    // Etiqueta de índice
                    ctx.fillStyle = "#000";
                    ctx.fillText(`[${i},${j}]`, x + 10, y + 20);
                }
            }
        };

        // Animar el recorrido por la matriz
        const animateMatrix = () => {
            drawMatrix();

            // Avanzar al siguiente elemento
            currentCol++;
            if (currentCol >= cols) {
                currentCol = 0;
                currentRow++;
            }

            // Detener la animación al final de la matriz
            if (currentRow >= rows) {
                clearInterval(animationInterval);
            }
        };

        let animationInterval;

        // Iniciar la animación cuando se muestra el modal
        modal.addEventListener("shown.bs.modal", () => {
            currentRow = 0;
            currentCol = 0;
            animationInterval = setInterval(animateMatrix, 500); // Actualizar cada 500ms
        });

        // Detener la animación cuando se cierra el modal
        modal.addEventListener("hidden.bs.modal", () => {
            clearInterval(animationInterval);
        });
    }

    // Animación para explicar cómo funcionan las colas
    const queueCanvas = document.getElementById("queueAnimation");
    const queueModal = document.getElementById("animationModal");

    if (queueCanvas && queueModal) {
        const ctx = queueCanvas.getContext("2d");
        const queue = ["A", "B", "C", "D", "E"];
        const cellWidth = 100;
        const cellHeight = 50;
        const startX = 50;
        const startY = 75;
        const animationSpeed = 10; // Velocidad de la animación
        let isAnimating = false;

        // Dibujar la cola
        const drawQueue = () => {
            ctx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            queue.forEach((element, index) => {
                const x = startX + index * (cellWidth + 10);
                ctx.strokeStyle = "#000";
                ctx.strokeRect(x, startY, cellWidth, cellHeight);
                ctx.fillText(element, x + cellWidth / 2, startY + cellHeight / 2);
            });
        };

        // Animar la eliminación de un elemento
        const dequeueAnimation = () => {
            if (queue.length > 0 && !isAnimating) {
                isAnimating = true;
                const removedElement = queue[0];
                let offset = 0;

                // Animar el primer elemento hacia arriba
                const animateRemoval = () => {
                    ctx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
                    ctx.font = "20px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    // Dibujar los elementos restantes
                    queue.forEach((element, index) => {
                        const x = startX + index * (cellWidth + 10);
                        const y = index === 0 ? startY - offset : startY;
                        ctx.strokeStyle = "#000";
                        ctx.strokeRect(x, y, cellWidth, cellHeight);
                        ctx.fillText(element, x + cellWidth / 2, y + cellHeight / 2);
                    });

                    // Incrementar el desplazamiento
                    if (offset < cellHeight + 20) {
                        offset += animationSpeed;
                        requestAnimationFrame(animateRemoval);
                    } else {
                        // Eliminar el primer elemento y desplazar los demás
                        queue.shift();
                        animateShift();
                    }
                };

                // Animar el desplazamiento de los elementos restantes hacia la izquierda
                const animateShift = () => {
                    let shiftOffset = 0;

                    const shiftElements = () => {
                        ctx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);

                        queue.forEach((element, index) => {
                            const x = startX + index * (cellWidth + 10) - shiftOffset;
                            ctx.strokeStyle = "#000";
                            ctx.strokeRect(x, startY, cellWidth, cellHeight);
                            ctx.fillText(element, x + cellWidth / 2, startY + cellHeight / 2);
                        });

                        if (shiftOffset < cellWidth + 10) {
                            shiftOffset += animationSpeed;
                            requestAnimationFrame(shiftElements);
                        } else {
                            isAnimating = false;
                            drawQueue(); // Redibujar la cola final
                        }
                    };

                    shiftElements();
                };

                animateRemoval();
            }
        };

        // Dibujar la cola inicial
        queueModal.addEventListener("shown.bs.modal", () => {
            drawQueue();
            const interval = setInterval(() => {
                if (queue.length > 0) {
                    dequeueAnimation();
                } else {
                    clearInterval(interval);
                }
            }, 2000); // Eliminar un elemento cada 2 segundos
        });
    }

    // Animación para explicar cómo funcionan las pilas
    const stackCanvas = document.getElementById("stackAnimation");
    const stackModal = document.getElementById("animationModal");

    if (stackCanvas && stackModal) {
        const ctx = stackCanvas.getContext("2d");
        const stack = ["A", "B", "C", "D", "E"];
        const cellWidth = 100;
        const cellHeight = 50;
        const startX = 150;
        const startY = 300;
        const animationSpeed = 10;
        let isAnimating = false;

        // Dibujar la pila
        const drawStack = () => {
            ctx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            stack.forEach((element, index) => {
                const x = startX;
                const y = startY - index * (cellHeight + 10);
                ctx.strokeStyle = "#000";
                ctx.strokeRect(x, y, cellWidth, cellHeight);
                ctx.fillText(element, x + cellWidth / 2, y + cellHeight / 2);
            });
        };

        // Animar la eliminación de un elemento
        const popAnimation = () => {
            if (stack.length > 0 && !isAnimating) {
                isAnimating = true;
                const removedElement = stack.pop();
                let offset = 0;

                const animateRemoval = () => {
                    ctx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);

                    stack.forEach((element, index) => {
                        const x = startX;
                        const y = startY - index * (cellHeight + 10);
                        ctx.strokeStyle = "#000";
                        ctx.strokeRect(x, y, cellWidth, cellHeight);
                        ctx.fillText(element, x + cellWidth / 2, y + cellHeight / 2);
                    });

                    const x = startX;
                    const y = startY - stack.length * (cellHeight + 10) - offset;
                    ctx.strokeStyle = "#f00";
                    ctx.strokeRect(x, y, cellWidth, cellHeight);
                    ctx.fillText(removedElement, x + cellWidth / 2, y + cellHeight / 2);

                    if (offset < 100) {
                        offset += animationSpeed;
                        requestAnimationFrame(animateRemoval);
                    } else {
                        isAnimating = false;
                        drawStack();
                    }
                };

                animateRemoval();
            }
        }

        // Dibujar la pila inicial
        stackModal.addEventListener("shown.bs.modal", () => {
            drawStack();
            const interval = setInterval(() => {
                if (stack.length > 0) {
                    popAnimation();
                } else {
                    clearInterval(interval);
                }
            }, 2000);
        });
    }

    // Animación para explicar cómo funcionan las listas enlazadas
    const linkedListCanvas = document.getElementById("linkedListAnimation");
    const linkedListModal = document.getElementById("animationModal");

    if (linkedListCanvas && linkedListModal) {
        const ctx = linkedListCanvas.getContext("2d");
        const nodes = ["A", "B", "C", "D", "E"];
        const nodeRadius = 30;
        const startX = 50;
        const startY = 100;
        const nodeSpacing = 150;
        let currentNodeIndex = 0;
        let animationStep = 0;

        // Dibujar un nodo
        const drawNode = (x, y, value, highlight = false) => {
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = highlight ? "#ffcc00" : "#fff"; // Nodo resaltado en amarillo
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(value, x, y);
        };

        // Dibujar una flecha
        const drawArrow = (x1, y1, x2, y2, progress = 1) => {
            const headLength = 10; // Tamaño de la cabeza de la flecha
            const angle = Math.atan2(y2 - y1, x2 - x1);

            // Calcular el punto final de la flecha según el progreso
            const currentX = x1 + (x2 - x1) * progress;
            const currentY = y1 + (y2 - y1) * progress;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Dibujar la cabeza de la flecha solo si el progreso está completo
            if (progress === 1) {
                ctx.beginPath();
                ctx.moveTo(x2, y2);
                ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
                ctx.moveTo(x2, y2);
                ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
                ctx.stroke();
            }
        };

        // Dibujar la lista enlazada
        const drawLinkedList = (progress = 1) => {
            ctx.clearRect(0, 0, linkedListCanvas.width, linkedListCanvas.height);

            nodes.forEach((node, index) => {
                const x = startX + index * nodeSpacing;
                drawNode(x, startY, node, index === currentNodeIndex);

                if (index < nodes.length - 1) {
                    const nextX = startX + (index + 1) * nodeSpacing;
                    drawArrow(x + nodeRadius, startY, nextX - nodeRadius, startY, progress);
                }
            });
        };

        // Animar el recorrido de la lista
        const animateTraversal = () => {
            if (currentNodeIndex < nodes.length) {
                if (animationStep <= 1) {
                    drawLinkedList(animationStep);
                    animationStep += 0.05; // Incrementar el progreso de la flecha
                    requestAnimationFrame(animateTraversal);
                } else {
                    animationStep = 0; // Reiniciar el progreso de la flecha
                    currentNodeIndex++;
                    setTimeout(animateTraversal, 500); // Pausa antes de pasar al siguiente nodo
                }
            } else {
                currentNodeIndex = 0; // Reiniciar la animación
                setTimeout(() => animateTraversal(), 1000); // Pausa antes de reiniciar
            }
        };

        // Iniciar la animación cuando se muestra el modal
        linkedListModal.addEventListener("shown.bs.modal", () => {
            currentNodeIndex = 0;
            animationStep = 0;
            animateTraversal();
        });
    }

    // Animación para explicar cómo funcionan las listas doblemente enlazadas
    const doublyLinkedListCanvas = document.getElementById("doublyLinkedListAnimation");
    const doublyLinkedListModal = document.getElementById("animationModal");

    if (doublyLinkedListCanvas && doublyLinkedListModal) {
        const ctx = doublyLinkedListCanvas.getContext("2d");
        const nodes = ["A", "B", "C", "D", "E"];
        const nodeRadius = 30;
        const startX = 50;
        const startY = 150;
        const nodeSpacing = 150;
        let currentNodeIndex = 0;
        let direction = 1; // 1 para adelante, -1 para atrás

        // Dibujar un nodo
        const drawNode = (x, y, value, highlight = false) => {
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = highlight ? "#ffcc00" : "#fff"; // Nodo resaltado en amarillo
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(value, x, y);
        };

        // Dibujar una flecha
        const drawArrow = (x1, y1, x2, y2, highlight = false) => {
            const headLength = 10; // Tamaño de la cabeza de la flecha
            const angle = Math.atan2(y2 - y1, x2 - x1);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = highlight ? "#ff0000" : "#000"; // Resaltar flecha activa en rojo
            ctx.lineWidth = 2;
            ctx.stroke();

            // Dibujar la cabeza de la flecha
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        };

        // Dibujar la lista doblemente enlazada
        const drawDoublyLinkedList = () => {
            ctx.clearRect(0, 0, doublyLinkedListCanvas.width, doublyLinkedListCanvas.height);

            nodes.forEach((node, index) => {
                const x = startX + index * nodeSpacing;
                const isCurrent = index === currentNodeIndex;

                // Dibujar nodo
                drawNode(x, startY, node, isCurrent);

                // Dibujar flecha hacia adelante
                if (index < nodes.length - 1) {
                    const nextX = startX + (index + 1) * nodeSpacing;
                    drawArrow(x + nodeRadius, startY, nextX - nodeRadius, startY, isCurrent && direction === 1);
                }

                // Dibujar flecha hacia atrás
                if (index > 0) {
                    const prevX = startX + (index - 1) * nodeSpacing;
                    drawArrow(x - nodeRadius, startY, prevX + nodeRadius, startY, isCurrent && direction === -1);
                }
            });
        };

        // Animar el recorrido de la lista
        const animateTraversal = () => {
            drawDoublyLinkedList();

            currentNodeIndex += direction;
            if (currentNodeIndex >= nodes.length || currentNodeIndex < 0) {
                direction *= -1; // Cambiar de dirección
                currentNodeIndex += direction;
            }

            setTimeout(animateTraversal, 1000); // Pausa entre movimientos
        };

        // Iniciar la animación cuando se muestra el modal
        doublyLinkedListModal.addEventListener("shown.bs.modal", () => {
            currentNodeIndex = 0;
            direction = 1;
            animateTraversal();
        });
    }

    // Animación para explicar cómo funcionan las listas circulares
    const circularListContainer = document.getElementById("circularListAnimation");
    const circularListModal = document.getElementById("animationModal");

    if (circularListContainer && circularListModal) {
        const width = 800; // Ancho del SVG
        const height = 300; // Alto del SVG
        const radius = 120; // Radio del círculo
        const nodes = ["A", "B", "C", "D", "E"];
        let currentNodeIndex = 0;

        // Crear un SVG con D3.js
        const svg = d3.select(circularListContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Calcular posiciones circulares para los nodos
        const angleStep = (2 * Math.PI) / nodes.length;
        const positions = nodes.map((_, i) => {
            const angle = i * angleStep;
            return {
                x: width / 2 + radius * Math.cos(angle),
                y: height / 2 + radius * Math.sin(angle),
            };
        });

        // Dibujar nodos
        const nodeGroup = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", (d, i) => `translate(${positions[i].x}, ${positions[i].y})`);

        nodeGroup.append("circle")
            .attr("r", 30)
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);

        nodeGroup.append("text")
            .text((d) => d)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("font-size", "16px");

        // Dibujar flechas
        const linkGroup = svg.selectAll(".link")
            .data(nodes)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", (d, i) => positions[i].x)
            .attr("y1", (d, i) => positions[i].y)
            .attr("x2", (d, i) => positions[(i + 1) % nodes.length].x)
            .attr("y2", (d, i) => positions[(i + 1) % nodes.length].y)
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrow)");

        // Definir marcador de flecha
        svg.append("defs")
            .append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 5)
            .attr("refY", 5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M 0 0 L 10 5 L 0 10 Z")
            .attr("fill", "#000");

        // Animar el recorrido de la lista
        const animateTraversal = () => {
            // Resaltar el nodo actual
            nodeGroup.select("circle")
                .attr("fill", (d, i) => (i === currentNodeIndex ? "#ffcc00" : "#fff"));

            // Avanzar al siguiente nodo
            currentNodeIndex = (currentNodeIndex + 1) % nodes.length;

            setTimeout(animateTraversal, 1000); // Pausa entre movimientos
        };

        // Iniciar la animación cuando se muestra el modal
        circularListModal.addEventListener("shown.bs.modal", () => {
            currentNodeIndex = 0;
            animateTraversal();
        });
    }

    // Animación para explicar cómo funcionan los árboles
    const treeContainer = document.getElementById("treeAnimation");
    const treeModal = document.getElementById("animationModal");

    if (treeContainer && treeModal) {
        const treeData = {
            name: "A",
            children: [
                {
                    name: "B",
                    children: [
                        { name: "D" },
                        { name: "E" }
                    ]
                },
                {
                    name: "C",
                    children: [
                        { name: "F" },
                        { name: "G" }
                    ]
                }
            ]
        };

        const width = 1200; // Ampliado el ancho del SVG
        const height = 500; // Ampliado el alto del SVG

        const svg = d3.select(treeContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(50, 50)"); // Margen para centrar el árbol

        const treeLayout = d3.tree().size([width - 100, height - 100]); // Ajustar el tamaño del árbol
        const root = d3.hierarchy(treeData);
        treeLayout(root);

        // Dibujar enlaces
        svg.selectAll(".link")
            .data(root.links())
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
            .attr("stroke", "#000")
            .attr("stroke-width", 2);

        // Dibujar nodos
        const nodes = svg.selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);

        nodes.append("circle")
            .attr("r", 40)
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);

        nodes.append("text")
            .text(d => d.data.name)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("font-size", "20px");

        // Función para realizar el recorrido Preorden
        const preOrderTraversal = (node, callback) => {
            if (!node) return;
            callback(node); // Procesar el nodo actual (Raíz)
            if (node.children) {
                node.children.forEach(child => preOrderTraversal(child, callback)); // Recorrer hijos
            }
        };
        
        //Función para realizar el recorrido Inorden
        const inOrderTraversal = (node, callback) => {
            if (!node) return;
            if (node.children && node.children[0]) inOrderTraversal(node.children[0], callback); // Izquierda
            callback(node); // Raíz
            if (node.children && node.children[1]) inOrderTraversal(node.children[1], callback); // Derecha
        };

        // Función para realizar el recorrido Postorden
        const postOrderTraversal = (node, callback) => {
            if (!node) return;
            if (node.children) node.children.forEach(child => postOrderTraversal(child, callback)); // Hijos
            callback(node); // Raíz
        };

        // Animar el recorrido Preorden
        const animatePreOrder = () => {
            const nodesToVisit = [];
            postOrderTraversal(root, node => nodesToVisit.push(node)); // Obtener nodos en orden Preorden

            let index = 0;

            const highlightNode = () => {
                if (index >= nodesToVisit.length) return; // Terminar animación

                // Resaltar el nodo actual
                svg.selectAll("circle")
                    .attr("fill", d => (d === nodesToVisit[index] ? "#ffcc00" : "#fff"));

                index++;
                setTimeout(highlightNode, 1000); // Pausa entre nodos
            };

            highlightNode(); // Iniciar la animación
        };

        // Iniciar la animación cuando se muestra el modal
        treeModal.addEventListener("shown.bs.modal", () => {
            animatePreOrder();
        });
    }

    // Animación para explicar cómo funcionan los grafos
    const graphContainer = document.getElementById("graphAnimation");
    const graphModal = document.getElementById("animationModal");

    if (graphContainer && graphModal) {
        const width = 800; // Reducido el ancho del SVG
        const height = 600; // Reducido el alto del SVG

        // Nodos del grafo
        const nodes = [
            { id: "A" },
            { id: "B" },
            { id: "C" },
            { id: "D" },
            { id: "E" },
            { id: "F" },
            { id: "G" }
        ];

        // Enlaces del grafo
        const links = [
            { source: "A", target: "B" },
            { source: "A", target: "C" },
            { source: "B", target: "D" },
            { source: "B", target: "E" },
            { source: "C", target: "F" },
            { source: "C", target: "G" }
        ];

        const svg = d3.select(graphContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100)) // Reducida la distancia entre nodos
            .force("charge", d3.forceManyBody().strength(-300)) // Ajustada la fuerza de repulsión
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Dibujar enlaces
        const link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);

        // Dibujar nodos
        const node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragged)
                .on("end", dragEnded));

        node.append("circle")
            .attr("r", 20) // Reducido el radio de los nodos
            .attr("fill", "#ffcc00")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);

        node.append("text")
            .text(d => d.id)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("font-size", "12px"); // Reducido el tamaño del texto

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Función para realizar el recorrido BFS
        const bfsTraversal = (startNodeId) => {
            const visited = new Set();
            const queue = [startNodeId];
            const order = [];

            while (queue.length > 0) {
                const currentNodeId = queue.shift();
                if (!visited.has(currentNodeId)) {
                    visited.add(currentNodeId);
                    order.push(currentNodeId);

                    // Agregar los vecinos del nodo actual a la cola
                    links.forEach(link => {
                        if (link.source.id === currentNodeId && !visited.has(link.target.id)) {
                            queue.push(link.target.id);
                        } else if (link.target.id === currentNodeId && !visited.has(link.source.id)) {
                            queue.push(link.source.id);
                        }
                    });
                }
            }

            return order;
        };

        // Animar el recorrido BFS
        const animateBFS = () => {
            const bfsOrder = bfsTraversal("A"); // Iniciar desde el nodo "A"
            let index = 0;

            const highlightNode = () => {
                if (index >= bfsOrder.length) return; // Terminar animación

                // Resaltar el nodo actual
                svg.selectAll("circle")
                    .attr("fill", d => (d.id === bfsOrder[index] ? "#ff0000" : "#ffcc00")); // Nodo actual en rojo

                index++;
                setTimeout(highlightNode, 1000); // Pausa entre nodos
            };

            highlightNode(); // Iniciar la animación
        };

        // Iniciar la animación cuando se muestra el modal
        graphModal.addEventListener("shown.bs.modal", () => {
            simulation.alpha(1).restart();
            setTimeout(animateBFS, 2000); // Iniciar BFS después de 2 segundos
        });
    }

    // Animación para explicar cómo funcionan las tablas hash
    const hashTableContainer = document.getElementById("hashTableAnimation");
    const hashTableModal = document.getElementById("animationModal");

    if (hashTableContainer && hashTableModal) {
        const width = 800;
        const height = 400;

        const svg = d3.select(hashTableContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const hashTable = new Array(10).fill(null);

        const hashFunction = (key) => {
            return key.charCodeAt(0) % 10; // Función hash simple
        };

        const insert = (key, value) => {
            const index = hashFunction(key);
            hashTable[index] = value;

            // Dibujar la tabla hash
            drawHashTable();
        };

        const drawHashTable = () => {
            svg.selectAll("*").remove();

            // Dibujar celdas
            hashTable.forEach((value, index) => {
                svg.append("rect")
                    .attr("x", 50)
                    .attr("y", index * 35 + 10)
                    .attr("width", 200)
                    .attr("height", 30)
                    .attr("fill", "#f0f0f0")
                    .attr("stroke", "#000");

                svg.append("text")
                    .attr("x", 60)
                    .attr("y", index * 35 + 30)
                    .text(`Índice ${index}: ${value || ""}`)
                    .attr("font-size", "14px");
            });
        };

        // Insertar valores de ejemplo
        hashTableModal.addEventListener("shown.bs.modal", () => {
            insert("A", "Valor A");
            insert("B", "Valor B");
            insert("C", "Valor C");
        });
    }

    const radixSortModal = document.getElementById('radixSortModal');
    if (radixSortModal) {
        radixSortModal.addEventListener('shown.bs.modal', () => {
            d3.select("#radixSortAnimation").selectAll("*").remove(); // Limpiar cualquier animación previa
            animateRadixSort(); // Iniciar la animación
        });
    } else {
        console.error("El modal con ID 'radixSortModal' no existe.");
    }
});

function animateBubbleSort() {
    const data = [64, 34, 25, 12, 22, 11, 90]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    // Crear el SVG
    const svg = d3.select("#bubbleSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50); // Incrementar el alto para espacio del texto

    // Crear las barras
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * 4)
        .attr("width", barWidth - 5)
        .attr("height", d => d * 4)
        .attr("fill", "steelblue");

    // Crear los textos
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - d * 4 - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 30) // Mover el texto más abajo
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Bubble Sort...");

    // Bubble Sort con animación paso a paso
    let i = 0, j = 0;

    async function step() {
        if (i < data.length) {
            if (j < data.length - i - 1) {
                // Resaltar las barras que se están comparando
                bars.attr("fill", (d, idx) => (idx === j || idx === j + 1) ? "orange" : "steelblue");

                explanation.text(`Comparando: ${data[j]} y ${data[j + 1]}`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar la comparación

                if (data[j] > data[j + 1]) {
                    // Intercambiar elementos
                    explanation.text(`Intercambiando: ${data[j]} y ${data[j + 1]}`);
                    [data[j], data[j + 1]] = [data[j + 1], data[j]];

                    // Actualizar las barras
                    bars.data(data)
                        .transition()
                        .duration(1500) // Transición más lenta
                        .attr("x", (d, idx) => idx * barWidth)
                        .attr("y", d => height - d * 4)
                        .attr("height", d => d * 4);

                    // Actualizar los textos
                    labels.data(data)
                        .transition()
                        .duration(1500) // Transición más lenta
                        .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
                        .attr("y", d => height - d * 4 - 10)
                        .text(d => d);

                    await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el intercambio
                }

                j++;
                step();
            } else {
                // Finalizar la iteración actual
                bars.attr("fill", (d, idx) => (idx >= data.length - i - 1) ? "green" : "steelblue");
                j = 0;
                i++;
                await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el final de la iteración
                step();
            }
        } else {
            explanation.text("Bubble Sort completado.");
            bars.attr("fill", "green"); // Todas las barras en verde al finalizar
        }
    }

    step();
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    // Limpiar cualquier animación previa
    d3.select("#bubbleSortAnimation").selectAll("*").remove();
    animateBubbleSort();
});

function animateInsertionSort() {
    const data = [64, 34, 25, 12, 22, 11, 90]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    // Crear el SVG
    const svg = d3.select("#insertionSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50); // Incrementar el alto para espacio del texto

    // Crear las barras
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * 4)
        .attr("width", barWidth - 5)
        .attr("height", d => d * 4)
        .attr("fill", "steelblue");

    // Crear los textos
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - d * 4 - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 30) // Mover el texto más abajo
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Insertion Sort...");

    // Insertion Sort con animación paso a paso
    let i = 1;

    async function step() {
        if (i < data.length) {
            let key = data[i];
            let j = i - 1;

            explanation.text(`Seleccionando el elemento: ${key}`);
            bars.attr("fill", (d, idx) => (idx === i ? "orange" : "steelblue"));

            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar la selección

            async function innerStep() {
                if (j >= 0 && data[j] > key) {
                    explanation.text(`Comparando ${key} con ${data[j]}: Desplazando ${data[j]} a la derecha`);
                    bars.attr("fill", (d, idx) => (idx === j ? "red" : idx === i ? "orange" : "steelblue"));

                    // Desplazar la barra hacia la derecha
                    data[j + 1] = data[j];
                    bars.data(data)
                        .transition()
                        .duration(1500) // Transición más lenta
                        .attr("x", (d, idx) => idx * barWidth)
                        .attr("y", d => height - d * 4)
                        .attr("height", d => d * 4);

                    labels.data(data)
                        .transition()
                        .duration(1500) // Transición más lenta
                        .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
                        .attr("y", d => height - d * 4 - 10)
                        .text(d => d);

                    await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el desplazamiento
                    j--;
                    innerStep();
                } else {
                    explanation.text(`Insertando ${key} en su posición correcta`);
                    data[j + 1] = key;

                    bars.data(data)
                        .transition()
                        .duration(1500) // Transición más lenta
                        .attr("x", (d, idx) => idx * barWidth)
                        .attr("y", d => height - d * 4)
                        .attr("height", d => d * 4);

                    labels.data(data)
                        .transition()
                        .duration(1500) // Transición más lenta
                        .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
                        .attr("y", d => height - d * 4 - 10)
                        .text(d => d);

                    await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar la inserción
                    i++;
                    step();
                }
            }

            innerStep();
        } else {
            explanation.text("Insertion Sort completado.");
            bars.attr("fill", "green"); // Todas las barras en verde al finalizar
        }
    }

    step();
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    // Limpiar cualquier animación previa
    d3.select("#insertionSortAnimation").selectAll("*").remove();
    animateInsertionSort();
});

function animateSelectionSort() {
    const data = [64, 34, 25, 12, 22, 11, 90]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    // Crear el SVG
    const svg = d3.select("#selectionSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50);

    // Crear las barras
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * 4)
        .attr("width", barWidth - 5)
        .attr("height", d => d * 4)
        .attr("fill", "steelblue");

    // Crear los textos
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - d * 4 - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Selection Sort...");

    let i = 0;

    async function step() {
        if (i < data.length - 1) {
            let minIndex = i;

            explanation.text(`Buscando el elemento más pequeño desde la posición ${i}...`);
            bars.attr("fill", (d, idx) => (idx === i ? "orange" : "steelblue"));

            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa más larga para mostrar el inicio de la búsqueda

            for (let j = i + 1; j < data.length; j++) {
                bars.attr("fill", (d, idx) => (idx === j ? "yellow" : idx === minIndex ? "red" : "steelblue"));
                explanation.text(`Comparando: ${data[j]} con el mínimo actual (${data[minIndex]})`);

                await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa más larga para mostrar la comparación

                if (data[j] < data[minIndex]) {
                    minIndex = j;
                    explanation.text(`Nuevo mínimo encontrado: ${data[minIndex]} en la posición ${minIndex}`);
                    bars.attr("fill", (d, idx) => (idx === minIndex ? "red" : idx === j ? "yellow" : "steelblue"));

                    await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa más larga para mostrar el nuevo mínimo
                }
            }

            // Intercambiar elementos
            explanation.text(`Intercambiando: ${data[i]} con ${data[minIndex]}`);
            [data[i], data[minIndex]] = [data[minIndex], data[i]];

            bars.data(data)
                .transition()
                .duration(1500) // Transición más lenta
                .attr("x", (d, idx) => idx * barWidth)
                .attr("y", d => height - d * 4)
                .attr("height", d => d * 4);

            labels.data(data)
                .transition()
                .duration(1500) // Transición más lenta
                .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
                .attr("y", d => height - d * 4 - 10)
                .text(d => d);

            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa más larga para mostrar el intercambio

            i++;
            step();
        } else {
            explanation.text("Selection Sort completado.");
            bars.attr("fill", "green"); // Todas las barras en verde al finalizar
        }
    }

    step();
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    d3.select("#selectionSortAnimation").selectAll("*").remove();
    animateSelectionSort();
});

function animateMergeSort() {
    const data = [64, 34, 25, 12, 22, 11, 90]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    // Crear el SVG
    const svg = d3.select("#mergeSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50);

    // Crear las barras
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * 4)
        .attr("width", barWidth - 5)
        .attr("height", d => d * 4)
        .attr("fill", "steelblue");

    // Crear los textos
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - d * 4 - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Merge Sort...");

    // Función para dividir y combinar
    async function mergeSort(arr, left, right) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        // Dividir
        explanation.text(`Dividiendo: [${arr.slice(left, mid + 1)}] y [${arr.slice(mid + 1, right + 1)}]`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa más larga para mostrar la división

        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);

        // Combinar
        await merge(arr, left, mid, right);
    }

    async function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        explanation.text(`Combinando: [${leftArr}] y [${rightArr}]`);

        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
            updateBars(arr);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa más larga para mostrar la combinación
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
            updateBars(arr);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
            updateBars(arr);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        explanation.text(`Combinación completada: [${arr.slice(left, right + 1)}]`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa más larga para mostrar la combinación completada
    }

    function updateBars(arr) {
        bars.data(arr)
            .transition()
            .duration(1000)
            .attr("x", (d, idx) => idx * barWidth)
            .attr("y", d => height - d * 4)
            .attr("height", d => d * 4);

        labels.data(arr)
            .transition()
            .duration(1000)
            .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
            .attr("y", d => height - d * 4 - 10)
            .text(d => d);
    }

    // Iniciar el proceso de Merge Sort
    mergeSort(data, 0, data.length - 1).then(() => {
        explanation.text("Merge Sort completado.");
        bars.attr("fill", "green"); // Todas las barras en verde al finalizar
    });
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    d3.select("#mergeSortAnimation").selectAll("*").remove();
    animateMergeSort();
});

function animateQuickSort() {
    const data = [64, 34, 25, 12, 22, 11, 90]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    // Crear el SVG
    const svg = d3.select("#quickSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50);

    // Crear las barras
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * 4)
        .attr("width", barWidth - 5)
        .attr("height", d => d * 4)
        .attr("fill", "steelblue");

    // Crear los textos
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - d * 4 - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Quick Sort...");

    async function quickSort(arr, left, right) {
        if (left >= right) return;

        const pivotIndex = right;
        const pivotValue = arr[pivotIndex];
        explanation.text(`Seleccionando pivote: ${pivotValue}`);
        bars.attr("fill", (d, idx) => (idx === pivotIndex ? "orange" : "steelblue"));

        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el pivote

        let partitionIndex = left;
        for (let i = left; i < right; i++) {
            bars.attr("fill", (d, idx) => {
                if (idx === pivotIndex) return "orange"; // Pivote
                if (idx === i) return "yellow"; // Elemento actual
                if (idx === partitionIndex) return "red"; // Posición de partición
                return "steelblue";
            });

            explanation.text(`Comparando: ${arr[i]} con el pivote (${pivotValue})`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar la comparación

            if (arr[i] < pivotValue) {
                explanation.text(`Intercambiando: ${arr[i]} con ${arr[partitionIndex]}`);
                [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
                partitionIndex++;

                // Actualizar las barras
                bars.data(arr)
                    .transition()
                    .duration(1500)
                    .attr("x", (d, idx) => idx * barWidth)
                    .attr("y", d => height - d * 4)
                    .attr("height", d => d * 4);

                labels.data(arr)
                    .transition()
                    .duration(1500)
                    .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
                    .attr("y", d => height - d * 4 - 10)
                    .text(d => d);

                await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el intercambio
            }
        }

        explanation.text(`Colocando el pivote (${pivotValue}) en su posición final`);
        [arr[partitionIndex], arr[pivotIndex]] = [arr[pivotIndex], arr[partitionIndex]];

        // Actualizar las barras
        bars.data(arr)
            .transition()
            .duration(1500)
            .attr("x", (d, idx) => idx * barWidth)
            .attr("y", d => height - d * 4)
            .attr("height", d => d * 4);

        labels.data(arr)
            .transition()
            .duration(1500)
            .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
            .attr("y", d => height - d * 4 - 10)
            .text(d => d);

        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el pivote en su lugar

        // Resaltar la partición
        bars.attr("fill", (d, idx) => {
            if (idx < partitionIndex) return "green"; // Elementos menores al pivote
            if (idx === partitionIndex) return "orange"; // Pivote
            if (idx > partitionIndex) return "steelblue"; // Elementos mayores al pivote
        });

        await quickSort(arr, left, partitionIndex - 1);
        await quickSort(arr, partitionIndex + 1, right);
    }

    quickSort(data, 0, data.length - 1).then(() => {
        explanation.text("Quick Sort completado.");
        bars.attr("fill", "green"); // Todas las barras en verde al finalizar
    });
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    d3.select("#quickSortAnimation").selectAll("*").remove();
    animateQuickSort();
});

function animateHeapSort() {
    const data = [64, 34, 25, 12, 22, 11, 90]; // Datos iniciales
    const modal = document.getElementById("animationModal");
    const width = modal.clientWidth - 150; // Reducir el ancho del árbol
    const height = modal.clientHeight - 100; // Reducir un poco la altura del árbol

    // Crear el SVG
    const svg = d3.select("#heapSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`) // Escalar dinámicamente
        .attr("preserveAspectRatio", "xMidYMid meet") // Mantener proporciones
        .append("g") // Grupo principal
        .attr("transform", "translate(0, 50)"); // Desplazar el árbol 50px hacia abajo

    // Función para construir un árbol binario a partir de un arreglo
    function buildBinaryTree(arr) {
        const nodes = arr.map(value => ({ value }));
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].left = nodes[2 * i + 1] || null;
            nodes[i].right = nodes[2 * i + 2] || null;
        }
        return nodes[0];
    }

    // Calcular posiciones para los nodos del árbol
    const treeLayout = d3.tree().size([width - 500, height - 250]); // Reducir el tamaño del árbol
    const root = d3.hierarchy(buildBinaryTree(data), d => [d.left, d.right].filter(n => n));
    treeLayout(root);

    // Dibujar enlaces del árbol
    const links = svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5); // Reducir el grosor de los enlaces

    // Dibujar nodos del árbol
    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    nodes.append("circle")
        .attr("r", 15) // Reducir el tamaño de los nodos
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

    nodes.append("text")
        .text(d => d.data.value)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12px"); // Reducir el tamaño del texto

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "14px")
        .text("Iniciando Heap Sort...");

    // Función para actualizar el árbol visualmente
    function updateTree(arr) {
        const newRoot = d3.hierarchy(buildBinaryTree(arr), d => [d.left, d.right].filter(n => n));
        treeLayout(newRoot);

        links.data(newRoot.links())
            .transition()
            .duration(1500)
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        nodes.data(newRoot.descendants())
            .transition()
            .duration(1500)
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .select("text")
            .text(d => d.data.value);
    }

    // Función para resaltar un nodo
    function highlightNode(index, color) {
        nodes.select("circle")
            .attr("fill", (d, i) => (i === index ? color : "#fff"));
    }

    // Función para resaltar todos los nodos
    function highlightAllNodes(color) {
        nodes.select("circle")
            .attr("fill", color);
    }

    // Función para aplicar heapify
    async function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        // Resaltar el nodo actual
        highlightNode(i, "orange");
        explanation.text(`Procesando nodo ${arr[i]} en el índice ${i}`);

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            explanation.text(`Intercambiando ${arr[i]} con ${arr[largest]}`);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            updateTree(arr);

            await new Promise(resolve => setTimeout(resolve, 2000));
            await heapify(arr, n, largest);
        }
    }

    // Función para construir el heap y ordenar
    async function heapSort(arr) {
        const n = arr.length;

        // Construir el max-heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            explanation.text(`Construyendo max-heap desde el índice ${i}`);
            await heapify(arr, n, i);
        }

        // Extraer elementos del heap uno por uno
        for (let i = n - 1; i > 0; i--) {
            explanation.text(`Intercambiando ${arr[0]} con ${arr[i]} y reduciendo el heap`);
            [arr[0], arr[i]] = [arr[i], arr[0]];

            updateTree(arr);

            await new Promise(resolve => setTimeout(resolve, 2000));
            await heapify(arr, i, 0);
        }

        explanation.text("Heap Sort completado.");
        highlightAllNodes("green");
    }

    // Iniciar el proceso de Heap Sort
    heapSort(data);
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    d3.select("#heapSortAnimation").selectAll("*").remove();
    animateHeapSort();
});

function animateCountingSort() {
    const data = [4, 2, 2, 8, 3, 3, 1]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;
    const maxHeight = Math.max(...data); // Altura máxima para escalar las barras

    // Crear el SVG
    const svg = d3.select("#countingSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 200);

    // Crear las barras iniciales
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - (d / maxHeight) * (height - 50)) // Escalar las barras dinámicamente
        .attr("width", barWidth - 5)
        .attr("height", d => (d / maxHeight) * (height - 50)) // Escalar las barras dinámicamente
        .attr("fill", "steelblue");

    // Crear los textos iniciales
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - (d / maxHeight) * (height - 50) - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30) // Posición vertical en la parte superior
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Counting Sort...");

    async function countingSort(arr) {
        const max = Math.max(...arr);
        const count = new Array(max + 1).fill(0);

        // Paso 1: Contar las frecuencias
        explanation.text("Contando las frecuencias de cada elemento...");
        for (const num of arr) {
            count[num]++;
            highlightBar(num, "orange");
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa para mostrar el conteo
        }

        // Mostrar el arreglo de conteo
        const countBars = svg.selectAll(".count-bar")
            .data(count)
            .enter()
            .append("rect")
            .attr("class", "count-bar")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height + 200 - d * 30) // Aumentar el valor de "height + 200" para bajar las barras
            .attr("width", barWidth - 5)
            .attr("height", d => d * 30) // Reducir el tamaño si es necesario
            .attr("fill", "lightgreen");

        const countLabels = svg.selectAll(".count-label")
            .data(count)
            .enter()
            .append("text")
            .attr("class", "count-label")
            .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
            .attr("y", d => height + 190 - d * 30) // Ajustar la posición del texto para que coincida con las barras
            .text(d => d)
            .attr("fill", "black")
            .attr("font-size", "14px");

        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa para mostrar el arreglo de conteo

        // Paso 2: Suma acumulativa
        explanation.text("Calculando la suma acumulativa...");
        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
            countBars.data(count)
                .transition()
                .duration(1000)
                .attr("y", d => height + 200 - d * 30)
                .attr("height", d => d * 30);

            countLabels.data(count)
                .transition()
                .duration(1000)
                .attr("y", d => height + 190 - d * 30)
                .text(d => d);

            await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa para mostrar la suma acumulativa
        }

        // Paso 3: Construir el arreglo ordenado
        explanation.text("Construyendo el arreglo ordenado...");
        const sorted = new Array(arr.length);
        for (let i = arr.length - 1; i >= 0; i--) {
            const num = arr[i];
            const pos = count[num] - 1;
            sorted[pos] = num;
            count[num]--;

            // Actualizar visualmente
            highlightBar(num, "orange");
            countBars.data(count)
                .transition()
                .duration(1000)
                .attr("y", d => height + 200 - d * 30)
                .attr("height", d => d * 30);

            countLabels.data(count)
                .transition()
                .duration(1000)
                .attr("y", d => height + 190 - d * 30)
                .text(d => d);

            await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa para mostrar el proceso
        }

        // Mostrar el arreglo ordenado
        explanation.text("Counting Sort completado.");
        bars.data(sorted)
            .transition()
            .duration(1000)
            .attr("y", d => height - d * 30)
            .attr("height", d => d * 30)
            .attr("fill", "green");

        labels.data(sorted)
            .transition()
            .duration(1000)
            .attr("y", d => height - d * 30 - 10)
            .text(d => d);
    }

    // Función para resaltar una barra
    function highlightBar(value, color) {
        bars.filter(d => d === value)
            .transition()
            .duration(500)
            .attr("fill", color)
            .transition()
            .duration(500)
            .attr("fill", "steelblue");
    }

    // Iniciar el proceso de Counting Sort
    countingSort(data);
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('animationModal').addEventListener('shown.bs.modal', () => {
    d3.select("#countingSortAnimation").selectAll("*").remove();
    animateCountingSort();
});
function animateRadixSort() {
    const data = [170, 45, 75, 90, 802, 24, 2, 66]; // Datos iniciales
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;
    const maxHeight = Math.max(...data); // Altura máxima para escalar las barras

    // Crear el SVG
    const svg = d3.select("#radixSortAnimation")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 200);

    // Crear las barras iniciales
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - (d / maxHeight) * (height - 50)) // Escalar las barras dinámicamente
        .attr("width", barWidth - 5)
        .attr("height", d => (d / maxHeight) * (height - 50)) // Escalar las barras dinámicamente
        .attr("fill", "steelblue");

    // Crear los textos iniciales
    const labels = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr("y", d => height - (d / maxHeight) * (height - 50) - 10)
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "14px");

    // Crear un texto explicativo
    const explanation = svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30) // Posición vertical en la parte superior
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .text("Iniciando Radix Sort...");

    async function radixSort(arr) {
        const max = Math.max(...arr);
        let exp = 1;

        while (Math.floor(max / exp) > 0) {
            explanation.text(`Ordenando por el dígito en la posición ${exp}...`);
            await countingSortByDigit(arr, exp);
            exp *= 10;
        }

        explanation.text("Radix Sort completado.");
        bars.attr("fill", "green"); // Resaltar todas las barras en verde al finalizar
    }

    async function countingSortByDigit(arr, exp) {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);

        // Contar las frecuencias de los dígitos
        arr.forEach(num => {
            const digit = Math.floor(num / exp) % 10;
            count[digit]++;
        });

        // Calcular la suma acumulativa
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Construir el arreglo ordenado
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;

            // Actualizar visualmente el arreglo ordenado
            for (let i = 0; i < arr.length; i++) {
                arr[i] = output[i];

                // Actualizar las barras y etiquetas
                bars.data(arr)
                    .transition()
                    .duration(1000) // Transición más lenta
                    .attr("x", (d, idx) => idx * barWidth)
                    .attr("y", d => height - (d / maxHeight) * (height - 50))
                    .attr("height", d => (d / maxHeight) * (height - 50));

                labels.data(arr)
                    .transition()
                    .duration(1000) // Transición más lenta
                    .attr("x", (d, idx) => idx * barWidth + barWidth / 2 - 10)
                    .attr("y", d => height - (d / maxHeight) * (height - 50) - 10)
                    .text(d => d);

                await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa para mostrar el cambio
            }
        }
    }

    // Iniciar el proceso de Radix Sort
    radixSort(data);
}

// Ejecutar la animación cuando se abra el modal
document.getElementById('radixSortModal').addEventListener('shown.bs.modal', () => {
    d3.select("#radixSortAnimation").selectAll("*").remove(); // Limpiar cualquier animación previa
    animateRadixSort(); // Iniciar la animación
});

function animateStack() {
    const canvas = document.getElementById("stackAnimation");
    if (!canvas) {
        console.error("El canvas con ID 'stackAnimation' no existe.");
        return;
    }

    const ctx = canvas.getContext("2d");
    const stack = ["A", "B", "C", "D", "E"];
    const cellWidth = 100;
    const cellHeight = 50;
    const startX = 150;
    const startY = 300;
    const animationSpeed = 10;
    let isAnimating = false;

    // Dibujar la pila
    function drawStack() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        stack.forEach((element, index) => {
            const x = startX;
            const y = startY - index * (cellHeight + 10);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x, y, cellWidth, cellHeight);
            ctx.fillText(element, x + cellWidth / 2, y + cellHeight / 2);
        });
    }

    // Animar la eliminación de un elemento
    function popAnimation() {
        if (stack.length > 0 && !isAnimating) {
            isAnimating = true;
            const removedElement = stack.pop();
            let offset = 0;

            function animateRemoval() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                stack.forEach((element, index) => {
                    const x = startX;
                    const y = startY - index * (cellHeight + 10);
                    ctx.strokeStyle = "#000";
                    ctx.strokeRect(x, y, cellWidth, cellHeight);
                    ctx.fillText(element, x + cellWidth / 2, y + cellHeight / 2);
                });

                const x = startX;
                const y = startY - stack.length * (cellHeight + 10) - offset;
                ctx.strokeStyle = "#f00";
                ctx.strokeRect(x, y, cellWidth, cellHeight);
                ctx.fillText(removedElement, x + cellWidth / 2, y + cellHeight / 2);

                if (offset < 100) {
                    offset += animationSpeed;
                    requestAnimationFrame(animateRemoval);
                } else {
                    isAnimating = false;
                    drawStack();
                }
            }

            animateRemoval();
        }
    }

    // Dibujar la pila inicial
    drawStack();

    // Eliminar un elemento cada 2 segundos
    const interval = setInterval(() => {
        if (stack.length > 0) {
            popAnimation();
        } else {
            clearInterval(interval);
        }
    }, 2000);
}

// Ejecutar la animación cuando se abra el modal
document.getElementById("animationModal").addEventListener("shown.bs.modal", () => {
    animateStack();
});

