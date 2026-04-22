/**
 * data-structure-animations.js
 * Animaciones (Canvas y D3) para las páginas de estructuras de datos.
 * Se carga únicamente en las páginas de estructuras-datos/ y Recursividad/.
 */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('animationModal');
    if (!modal) return;

    // ── MATRICES ─────────────────────────────────────────────────────────
    const matrixCanvas = document.getElementById('matrixAnimation');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');
        const rows = 3, cols = 3, cellSize = 100;
        let currentRow = 0, currentCol = 0, animationInterval = null;

        const drawMatrix = () => {
            ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctx.font = '16px Arial';
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * cellSize, y = i * cellSize;
                    if (i === currentRow && j === currentCol) {
                        ctx.fillStyle = '#f0ad4e';
                        ctx.fillRect(x, y, cellSize, cellSize);
                    }
                    ctx.strokeStyle = '#000';
                    ctx.strokeRect(x, y, cellSize, cellSize);
                    ctx.fillStyle = '#000';
                    ctx.fillText(`[${i},${j}]`, x + 10, y + 20);
                }
            }
        };

        const animateMatrix = () => {
            drawMatrix();
            currentCol++;
            if (currentCol >= cols) { currentCol = 0; currentRow++; }
            if (currentRow >= rows) clearInterval(animationInterval);
        };

        modal.addEventListener('shown.bs.modal', () => {
            currentRow = 0; currentCol = 0;
            animationInterval = setInterval(animateMatrix, 500);
        });
        modal.addEventListener('hidden.bs.modal', () => clearInterval(animationInterval));
    }

    // ── COLAS ─────────────────────────────────────────────────────────────
    const queueCanvas = document.getElementById('queueAnimation');
    if (queueCanvas) {
        const ctx = queueCanvas.getContext('2d');
        const cellWidth = 100, cellHeight = 50, startX = 50, startY = 75, animSpeed = 10;
        let queue = [], isAnimating = false, queueInterval = null;

        const drawQueue = () => {
            ctx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
            ctx.font = '20px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            queue.forEach((el, idx) => {
                const x = startX + idx * (cellWidth + 10);
                ctx.strokeStyle = '#000'; ctx.strokeRect(x, startY, cellWidth, cellHeight);
                ctx.fillText(el, x + cellWidth / 2, startY + cellHeight / 2);
            });
        };

        const dequeueAnimation = () => {
            if (queue.length > 0 && !isAnimating) {
                isAnimating = true;
                let offset = 0;

                const animateRemoval = () => {
                    ctx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
                    ctx.font = '20px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    queue.forEach((el, idx) => {
                        const x = startX + idx * (cellWidth + 10);
                        const y = idx === 0 ? startY - offset : startY;
                        ctx.strokeStyle = '#000'; ctx.strokeRect(x, y, cellWidth, cellHeight);
                        ctx.fillText(el, x + cellWidth / 2, y + cellHeight / 2);
                    });
                    if (offset < cellHeight + 20) { offset += animSpeed; requestAnimationFrame(animateRemoval); }
                    else { queue.shift(); animateShift(); }
                };

                const animateShift = () => {
                    let shiftOffset = 0;
                    const shiftElements = () => {
                        ctx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
                        queue.forEach((el, idx) => {
                            const x = startX + idx * (cellWidth + 10) - shiftOffset;
                            ctx.strokeStyle = '#000'; ctx.strokeRect(x, startY, cellWidth, cellHeight);
                            ctx.fillText(el, x + cellWidth / 2, startY + cellHeight / 2);
                        });
                        if (shiftOffset < cellWidth + 10) { shiftOffset += animSpeed; requestAnimationFrame(shiftElements); }
                        else { isAnimating = false; drawQueue(); }
                    };
                    shiftElements();
                };

                animateRemoval();
            }
        };

        modal.addEventListener('shown.bs.modal', () => {
            queue = ['A', 'B', 'C', 'D', 'E']; isAnimating = false;
            drawQueue();
            queueInterval = setInterval(() => {
                if (queue.length > 0) dequeueAnimation();
                else clearInterval(queueInterval);
            }, 2000);
        });
        modal.addEventListener('hidden.bs.modal', () => clearInterval(queueInterval));
    }

    // ── PILAS ─────────────────────────────────────────────────────────────
    const stackCanvas = document.getElementById('stackAnimation');
    if (stackCanvas) {
        const ctx = stackCanvas.getContext('2d');
        const cellWidth = 100, cellHeight = 50, startX = 150, startY = 300, animSpeed = 10;
        let stack = [], isAnimating = false, stackInterval = null;

        const drawStack = () => {
            ctx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);
            ctx.font = '20px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            stack.forEach((el, idx) => {
                const x = startX, y = startY - idx * (cellHeight + 10);
                ctx.strokeStyle = '#000'; ctx.strokeRect(x, y, cellWidth, cellHeight);
                ctx.fillText(el, x + cellWidth / 2, y + cellHeight / 2);
            });
        };

        const popAnimation = () => {
            if (stack.length > 0 && !isAnimating) {
                isAnimating = true;
                const removed = stack.pop();
                let offset = 0;

                const animateRemoval = () => {
                    ctx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);
                    stack.forEach((el, idx) => {
                        const x = startX, y = startY - idx * (cellHeight + 10);
                        ctx.strokeStyle = '#000'; ctx.strokeRect(x, y, cellWidth, cellHeight);
                        ctx.fillText(el, x + cellWidth / 2, y + cellHeight / 2);
                    });
                    const x = startX, y = startY - stack.length * (cellHeight + 10) - offset;
                    ctx.strokeStyle = '#f00'; ctx.strokeRect(x, y, cellWidth, cellHeight);
                    ctx.fillText(removed, x + cellWidth / 2, y + cellHeight / 2);
                    if (offset < 100) { offset += animSpeed; requestAnimationFrame(animateRemoval); }
                    else { isAnimating = false; drawStack(); }
                };
                animateRemoval();
            }
        };

        modal.addEventListener('shown.bs.modal', () => {
            stack = ['A', 'B', 'C', 'D', 'E']; isAnimating = false;
            drawStack();
            stackInterval = setInterval(() => {
                if (stack.length > 0) popAnimation();
                else clearInterval(stackInterval);
            }, 2000);
        });
        modal.addEventListener('hidden.bs.modal', () => clearInterval(stackInterval));
    }

    // ── LISTAS ENLAZADAS ──────────────────────────────────────────────────
    const linkedListCanvas = document.getElementById('linkedListAnimation');
    if (linkedListCanvas) {
        const ctx = linkedListCanvas.getContext('2d');
        const nodes = ['A', 'B', 'C', 'D', 'E'];
        const nodeRadius = 30, startX = 50, startY = 100, nodeSpacing = 150;
        let currentNodeIndex = 0, animationStep = 0, traversalTimer = null;

        const drawNode = (x, y, value, highlight = false) => {
            ctx.beginPath(); ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = highlight ? '#ffcc00' : '#fff'; ctx.fill();
            ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = '#000'; ctx.font = '16px Arial';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(value, x, y);
        };

        const drawArrow = (x1, y1, x2, y2, progress = 1) => {
            const headLen = 10, angle = Math.atan2(y2 - y1, x2 - x1);
            const cx = x1 + (x2 - x1) * progress, cy = y1 + (y2 - y1) * progress;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(cx, cy);
            ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
            if (progress === 1) {
                ctx.beginPath(); ctx.moveTo(x2, y2);
                ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
                ctx.moveTo(x2, y2);
                ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
                ctx.stroke();
            }
        };

        const drawLinkedList = (progress = 1) => {
            ctx.clearRect(0, 0, linkedListCanvas.width, linkedListCanvas.height);
            nodes.forEach((node, idx) => {
                const x = startX + idx * nodeSpacing;
                drawNode(x, startY, node, idx === currentNodeIndex);
                if (idx < nodes.length - 1) {
                    drawArrow(x + nodeRadius, startY, startX + (idx + 1) * nodeSpacing - nodeRadius, startY, progress);
                }
            });
        };

        const animateTraversal = () => {
            if (currentNodeIndex < nodes.length) {
                if (animationStep <= 1) {
                    drawLinkedList(animationStep);
                    animationStep += 0.05;
                    requestAnimationFrame(animateTraversal);
                } else {
                    animationStep = 0;
                    currentNodeIndex++;
                    traversalTimer = setTimeout(animateTraversal, 500);
                }
            } else {
                currentNodeIndex = 0;
                traversalTimer = setTimeout(animateTraversal, 1000);
            }
        };

        modal.addEventListener('shown.bs.modal', () => {
            currentNodeIndex = 0; animationStep = 0;
            animateTraversal();
        });
        modal.addEventListener('hidden.bs.modal', () => clearTimeout(traversalTimer));
    }

    // ── LISTAS DOBLEMENTE ENLAZADAS ───────────────────────────────────────
    const doublyCanvas = document.getElementById('doublyLinkedListAnimation');
    if (doublyCanvas) {
        const ctx = doublyCanvas.getContext('2d');
        const nodes = ['A', 'B', 'C', 'D', 'E'];
        const nodeRadius = 30, startX = 50, startY = 150, nodeSpacing = 150;
        let currentNodeIndex = 0, direction = 1, doublyTimer = null;

        const drawNode = (x, y, value, highlight = false) => {
            ctx.beginPath(); ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = highlight ? '#ffcc00' : '#fff'; ctx.fill();
            ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = '#000'; ctx.font = '16px Arial';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(value, x, y);
        };

        const drawArrow = (x1, y1, x2, y2, highlight = false) => {
            const headLen = 10, angle = Math.atan2(y2 - y1, x2 - x1);
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
            ctx.strokeStyle = highlight ? '#ff0000' : '#000'; ctx.lineWidth = 2; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        };

        const drawDoublyLinkedList = () => {
            ctx.clearRect(0, 0, doublyCanvas.width, doublyCanvas.height);
            nodes.forEach((node, idx) => {
                const x = startX + idx * nodeSpacing;
                const isCurrent = idx === currentNodeIndex;
                drawNode(x, startY, node, isCurrent);
                if (idx < nodes.length - 1) {
                    const nx = startX + (idx + 1) * nodeSpacing;
                    drawArrow(x + nodeRadius, startY, nx - nodeRadius, startY, isCurrent && direction === 1);
                }
                if (idx > 0) {
                    const px = startX + (idx - 1) * nodeSpacing;
                    drawArrow(x - nodeRadius, startY, px + nodeRadius, startY, isCurrent && direction === -1);
                }
            });
        };

        const animateTraversal = () => {
            drawDoublyLinkedList();
            currentNodeIndex += direction;
            if (currentNodeIndex >= nodes.length || currentNodeIndex < 0) {
                direction *= -1; currentNodeIndex += direction;
            }
            doublyTimer = setTimeout(animateTraversal, 1000);
        };

        modal.addEventListener('shown.bs.modal', () => {
            currentNodeIndex = 0; direction = 1;
            animateTraversal();
        });
        modal.addEventListener('hidden.bs.modal', () => clearTimeout(doublyTimer));
    }

    // ── LISTAS CIRCULARES ─────────────────────────────────────────────────
    const circularContainer = document.getElementById('circularListAnimation');
    if (circularContainer) {
        const width = 800, height = 300, radius = 120;
        const nodeLabels = ['A', 'B', 'C', 'D', 'E'];
        let currentNodeIndex = 0, circularTimer = null;

        const svg = d3.select(circularContainer).append('svg').attr('width', width).attr('height', height);
        const angleStep = (2 * Math.PI) / nodeLabels.length;
        const positions = nodeLabels.map((_, i) => ({
            x: width / 2 + radius * Math.cos(i * angleStep),
            y: height / 2 + radius * Math.sin(i * angleStep),
        }));

        svg.selectAll('.link').data(nodeLabels).enter().append('line').attr('class', 'link')
            .attr('x1', (d, i) => positions[i].x).attr('y1', (d, i) => positions[i].y)
            .attr('x2', (d, i) => positions[(i + 1) % nodeLabels.length].x)
            .attr('y2', (d, i) => positions[(i + 1) % nodeLabels.length].y)
            .attr('stroke', '#000').attr('stroke-width', 2).attr('marker-end', 'url(#arrow)');

        svg.append('defs').append('marker').attr('id', 'arrow')
            .attr('viewBox', '0 0 10 10').attr('refX', 5).attr('refY', 5)
            .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto-start-reverse')
            .append('path').attr('d', 'M 0 0 L 10 5 L 0 10 Z').attr('fill', '#000');

        const nodeGroup = svg.selectAll('.node').data(nodeLabels).enter().append('g').attr('class', 'node')
            .attr('transform', (d, i) => `translate(${positions[i].x}, ${positions[i].y})`);
        nodeGroup.append('circle').attr('r', 30).attr('fill', '#fff').attr('stroke', '#000').attr('stroke-width', 2);
        nodeGroup.append('text').text(d => d).attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle').attr('font-size', '16px');

        const animateTraversal = () => {
            nodeGroup.select('circle').attr('fill', (d, i) => i === currentNodeIndex ? '#ffcc00' : '#fff');
            currentNodeIndex = (currentNodeIndex + 1) % nodeLabels.length;
            circularTimer = setTimeout(animateTraversal, 1000);
        };

        modal.addEventListener('shown.bs.modal', () => { currentNodeIndex = 0; animateTraversal(); });
        modal.addEventListener('hidden.bs.modal', () => clearTimeout(circularTimer));
    }

    // ── ÁRBOLES ───────────────────────────────────────────────────────────
    const treeContainer = document.getElementById('treeAnimation');
    if (treeContainer) {
        const treeData = {
            name: 'A',
            children: [
                { name: 'B', children: [{ name: 'D' }, { name: 'E' }] },
                { name: 'C', children: [{ name: 'F' }, { name: 'G' }] },
            ],
        };
        const width = 1200, height = 560;

        const svgRoot = d3.select(treeContainer).append('svg').attr('width', width).attr('height', height);

        // Etiqueta del recorrido actual (se muestra arriba del árbol)
        const treeLabel = svgRoot.append('text')
            .attr('x', width / 2).attr('y', 30)
            .attr('text-anchor', 'middle').attr('font-size', '20px').attr('font-weight', 'bold');

        const svg = svgRoot.append('g').attr('transform', 'translate(50, 70)');

        const treeLayout = d3.tree().size([width - 100, height - 120]);
        const root = d3.hierarchy(treeData);
        treeLayout(root);

        svg.selectAll('.link').data(root.links()).enter().append('line').attr('class', 'link')
            .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
            .attr('stroke', '#000').attr('stroke-width', 2);

        const treeNodes = svg.selectAll('.node').data(root.descendants()).enter().append('g')
            .attr('class', 'node').attr('transform', d => `translate(${d.x}, ${d.y})`);
        treeNodes.append('circle').attr('r', 40).attr('fill', '#fff').attr('stroke', '#000').attr('stroke-width', 2);
        treeNodes.append('text').text(d => d.data.name).attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle').attr('font-size', '20px');

        // ── Algoritmos de recorrido ───────────────────────────────────────
        const preOrder = (node, cb) => {
            if (!node) return;
            cb(node);
            if (node.children) node.children.forEach(c => preOrder(c, cb));
        };
        const inOrder = (node, cb) => {
            if (!node) return;
            const [left, right] = node.children || [null, null];
            inOrder(left, cb);
            cb(node);
            inOrder(right, cb);
        };
        const postOrder = (node, cb) => {
            if (!node) return;
            if (node.children) node.children.forEach(c => postOrder(c, cb));
            cb(node);
        };

        const treeTraversals = [
            { label: 'Preorden — Raíz → Izquierda → Derecha',   fn: preOrder,  color: '#e67e00' },
            { label: 'Inorden — Izquierda → Raíz → Derecha',    fn: inOrder,   color: '#0d6efd' },
            { label: 'Postorden — Izquierda → Derecha → Raíz',  fn: postOrder, color: '#198754' },
        ];

        let treeAnimationTimer = null;

        const runTreeTraversal = (idx) => {
            const { label, fn, color } = treeTraversals[idx];
            const order = [];
            fn(root, n => order.push(n));

            // Actualizar etiqueta y restablecer colores
            treeLabel.text(label).attr('fill', color);
            treeNodes.select('circle').attr('fill', '#fff');

            let index = 0;
            const step = () => {
                if (index < order.length) {
                    treeNodes.select('circle').attr('fill', d => d === order[index] ? color : '#fff');
                    index++;
                    treeAnimationTimer = setTimeout(step, 900);
                } else {
                    // Pausa antes del siguiente recorrido
                    treeAnimationTimer = setTimeout(() => runTreeTraversal((idx + 1) % treeTraversals.length), 1800);
                }
            };
            step();
        };

        modal.addEventListener('shown.bs.modal', () => runTreeTraversal(0));
        modal.addEventListener('hidden.bs.modal', () => clearTimeout(treeAnimationTimer));
    }

    // ── GRAFOS ────────────────────────────────────────────────────────────
    const graphContainer = document.getElementById('graphAnimation');
    if (graphContainer) {
        const width = 800, height = 600;
        const graphNodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }, { id: 'F' }, { id: 'G' }];
        const graphLinks = [
            { source: 'A', target: 'B' }, { source: 'A', target: 'C' },
            { source: 'B', target: 'D' }, { source: 'B', target: 'E' },
            { source: 'C', target: 'F' }, { source: 'C', target: 'G' },
        ];

        const svg = d3.select(graphContainer).append('svg').attr('width', width).attr('height', height);

        // Etiqueta del recorrido actual
        const graphLabel = svg.append('text')
            .attr('x', width / 2).attr('y', 28)
            .attr('text-anchor', 'middle').attr('font-size', '18px').attr('font-weight', 'bold');

        const simulation = d3.forceSimulation(graphNodes)
            .force('link', d3.forceLink(graphLinks).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.selectAll('.link').data(graphLinks).enter().append('line')
            .attr('class', 'link').attr('stroke', '#000').attr('stroke-width', 2);

        const node = svg.selectAll('.node').data(graphNodes).enter().append('g').attr('class', 'node')
            .call(d3.drag()
                .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
                .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
                .on('end',   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

        node.append('circle').attr('r', 20).attr('fill', '#ffcc00').attr('stroke', '#000').attr('stroke-width', 2);
        node.append('text').text(d => d.id).attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle').attr('font-size', '12px');

        simulation.on('tick', () => {
            link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            node.attr('transform', d => `translate(${d.x}, ${d.y})`);
        });

        // Función auxiliar: vecinos de un nodo (grafo no dirigido)
        const getNeighbors = id => {
            const ns = [];
            graphLinks.forEach(l => {
                if (l.source.id === id) ns.push(l.target.id);
                else if (l.target.id === id) ns.push(l.source.id);
            });
            return ns;
        };

        // BFS — recorre nivel por nivel usando una cola
        const bfsOrder = startId => {
            const visited = new Set(), queue = [startId], order = [];
            while (queue.length > 0) {
                const cur = queue.shift();
                if (!visited.has(cur)) {
                    visited.add(cur); order.push(cur);
                    getNeighbors(cur).forEach(n => { if (!visited.has(n)) queue.push(n); });
                }
            }
            return order;
        };

        // DFS — recorre en profundidad usando recursión
        const dfsOrder = startId => {
            const visited = new Set(), order = [];
            const dfs = id => {
                if (visited.has(id)) return;
                visited.add(id); order.push(id);
                getNeighbors(id).forEach(n => dfs(n));
            };
            dfs(startId);
            return order;
        };

        const graphTraversals = [
            { label: 'BFS — Búsqueda en Anchura (nivel por nivel)', fn: bfsOrder, color: '#0d6efd' },
            { label: 'DFS — Búsqueda en Profundidad (recursiva)',   fn: dfsOrder, color: '#198754' },
        ];

        let graphAnimationTimer = null;

        const runGraphTraversal = idx => {
            const { label, fn, color } = graphTraversals[idx];
            const order = fn('A');

            graphLabel.text(label).attr('fill', color);
            node.select('circle').attr('fill', '#ffcc00');

            let index = 0;
            const step = () => {
                if (index < order.length) {
                    node.select('circle').attr('fill', d => d.id === order[index] ? color : '#ffcc00');
                    index++;
                    graphAnimationTimer = setTimeout(step, 900);
                } else {
                    // Pausa y luego muestra el siguiente recorrido
                    graphAnimationTimer = setTimeout(() => runGraphTraversal((idx + 1) % graphTraversals.length), 1800);
                }
            };
            step();
        };

        modal.addEventListener('shown.bs.modal', () => {
            simulation.alpha(1).restart();
            graphAnimationTimer = setTimeout(() => runGraphTraversal(0), 2000);
        });
        modal.addEventListener('hidden.bs.modal', () => clearTimeout(graphAnimationTimer));
    }

    // ── TABLAS HASH ───────────────────────────────────────────────────────
    const hashContainer = document.getElementById('hashTableAnimation');
    if (hashContainer) {
        const width = 800, height = 400;
        const svg = d3.select(hashContainer).append('svg').attr('width', width).attr('height', height);
        let hashTable = new Array(10).fill(null);

        const hashFn = key => key.charCodeAt(0) % 10;

        const drawHashTable = () => {
            svg.selectAll('*').remove();
            hashTable.forEach((value, idx) => {
                svg.append('rect').attr('x', 50).attr('y', idx * 35 + 10)
                    .attr('width', 200).attr('height', 30)
                    .attr('fill', '#f0f0f0').attr('stroke', '#000');
                svg.append('text').attr('x', 60).attr('y', idx * 35 + 30)
                    .text(`Índice ${idx}: ${value || ''}`).attr('font-size', '14px');
            });
        };

        const insert = (key, value) => {
            hashTable[hashFn(key)] = value;
            drawHashTable();
        };

        modal.addEventListener('shown.bs.modal', () => {
            hashTable = new Array(10).fill(null);
            insert('A', 'Valor A'); insert('B', 'Valor B'); insert('C', 'Valor C');
        });
    }

    // ── RECURSIVIDAD ──────────────────────────────────────────────────────
    const recursionContainer = document.getElementById('recursionAnimation');
    if (recursionContainer) {
        const drawRecursiveAnimation = () => {
            const svgWidth = recursionContainer.offsetWidth;
            const svgHeight = 700;
            const boxWidth = 200;
            const boxHeight = 50;
            const verticalSpacing = 80;
            const animationDuration = 1000;
            const initialX = (svgWidth - boxWidth) / 2;

            d3.select('#recursionAnimation').html('');

            const svg = d3.select('#recursionAnimation')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            const calls = [
                { level: 0, call: 'factorial(4)', returnText: 'Retorna: 4 * 6 = 24' },
                { level: 1, call: 'factorial(3)', returnText: 'Retorna: 3 * 2 = 6' },
                { level: 2, call: 'factorial(2)', returnText: 'Retorna: 2 * 1 = 2' },
                { level: 3, call: 'factorial(1)', returnText: 'Retorna: 1 * 1 = 1' },
                { level: 4, call: 'factorial(0)', returnText: 'Caso base: retorna 1' }
            ];

            svg.append('text')
                .attr('x', svgWidth / 2).attr('y', 40)
                .attr('text-anchor', 'middle')
                .attr('font-size', '24px').attr('font-weight', 'bold')
                .text('Recursividad: Factorial(4)');

            const stackGroup = svg.append('g');

            calls.forEach((step, index) => {
                const y = 100 + index * verticalSpacing;
                const box = stackGroup.append('rect')
                    .attr('x', initialX).attr('y', -boxHeight)
                    .attr('width', boxWidth).attr('height', boxHeight)
                    .attr('rx', 10).attr('ry', 10).attr('fill', '#0d6efd');
                const label = stackGroup.append('text')
                    .attr('x', initialX + boxWidth / 2).attr('y', -boxHeight / 2)
                    .attr('text-anchor', 'middle').attr('fill', 'white')
                    .attr('font-size', '16px').text(step.call);
                box.transition().delay(index * animationDuration).duration(500).attr('y', y);
                label.transition().delay(index * animationDuration).duration(500).attr('y', y + boxHeight / 2);
            });

            calls.slice().reverse().forEach((step, i) => {
                const index = calls.length - 1 - i;
                const y = 100 + index * verticalSpacing;
                const delayBase = (calls.length + i) * animationDuration;
                const returnText = stackGroup.append('text')
                    .attr('x', initialX + boxWidth / 2).attr('y', y + boxHeight / 2)
                    .attr('text-anchor', 'middle').attr('fill', '#198754')
                    .attr('font-size', '16px').attr('opacity', 0).text(step.returnText);
                returnText.transition().delay(delayBase).duration(500).attr('opacity', 1);
                stackGroup.selectAll('rect').filter((d, j) => j === index)
                    .transition().delay(delayBase + 500).duration(500).attr('y', svgHeight + boxHeight);
                stackGroup.selectAll('text').filter((d, j) => j === index)
                    .transition().delay(delayBase + 500).duration(500).attr('y', svgHeight + boxHeight);
            });
        };

        modal.addEventListener('shown.bs.modal', drawRecursiveAnimation);
    }
});
