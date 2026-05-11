// Animaciones D3 para los algoritmos de ordenamiento (metodos-ordenamiento/)
const _tc = (light, dark) => document.documentElement.getAttribute('data-theme') === 'dark' ? dark : light;
let _animGen = 0;
document.addEventListener('DOMContentLoaded', () => {

    // ── Bubble, Insertion, Selection, Merge, Quick, Heap, Counting ──
    // Todos usan #animationModal; se detecta el contenedor activo.
    const animationModal = document.getElementById('animationModal');
    if (animationModal) {
        animationModal.addEventListener('shown.bs.modal', () => {
            const targets = [
                { id: 'bubbleSortAnimation',    fn: animateBubbleSort },
                { id: 'insertionSortAnimation', fn: animateInsertionSort },
                { id: 'selectionSortAnimation', fn: animateSelectionSort },
                { id: 'mergeSortAnimation',     fn: animateMergeSort },
                { id: 'quickSortAnimation',     fn: animateQuickSort },
                { id: 'heapSortAnimation',      fn: animateHeapSort },
                { id: 'countingSortAnimation',  fn: animateCountingSort },
            ];
            for (const { id, fn } of targets) {
                if (document.getElementById(id)) {
                    _animGen++;
                    d3.select(`#${id}`).selectAll('*').remove();
                    fn();
                    break;
                }
            }
        });
        // Cancelar animaciones al cerrar: incrementar _animGen e interrumpir transiciones D3
        animationModal.addEventListener('hide.bs.modal', () => {
            _animGen++;
            d3.select(animationModal).selectAll('*').interrupt();
        });
    }

    // ── Shell Sort (modal propio: #shellSortModal) ──
    const shellSortModal = document.getElementById('shellSortModal');
    if (shellSortModal) {
        shellSortModal.addEventListener('shown.bs.modal', () => {
            _animGen++;
            d3.select('#shellSortAnimation').selectAll('*').remove();
            animateShellSort();
        });
        shellSortModal.addEventListener('hide.bs.modal', () => {
            _animGen++;
            d3.select('#shellSortAnimation').selectAll('*').interrupt();
        });
    }

    // ── Radix Sort (modal propio: #radixSortModal) ──
    const radixSortModal = document.getElementById('radixSortModal');
    if (radixSortModal) {
        radixSortModal.addEventListener('shown.bs.modal', () => {
            _animGen++;
            d3.select('#radixSortAnimation').selectAll('*').remove();
            animateRadixSort();
        });
        radixSortModal.addEventListener('hide.bs.modal', () => {
            _animGen++;
            d3.select('#radixSortAnimation').selectAll('*').interrupt();
        });
    }
});

// ─────────────────────────────────────────────
//  BUBBLE SORT
// ─────────────────────────────────────────────
function animateBubbleSort() {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    const svg = d3.select('#bubbleSortAnimation')
        .append('svg')
        .attr('width', '100%')
        .attr('viewBox', `0 0 800 ${height + 50}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * barWidth)
        .attr('y', d => height - d * 4)
        .attr('width', barWidth - 5)
        .attr('height', d => d * 4)
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - d * 4 - 10)
        .text(d => d)
        .attr('fill', 'black')
        .attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', height + 30)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Bubble Sort...');

    let i = 0, j = 0;

    async function step() {
        if (i < data.length) {
            if (j < data.length - i - 1) {
                bars.attr('fill', (d, idx) => (idx === j || idx === j + 1) ? 'orange' : 'steelblue');
                explanation.text(`Comparando: ${data[j]} y ${data[j + 1]}`);
                await delay(2000);

                if (data[j] > data[j + 1]) {
                    explanation.text(`Intercambiando: ${data[j]} y ${data[j + 1]}`);
                    [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    updateBars(bars, labels, data, barWidth, height);
                    await delay(2000);
                }
                j++;
                step();
            } else {
                bars.attr('fill', (d, idx) => idx >= data.length - i - 1 ? 'green' : 'steelblue');
                j = 0;
                i++;
                await delay(2000);
                step();
            }
        } else {
            explanation.text('Bubble Sort completado.');
            bars.attr('fill', 'green');
        }
    }

    step();
}

// ─────────────────────────────────────────────
//  INSERTION SORT
// ─────────────────────────────────────────────
function animateInsertionSort() {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    const svg = d3.select('#insertionSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${height + 50}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * barWidth).attr('y', d => height - d * 4)
        .attr('width', barWidth - 5).attr('height', d => d * 4)
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - d * 4 - 10)
        .text(d => d).attr('fill', 'black').attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', height + 30)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Insertion Sort...');

    let i = 1;

    async function step() {
        if (i < data.length) {
            let key = data[i];
            let j = i - 1;
            explanation.text(`Seleccionando el elemento: ${key}`);
            bars.attr('fill', (d, idx) => idx === i ? 'orange' : 'steelblue');
            await delay(2000);

            async function innerStep() {
                if (j >= 0 && data[j] > key) {
                    explanation.text(`Comparando ${key} con ${data[j]}: Desplazando ${data[j]} a la derecha`);
                    bars.attr('fill', (d, idx) => idx === j ? 'red' : idx === i ? 'orange' : 'steelblue');
                    data[j + 1] = data[j];
                    updateBars(bars, labels, data, barWidth, height);
                    await delay(2000);
                    j--;
                    innerStep();
                } else {
                    explanation.text(`Insertando ${key} en su posición correcta`);
                    data[j + 1] = key;
                    updateBars(bars, labels, data, barWidth, height);
                    await delay(2000);
                    i++;
                    step();
                }
            }
            innerStep();
        } else {
            explanation.text('Insertion Sort completado.');
            bars.attr('fill', 'green');
        }
    }

    step();
}

// ─────────────────────────────────────────────
//  SELECTION SORT
// ─────────────────────────────────────────────
function animateSelectionSort() {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    const svg = d3.select('#selectionSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${height + 50}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * barWidth).attr('y', d => height - d * 4)
        .attr('width', barWidth - 5).attr('height', d => d * 4)
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - d * 4 - 10)
        .text(d => d).attr('fill', 'black').attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', height + 30)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Selection Sort...');

    let i = 0;

    async function step() {
        if (i < data.length - 1) {
            let minIndex = i;
            explanation.text(`Buscando el elemento más pequeño desde la posición ${i}...`);
            bars.attr('fill', (d, idx) => idx === i ? 'orange' : 'steelblue');
            await delay(2000);

            for (let j = i + 1; j < data.length; j++) {
                bars.attr('fill', (d, idx) => idx === j ? 'yellow' : idx === minIndex ? 'red' : 'steelblue');
                explanation.text(`Comparando: ${data[j]} con el mínimo actual (${data[minIndex]})`);
                await delay(2000);

                if (data[j] < data[minIndex]) {
                    minIndex = j;
                    explanation.text(`Nuevo mínimo encontrado: ${data[minIndex]} en la posición ${minIndex}`);
                    bars.attr('fill', (d, idx) => idx === minIndex ? 'red' : idx === j ? 'yellow' : 'steelblue');
                    await delay(2000);
                }
            }

            explanation.text(`Intercambiando: ${data[i]} con ${data[minIndex]}`);
            [data[i], data[minIndex]] = [data[minIndex], data[i]];
            updateBars(bars, labels, data, barWidth, height);
            await delay(2000);
            i++;
            step();
        } else {
            explanation.text('Selection Sort completado.');
            bars.attr('fill', 'green');
        }
    }

    step();
}

// ─────────────────────────────────────────────
//  MERGE SORT
// ─────────────────────────────────────────────
function animateMergeSort() {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    const svg = d3.select('#mergeSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${height + 50}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * barWidth).attr('y', d => height - d * 4)
        .attr('width', barWidth - 5).attr('height', d => d * 4)
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - d * 4 - 10)
        .text(d => d).attr('fill', 'black').attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', height + 30)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Merge Sort...');

    function refreshBars(arr) {
        bars.data(arr).transition().duration(window.getAnimDelay(1000))
            .attr('x', (d, idx) => idx * barWidth)
            .attr('y', d => height - d * 4)
            .attr('height', d => d * 4);
        labels.data(arr).transition().duration(window.getAnimDelay(1000))
            .attr('x', (d, idx) => idx * barWidth + barWidth / 2 - 10)
            .attr('y', d => height - d * 4 - 10)
            .text(d => d);
    }

    async function mergeSort(arr, left, right) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        explanation.text(`Dividiendo: [${arr.slice(left, mid + 1)}] y [${arr.slice(mid + 1, right + 1)}]`);
        await delay(2000);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }

    async function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;
        explanation.text(`Combinando: [${leftArr}] y [${rightArr}]`);

        while (i < leftArr.length && j < rightArr.length) {
            arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
            refreshBars(arr);
            await delay(1000);
        }
        while (i < leftArr.length) { arr[k++] = leftArr[i++]; refreshBars(arr); await delay(1000); }
        while (j < rightArr.length) { arr[k++] = rightArr[j++]; refreshBars(arr); await delay(1000); }
        explanation.text(`Combinación completada: [${arr.slice(left, right + 1)}]`);
        await delay(2000);
    }

    mergeSort(data, 0, data.length - 1).then(() => {
        explanation.text('Merge Sort completado.');
        bars.attr('fill', 'green');
    });
}

// ─────────────────────────────────────────────
//  QUICK SORT
// ─────────────────────────────────────────────
function animateQuickSort() {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;

    const svg = d3.select('#quickSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${height + 50}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * barWidth).attr('y', d => height - d * 4)
        .attr('width', barWidth - 5).attr('height', d => d * 4)
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - d * 4 - 10)
        .text(d => d).attr('fill', 'black').attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', 30)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Quick Sort...');

    function refreshBars(arr) {
        bars.data(arr).transition().duration(window.getAnimDelay(1500))
            .attr('x', (d, idx) => idx * barWidth)
            .attr('y', d => height - d * 4)
            .attr('height', d => d * 4);
        labels.data(arr).transition().duration(window.getAnimDelay(1500))
            .attr('x', (d, idx) => idx * barWidth + barWidth / 2 - 10)
            .attr('y', d => height - d * 4 - 10)
            .text(d => d);
    }

    async function quickSort(arr, left, right) {
        if (left >= right) return;
        const pivotIndex = right;
        const pivotValue = arr[pivotIndex];
        explanation.text(`Seleccionando pivote: ${pivotValue}`);
        bars.attr('fill', (d, idx) => idx === pivotIndex ? 'orange' : 'steelblue');
        await delay(2000);

        let partitionIndex = left;
        for (let i = left; i < right; i++) {
            bars.attr('fill', (d, idx) =>
                idx === pivotIndex ? 'orange' : idx === i ? 'yellow' : idx === partitionIndex ? 'red' : 'steelblue');
            explanation.text(`Comparando: ${arr[i]} con el pivote (${pivotValue})`);
            await delay(2000);

            if (arr[i] < pivotValue) {
                explanation.text(`Intercambiando: ${arr[i]} con ${arr[partitionIndex]}`);
                [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
                partitionIndex++;
                refreshBars(arr);
                await delay(2000);
            }
        }

        explanation.text(`Colocando el pivote (${pivotValue}) en su posición final`);
        [arr[partitionIndex], arr[pivotIndex]] = [arr[pivotIndex], arr[partitionIndex]];
        refreshBars(arr);
        await delay(2000);

        bars.attr('fill', (d, idx) =>
            idx < partitionIndex ? 'green' : idx === partitionIndex ? 'orange' : 'steelblue');

        await quickSort(arr, left, partitionIndex - 1);
        await quickSort(arr, partitionIndex + 1, right);
    }

    quickSort(data, 0, data.length - 1).then(() => {
        explanation.text('Quick Sort completado.');
        bars.attr('fill', 'green');
    });
}

// ─────────────────────────────────────────────
//  HEAP SORT
// ─────────────────────────────────────────────
function animateHeapSort() {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const width  = 800;
    const height = 500;

    // svgRoot = el elemento <svg>; svg = el <g> interno desplazado 50px hacia abajo para el árbol
    const svgRoot = d3.select('#heapSortAnimation')
        .append('svg')
        .attr('width', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    const svg = svgRoot.append('g').attr('transform', 'translate(0, 50)');

    function buildBinaryTree(arr) {
        const nodes = arr.map(value => ({ value }));
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].left  = nodes[2 * i + 1] || null;
            nodes[i].right = nodes[2 * i + 2] || null;
        }
        return nodes[0];
    }

    const treeLayout = d3.tree().size([700, 340]);
    const root = d3.hierarchy(buildBinaryTree(data), d => [d.left, d.right].filter(n => n));
    treeLayout(root);

    const links = svg.selectAll('.link')
        .data(root.links()).enter().append('line').attr('class', 'link')
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
        .attr('stroke', '#000').attr('stroke-width', 1.5);

    const nodes = svg.selectAll('.node')
        .data(root.descendants()).enter().append('g').attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodes.append('circle').attr('r', 15).attr('fill', '#fff')
        .attr('stroke', '#000').attr('stroke-width', 1.5);
    nodes.append('text').text(d => d.data.value)
        .attr('text-anchor', 'middle').attr('alignment-baseline', 'middle')
        .attr('font-size', '12px');

    // La explicación se agrega al SVG raíz (no al <g>) para que no quede fuera del viewBox
    const explanation = svgRoot.append('text')
        .attr('x', width / 2).attr('y', height - 15)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '14px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Heap Sort...');

    function updateTree(arr) {
        const newRoot = d3.hierarchy(buildBinaryTree(arr), d => [d.left, d.right].filter(n => n));
        treeLayout(newRoot);
        links.data(newRoot.links()).transition().duration(window.getAnimDelay(1500))
            .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        nodes.data(newRoot.descendants()).transition().duration(window.getAnimDelay(1500))
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .select('text').text(d => d.data.value);
    }

    function highlightNode(index, color) {
        // style() (inline) wins over CSS property so dark-mode default fill doesn't mask highlights
        nodes.select('circle').style('fill', (d, i) => i === index ? color : null);
    }

    function highlightAllNodes(color) {
        nodes.select('circle').style('fill', color);
    }

    async function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        highlightNode(i, 'orange');
        explanation.text(`Procesando nodo ${arr[i]} en el índice ${i}`);
        await delay(2000);
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest !== i) {
            explanation.text(`Intercambiando ${arr[i]} con ${arr[largest]}`);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            updateTree(arr);
            await delay(2000);
            await heapify(arr, n, largest);
        }
    }

    async function heapSort(arr) {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            explanation.text(`Construyendo max-heap desde el índice ${i}`);
            await heapify(arr, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            explanation.text(`Intercambiando ${arr[0]} con ${arr[i]} y reduciendo el heap`);
            [arr[0], arr[i]] = [arr[i], arr[0]];
            updateTree(arr);
            await delay(2000);
            await heapify(arr, i, 0);
        }
        explanation.text('Heap Sort completado.');
        highlightAllNodes('green');
    }

    heapSort(data);
}

// ─────────────────────────────────────────────
//  COUNTING SORT
// ─────────────────────────────────────────────
function animateCountingSort() {
    const data = [4, 2, 2, 8, 3, 3, 1];
    const width = 800;
    const mainHeight = 220;       // zona de barras principales
    const countHeight = 140;      // zona del arreglo de conteo
    const totalHeight = mainHeight + countHeight + 80;
    const barWidth = width / data.length;
    const maxHeight = Math.max(...data);

    const svg = d3.select('#countingSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${totalHeight}`);

    // ── Barras principales ──────────────────────────────────────────────
    const bars = svg.selectAll('rect.main-bar')
        .data(data).enter().append('rect').attr('class', 'main-bar')
        .attr('x', (d, i) => i * barWidth)
        .attr('y', d => mainHeight - (d / maxHeight) * (mainHeight - 50))
        .attr('width', barWidth - 5)
        .attr('height', d => (d / maxHeight) * (mainHeight - 50))
        .attr('fill', 'steelblue');

    const barLabels = svg.selectAll('text.main-label')
        .data(data).enter().append('text').attr('class', 'main-label')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => mainHeight - (d / maxHeight) * (mainHeight - 50) - 5)
        .text(d => d).attr('fill', 'black').attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', 22)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '15px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Counting Sort...');

    // ── Título y zona del arreglo de conteo ────────────────────────────
    svg.append('text')
        .attr('x', 5).attr('y', mainHeight + 22)
        .attr('font-size', '13px').attr('font-weight', 'bold').attr('fill', '#555')
        .text('Arreglo de conteo (frecuencias):');

    const maxVal = Math.max(...data);
    const cw = Math.min(60, width / (maxVal + 1));
    const countCells = svg.selectAll('rect.count-cell')
        .data(d3.range(maxVal + 1)).enter().append('rect').attr('class', 'count-cell')
        .attr('x', (d, i) => i * cw + 5)
        .attr('y', mainHeight + 30)
        .attr('width', cw - 3).attr('height', 34)
        .attr('fill', '#e9ecef').attr('stroke', '#999');

    // apply theme colors on creation
    countCells.style('fill', _tc('#e9ecef', '#2d333b')).style('stroke', _tc('#999', '#768390'));

    svg.selectAll('text.count-idx')
        .data(d3.range(maxVal + 1)).enter().append('text').attr('class', 'count-idx')
        .attr('x', (d, i) => i * cw + 5 + (cw - 3) / 2)
        .attr('y', mainHeight + 30 + 48)
        .attr('text-anchor', 'middle').attr('font-size', '11px').attr('fill', '#888')
        .text(d => `[${d}]`);

    const countLabels = svg.selectAll('text.count-val')
        .data(d3.range(maxVal + 1)).enter().append('text').attr('class', 'count-val')
        .attr('x', (d, i) => i * cw + 5 + (cw - 3) / 2)
        .attr('y', mainHeight + 30 + 22)
        .attr('text-anchor', 'middle').attr('font-size', '13px').attr('font-weight', 'bold')
        .attr('fill', '#333').text('0');

    const countArr = new Array(maxVal + 1).fill(0);

    const refreshCountDisplay = (highlightIdx = -1) => {
        countCells
            .style('fill',   (d, i) => i === highlightIdx ? '#ffc107' : _tc('#e9ecef', '#2d333b'))
            .style('stroke', (d, i) => i === highlightIdx ? '#e67e00' : _tc('#999', '#768390'));
        countLabels.text((d, i) => countArr[i]);
    };

    function refreshBars(arr) {
        bars.data(arr).transition().duration(window.getAnimDelay(800))
            .attr('x', (d, idx) => idx * barWidth)
            .attr('y', d => mainHeight - (d / maxHeight) * (mainHeight - 50))
            .attr('height', d => (d / maxHeight) * (mainHeight - 50));
        barLabels.data(arr).transition().duration(window.getAnimDelay(800))
            .attr('x', (d, idx) => idx * barWidth + barWidth / 2 - 10)
            .attr('y', d => mainHeight - (d / maxHeight) * (mainHeight - 50) - 5)
            .text(d => d);
    }

    async function countingSort(arr) {
        // Paso 1: Contar frecuencias
        explanation.text('Paso 1: Contando la frecuencia de cada elemento...');
        for (let idx = 0; idx < arr.length; idx++) {
            countArr[arr[idx]]++;
            bars.filter((d, i) => i === idx).attr('fill', 'orange');
            refreshCountDisplay(arr[idx]);
            await delay(900);
            bars.filter((d, i) => i === idx).attr('fill', 'steelblue');
        }
        refreshCountDisplay(-1);

        // Paso 2: Suma acumulativa
        explanation.text('Paso 2: Calculando suma acumulativa en el arreglo de conteo...');
        for (let i = 1; i <= maxVal; i++) {
            countArr[i] += countArr[i - 1];
            refreshCountDisplay(i);
            await delay(700);
        }
        refreshCountDisplay(-1);

        // Paso 3: Construir y copiar salida ordenada
        explanation.text('Paso 3: Construyendo el arreglo ordenado...');
        const output = new Array(arr.length).fill(0);
        for (let i = arr.length - 1; i >= 0; i--) {
            const val = arr[i];
            output[countArr[val] - 1] = val;
            countArr[val]--;
        }
        for (let k = 0; k < arr.length; k++) {
            arr[k] = output[k];
            refreshBars(arr);
            await delay(800);
        }

        explanation.text('Counting Sort completado.');
        bars.attr('fill', 'green');
    }

    countingSort(data);
}

// ─────────────────────────────────────────────
//  RADIX SORT
// ─────────────────────────────────────────────
function animateRadixSort() {
    const data = [170, 45, 75, 90, 802, 24, 2, 66];
    const width = 800;
    const height = 400;
    const barWidth = width / data.length;
    const maxHeight = Math.max(...data);

    const svg = d3.select('#radixSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${height + 200}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * barWidth)
        .attr('y', d => height - (d / maxHeight) * (height - 50))
        .attr('width', barWidth - 5)
        .attr('height', d => (d / maxHeight) * (height - 50))
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - (d / maxHeight) * (height - 50) - 10)
        .text(d => d).attr('fill', 'black').attr('font-size', '14px');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', 30)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Radix Sort...');

    function refreshBars(arr) {
        bars.data(arr).transition().duration(window.getAnimDelay(1000))
            .attr('x', (d, idx) => idx * barWidth)
            .attr('y', d => height - (d / maxHeight) * (height - 50))
            .attr('height', d => (d / maxHeight) * (height - 50));
        labels.data(arr).transition().duration(window.getAnimDelay(1000))
            .attr('x', (d, idx) => idx * barWidth + barWidth / 2 - 10)
            .attr('y', d => height - (d / maxHeight) * (height - 50) - 10)
            .text(d => d);
    }

    async function countingSortByDigit(arr, exp) {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);

        arr.forEach(num => { count[Math.floor(num / exp) % 10]++; });
        for (let i = 1; i < 10; i++) count[i] += count[i - 1];

        // Fase 1: construir output (variable k evita shadowing de la iteración exterior)
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        // Fase 2: copiar output → arr y actualizar visualmente
        for (let k = 0; k < arr.length; k++) {
            arr[k] = output[k];
            refreshBars(arr);
            await delay(1000);
        }
    }

    async function radixSort(arr) {
        const max = Math.max(...arr);
        let exp = 1;
        while (Math.floor(max / exp) > 0) {
            explanation.text(`Ordenando por el dígito en la posición ${exp}...`);
            await countingSortByDigit(arr, exp);
            exp *= 10;
        }
        explanation.text('Radix Sort completado.');
        bars.attr('fill', 'green');
    }

    radixSort(data);
}

// ─────────────────────────────────────────────
//  SHELL SORT
// ─────────────────────────────────────────────
function animateShellSort() {
    const data = [35, 33, 42, 10, 14, 19, 27, 44];
    const width = 800;
    const height = 400;
    const barSpacing = 10;
    const barWidth = (width - (data.length - 1) * barSpacing) / data.length;
    const maxHeight = Math.max(...data);
    const scaleFactor = 0.9;

    const svg = d3.select('#shellSortAnimation')
        .append('svg').attr('width', '100%').attr('viewBox', `0 0 800 ${height + 100}`);

    const bars = svg.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x', (d, i) => i * (barWidth + barSpacing))
        .attr('y', d => height - (d / maxHeight) * height * scaleFactor)
        .attr('width', barWidth)
        .attr('height', d => (d / maxHeight) * height * scaleFactor)
        .attr('fill', 'steelblue');

    const labels = svg.selectAll('text')
        .data(data).enter().append('text')
        .attr('x', (d, i) => i * (barWidth + barSpacing) + barWidth / 2)
        .attr('y', d => height - (d / maxHeight) * height * scaleFactor - 5)
        .text(d => d).attr('fill', 'black').attr('font-size', '12px')
        .attr('text-anchor', 'middle');

    const explanation = svg.append('text')
        .attr('x', width / 2).attr('y', height + 50)
        .attr('text-anchor', 'middle').attr('fill', 'black').attr('font-size', '16px')
        .attr('class', 'anim-explanation')
        .text('Iniciando Shell Sort...');

    function refreshBars(arr) {
        bars.data(arr).transition().duration(window.getAnimDelay(1500))
            .attr('x', (d, i) => i * (barWidth + barSpacing))
            .attr('y', d => height - (d / maxHeight) * height * scaleFactor)
            .attr('height', d => (d / maxHeight) * height * scaleFactor);
        labels.data(arr).transition().duration(window.getAnimDelay(1500))
            .attr('x', (d, i) => i * (barWidth + barSpacing) + barWidth / 2)
            .attr('y', d => height - (d / maxHeight) * height * scaleFactor - 5)
            .text(d => d);
    }

    function highlightShellBar(index, color) {
        bars.filter((d, idx) => idx === index)
            .transition().duration(window.getAnimDelay(1500)).attr('fill', color)
            .transition().duration(window.getAnimDelay(1500)).attr('fill', 'steelblue');
    }

    async function shellSort(arr) {
        let gap = Math.floor(arr.length / 2);
        while (gap > 0) {
            explanation.text(`Usando intervalo (gap): ${gap}`);
            for (let i = gap; i < arr.length; i++) {
                let temp = arr[i];
                let j = i;
                highlightShellBar(j, 'orange');
                while (j >= gap && arr[j - gap] > temp) {
                    explanation.text(`Comparando: ${arr[j - gap]} y ${temp}`);
                    arr[j] = arr[j - gap];
                    refreshBars(arr);
                    j -= gap;
                    await delay(1500);
                }
                arr[j] = temp;
                refreshBars(arr);
                await delay(1500);
            }
            gap = Math.floor(gap / 2);
        }
        explanation.text('Shell Sort completado.');
        bars.attr('fill', 'green');
    }

    shellSort(data);
}

// ─────────────────────────────────────────────
//  Utilidad compartida
function delay(ms) {
    const gen = _animGen;
    const badge = document.querySelector('.anim-step-badge');
    if (badge) {
        const cur = parseInt(badge.dataset.step || '0');
        badge.dataset.step = cur + 1;
        badge.textContent  = `Paso ${cur + 1}`;
    }
    return new Promise(resolve =>
        setTimeout(resolve, gen === _animGen ? Math.round(ms / (window.animSpeed || 1.75)) : 0)
    );
}

function updateBars(bars, labels, data, barWidth, height) {
    bars.data(data).transition().duration(window.getAnimDelay(1500))
        .attr('x', (d, idx) => idx * barWidth)
        .attr('y', d => height - d * 4)
        .attr('height', d => d * 4);
    labels.data(data).transition().duration(window.getAnimDelay(1500))
        .attr('x', (d, idx) => idx * barWidth + barWidth / 2 - 10)
        .attr('y', d => height - d * 4 - 10)
        .text(d => d);
}
