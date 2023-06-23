console.log("hello todo list web app")

// const variable declarations and assigning the values from the elements of HTML file

const todoForm = document.querySelector('#todo-form')
const todoList = document.querySelector('.todos')
const totalTasks = document.querySelector('#total-tasks')
const remainingTasks = document.querySelector('#remaining-tasks')
const completedTasks = document.querySelector('#completed-tasks')
const mainInput = document.querySelector('#todo-form input')
// const mainInput = document.querySelector('input[name="task-name"]');


// this is the decalartion of variable to store data into a local storage
// let tasks = JSON.parse(localStorage.getItem('tasks')) || []

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add this check to ensure tasks is always an array
if (!Array.isArray(tasks)) {
  tasks = [];
}

if(localStorage.getItem('tasks')){
    tasks.map((task) => {
        createTask(task);
    })
}

     // This line applies the addEventListener on the todoForm 
    //  (Which is the document.querySelector(todo-form input))
    //  and then submit which is type of button its
    //  basically link the input and button with type submit
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputValue = mainInput.value
     
    // apply the condition if inputValue is equal to the empty string then return nothing

    if(inputValue == ''){
        return;
    }

    // declare a new object of name task and define the properties which is name , id and iscompleted
    let task = {
        id: new Date().getTime(),       //this is for unique id
        name: inputValue,               //this means inputValue is equal to name
        isCompleted: false              //....................?
    }
    console.log(task)    // when you input the value in mainInput and then press the add tasks
                         // it runs the object and display its value in console because of the console.log
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // this line calls a function which create the tasks and pass the task object
    createTask(task)

    //this function reset the value of todoFrom which is basically main input
    // todoForm.reset()
    //and this function create the focus on the mainInput
    mainInput.focus()
})


    todoList.addEventListener('click', (e) =>{
        if (e.target.classList.contains('remove-task') || e.target.
        parentElement.classList.contains('remove-task') || e.target.
        parentElement.parent.classElement.contains('remove-task')) {
            const taskId = e.target.closest('li').id 

            removeTask(taskId)
        }
    })

    todoList.addEventListener('input', (e) => {
        const taskId = e.target.closest('li').id;

        UpdateTask(taskId, e.target)
    })
    //this is the function name createTask 
    //which means when this function called what happens
    function createTask(task){
        
        // First create a task element which is li
        const taskElement = document.createElement('li')
        taskElement.setAttribute('id', task.id)

        if(task.isCompleted){
            taskElement.classList.add('complete')
        }

        //decclare the variable of name taskElementMarkup 
        //and then assign a variable to it which is HTML Markup
        const taskMarkup = `
        <div>    
            <input type="checkbox" name="tasks" id="${task.id}" ${task.
            isCompleted ? 'checked' : ''}>
            <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.
                name}</span>
        </div>
        <button title="Remove the "${task.name}" task" class="remove-task">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 
                210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256
                41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4
                406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </button>
        `;

        taskElement.innerHTML = taskMarkup

        todoList.appendChild(taskElement);
        countTasks()
    }

    function countTasks(){
        
        const completedTasksInArray = tasks.filter((task) => task.isCompleted === true)

        totalTasks.textContent = tasks.length
        completedTasks.textContent = completedTasksInArray.length
        remainingTasks.textContent = tasks.length - completedTasksInArray.length;
    }

    function removeTask(taskId){
     tasks = tasks.filter((task) => {task.id !== parseInt(taskId)})

     document.getElementById(taskId).remove()
     
     localStorage.setItem('tasks', JSON.stringify(tasks))

        countTasks()
    }

    function UpdateTask(taskId, el){
         const task = tasks.find((task) => taskId.id === parseInt(taskId))

         if(el.hasAttribute('contenteditable')){ 
            task.name = el.textContent
         } else {
            const span = el.nextElementSibling 
            const parent = el.closest('li')

            task.isCompleted = !task.isCompleted

            if(task.isCompleted){
                span.removeAttribute('contenteditable')
                parent.classList.add('complete')        
            }else{
                span.setAttribute('contenteditable','true')
                parent.classList.remove('complete')
            }
         }
         localStorage.setItem('tasks', JSON.stringify(tasks))

         countTasks()
    }