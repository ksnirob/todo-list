//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change', filterTodo)

//functions
function addTodo(event) {
    event.preventDefault()

    //todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerHTML = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //local todos
    saveLocalTodos(todoInput.value)

    const doneButton = document.createElement('button')
    doneButton.innerHTML = '<i class="fas fa-check"></i>'
    doneButton.classList.add('complete-button')
    todoDiv.appendChild(doneButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-button')
    todoDiv.appendChild(trashButton)

    //append to ul
    todoList.appendChild(todoDiv)
    todoInput.value = ''
}


function deleteCheck(e) {
    // console.log(e.target)
    const item = e.target

    //delete todo
    if (item.classList[0] === 'trash-button') {
        // item.remove()
        const todo = item.parentElement
        //animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }

    //check todo
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.nodeType === Node.ELEMENT_NODE) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }

    });
}


function saveLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    console.log('hello')
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
        //todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        const newTodo = document.createElement('li')
        newTodo.innerHTML = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        const doneButton = document.createElement('button')
        doneButton.innerHTML = '<i class="fas fa-check"></i>'
        doneButton.classList.add('complete-button')
        todoDiv.appendChild(doneButton)

        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-button')
        todoDiv.appendChild(trashButton)

        //append to ul
        todoList.appendChild(todoDiv)
    })
}


function removeLocalTodos(todo){
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerHTML
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}