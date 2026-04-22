// Las tareas se restauran desde localStorage al cargar la página; si no hay datos, se inicia con arreglo vacío
let tasks = JSON.parse(localStorage.getItem('pa-tasks')) || [];
let currentFilter = 'all';

const taskInput  = document.getElementById('task-input');
const addBtn     = document.getElementById('add-btn');
const todoList   = document.getElementById('todo-list');
const counter    = document.getElementById('counter');
const emptyMsg   = document.getElementById('empty-msg');
const filterBtns = document.querySelectorAll('.filter-btns button');

// Serializa y persiste el arreglo completo cada vez que cambia algo
function save() {
    localStorage.setItem('pa-tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ id: Date.now(), text, done: false });
    save();
    render();

    taskInput.value = '';
    taskInput.focus();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        save();
        render();
    }
}

function createTaskElement(task) {
    const li = document.createElement('li');
    if (task.done) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `Marcar "${task.text}" como completada`);
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.setAttribute('aria-label', `Eliminar tarea "${task.text}"`);
    delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, span, delBtn);
    return li;
}

// Filtra las tareas visibles según currentFilter y redibuja la lista completa
function render() {
    let visible;
    if (currentFilter === 'pending')        visible = tasks.filter(t => !t.done);
    else if (currentFilter === 'completed') visible = tasks.filter(t => t.done);
    else                                    visible = tasks;

    todoList.innerHTML = '';
    visible.forEach(task => todoList.appendChild(createTaskElement(task)));

    emptyMsg.classList.toggle('d-none', visible.length > 0);

    // El contador siempre refleja el total de pendientes, sin importar el filtro activo
    const pendingCount = tasks.filter(t => !t.done).length;
    counter.textContent = pendingCount === 1
        ? '1 tarea pendiente'
        : `${pendingCount} tareas pendientes`;
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        render();
    });
});

render();
