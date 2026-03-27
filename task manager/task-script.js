// DATI
let tasks = [];
let categories = [];
let currentFilter = 'all';
let currentCategoryFilter = null;
let draggedItem = null;

// ELEMENTI DOM
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const categorySelect = document.getElementById('categorySelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const tasksRemainingSpan = document.getElementById('tasksRemaining');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const categoriesListDiv = document.getElementById('categoriesList');
const newCategoryInput = document.getElementById('newCategoryInput');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryFiltersDiv = document.getElementById('categoryFilters');

// INIT
function init() {
    loadFromLocalStorage();
    if (categories.length === 0) {
        // Categorie di default
        categories = [
        ];
        saveToLocalStorage();
    }
    render();
}

// LOCALSTORAGE
function saveToLocalStorage() {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    localStorage.setItem('taskflow_categories', JSON.stringify(categories));
}

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    const savedCategories = localStorage.getItem('taskflow_categories');
    
    if (savedTasks) tasks = JSON.parse(savedTasks);
    if (savedCategories) categories = JSON.parse(savedCategories);
}

// RENDER COMPLETO
function render() {
    renderCategories();
    renderCategorySelect();
    renderCategoryFilters();
    renderTasks();
    updateRemainingCount();
}

// RENDER CATEGORIE (gestione)
function renderCategories() {
    if (categories.length === 0) {
        categoriesListDiv.innerHTML = '<p style="color:#9ca3af; font-size:0.875rem;">Nessuna categoria. Aggiungine una!</p>';
        return;
    }
    
    categoriesListDiv.innerHTML = categories.map(cat => `
        <span class="category-badge">
            📁 ${escapeHtml(cat.name)}
            <button onclick="deleteCategory(${cat.id})" title="Elimina categoria">✖</button>
        </span>
    `).join('');
}

function renderCategorySelect() {
    categorySelect.innerHTML = categories.map(cat => `
        <option value="${cat.id}">📁 ${escapeHtml(cat.name)}</option>
    `).join('');
}

function renderCategoryFilters() {
    categoryFiltersDiv.innerHTML = `
        <button class="cat-filter-btn ${currentCategoryFilter === null ? 'active' : ''}" data-cat-filter="all">Tutte</button>
        ${categories.map(cat => `
            <button class="cat-filter-btn ${currentCategoryFilter === cat.id ? 'active' : ''}" data-cat-filter="${cat.id}">📁 ${escapeHtml(cat.name)}</button>
        `).join('')}
    `;
    
    // Aggiungi event listener ai filtri categoria
    document.querySelectorAll('[data-cat-filter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const value = btn.dataset.catFilter;
            currentCategoryFilter = value === 'all' ? null : parseInt(value);
            render();
        });
    });
}

// RENDER TASKS
function renderTasks() {
    let filteredTasks = [...tasks];
    
    // Filtro per stato
    if (currentFilter === 'active') {
        filteredTasks = filteredTasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.completed);
    }
    
    // Filtro per categoria
    if (currentCategoryFilter !== null) {
        filteredTasks = filteredTasks.filter(t => t.categoryId === currentCategoryFilter);
    }
    
    // Ordina per order
    filteredTasks.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<div style="text-align:center; padding:2rem; color:#9ca3af;">Nessun task da mostrare</div>';
        return;
    }
    
    tasksList.innerHTML = filteredTasks.map(task => {
        const category = categories.find(c => c.id === task.categoryId);
        const priorityClass = task.priority;
        const priorityLabel = task.priority === 'alta' ? '🔴 Alta' : task.priority === 'media' ? '🟡 Media' : '🟢 Bassa';
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" draggable="true" data-task-id="${task.id}">
                <span class="drag-handle" draggable="true">⋮⋮</span>
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span class="task-text">${escapeHtml(task.text)}</span>
                <span class="task-priority ${priorityClass}">${priorityLabel}</span>
                <span class="task-category">📁 ${category ? escapeHtml(category.name) : 'Nessuna'}</span>
                <button class="delete-task" data-id="${task.id}">🗑</button>
            </div>
        `;
    }).join('');
    
    // Aggiungi event listener
    document.querySelectorAll('.task-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const id = parseInt(cb.dataset.id);
            toggleTaskComplete(id);
        });
    });
    
    document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            deleteTask(id);
        });
    });
    
    // Setup drag and drop
    setupDragAndDrop();
}

// DRAG & DROP
function setupDragAndDrop() {
    const taskElements = document.querySelectorAll('.task-item');
    
    taskElements.forEach((taskEl, index) => {
        taskEl.addEventListener('dragstart', handleDragStart);
        taskEl.addEventListener('dragover', handleDragOver);
        taskEl.addEventListener('drop', handleDrop);
        taskEl.addEventListener('dragend', handleDragEnd);
        taskEl.setAttribute('data-index', index);
    });
}

let dragStartIndex = null;

function handleDragStart(e) {
    draggedItem = this;
    dragStartIndex = parseInt(this.getAttribute('data-index'));
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const dropTarget = this;
    const dragIndex = dragStartIndex;
    const dropIndex = parseInt(dropTarget.getAttribute('data-index'));
    
    if (dragIndex !== dropIndex && draggedItem !== dropTarget) {
        // Riordina i tasks
        let filteredTasks = getFilteredTasksForOrder();
        const draggedTaskId = parseInt(draggedItem.getAttribute('data-task-id'));
        const dropTaskId = parseInt(dropTarget.getAttribute('data-task-id'));
        
        const draggedTaskIndex = filteredTasks.findIndex(t => t.id === draggedTaskId);
        const dropTaskIndex = filteredTasks.findIndex(t => t.id === dropTaskId);
        
        if (draggedTaskIndex !== -1 && dropTaskIndex !== -1) {
            const [movedTask] = filteredTasks.splice(draggedTaskIndex, 1);
            filteredTasks.splice(dropTaskIndex, 0, movedTask);
            
            // Aggiorna gli order in tutti i tasks
            filteredTasks.forEach((task, idx) => {
                const originalTask = tasks.find(t => t.id === task.id);
                if (originalTask) originalTask.order = idx;
            });
            
            saveToLocalStorage();
            render();
        }
    }
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedItem = null;
    dragStartIndex = null;
}

function getFilteredTasksForOrder() {
    let filtered = [...tasks];
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    if (currentCategoryFilter !== null) {
        filtered = filtered.filter(t => t.categoryId === currentCategoryFilter);
    }
    filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
    return filtered;
}

// FUNZIONI TASK
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    
    const priority = prioritySelect.value;
    const categoryId = parseInt(categorySelect.value);
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: priority,
        categoryId: categoryId,
        order: tasks.length
    };
    
    tasks.push(newTask);
    saveToLocalStorage();
    render();
    taskInput.value = '';
    taskInput.focus();
}

function toggleTaskComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToLocalStorage();
        render();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToLocalStorage();
    render();
}

function clearCompletedTasks() {
    tasks = tasks.filter(t => !t.completed);
    saveToLocalStorage();
    render();
}

function updateRemainingCount() {
    const remaining = tasks.filter(t => !t.completed).length;
    tasksRemainingSpan.textContent = `${remaining} task rimanenti`;
}

// FUNZIONI CATEGORIE
function addCategory() {
    const name = newCategoryInput.value.trim();
    if (!name) return;
    
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert('Categoria già esistente!');
        return;
    }
    
    const newCategory = {
        id: Date.now(),
        name: name
    };
    
    categories.push(newCategory);
    saveToLocalStorage();
    render();
    newCategoryInput.value = '';
}

function deleteCategory(id) {
    // Verifica se ci sono task con questa categoria
    const hasTasks = tasks.some(t => t.categoryId === id);
    if (hasTasks) {
        if (confirm('Ci sono task con questa categoria. Eliminarli tutti?')) {
            tasks = tasks.filter(t => t.categoryId !== id);
        } else {
            return;
        }
    }
    
    categories = categories.filter(c => c.id !== id);
    
    // Se il filtro corrente era su questa categoria, resetta
    if (currentCategoryFilter === id) {
        currentCategoryFilter = null;
    }
    
    saveToLocalStorage();
    render();
}

// UTILITY
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// EVENT LISTENERS
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
addCategoryBtn.addEventListener('click', addCategory);
newCategoryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addCategory();
});

// Filtri stato
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// AVVIA
init();