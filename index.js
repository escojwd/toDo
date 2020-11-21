// document.addEventListener('DOMContentLoader', function(){
    
    // });
    
    // add new task
    const addTask = document.getElementById("new-task");
    const taskList = document.getElementById('task-list');
    const completedList = document.getElementById('completed-tasks');

    let allTask = JSON.parse(localStorage.getItem("tasks")) ?? [];

    allTask.forEach(createTaskElement);

    function createTaskElement(task) {
        const li = document.createElement('li');
        const checkBox = document.createElement('input');
        checkBox.setAttribute("type", "checkbox");
        checkBox.id = task.id;
        const todoName = document.createElement('h2');

        // add content
        todoName.textContent = task.text;
        
        // append to document
        li.appendChild(checkBox);
        li.appendChild(todoName);
        taskList.appendChild(li);

        li.classList.add("new-tasks-list");
        
        checkBox.addEventListener('change', completeTask);

    }

    let id = allTask.length ? parseInt(allTask.slice(-1)[0].id.replace("task_", "")) + 1 : 1;

addTask.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && addTask.value.trim() !== "") {
        const title = addTask.value;
        const newTask = {
            id: "task_" + id++,
            text: title,
            timeout: null
        }; 

        allTask.push(newTask);
        
        createTaskElement(newTask);

        addTask.value = null;

        localStorage.setItem("tasks", JSON.stringify(allTask));
    }
});


function completeTask(e){
    const currentTask = allTask.find(task => task.id == e.target.id);
    if(e.target.checked){
        currentTask.timeout = setTimeout( () => {
            const li = e.target.parentElement;
            const id = e.target.id
            completedList.appendChild(li);
            removeTask(id);
            localStorage.setItem("tasks", JSON.stringify(allTask));
            setTimeout(function(){
                li.remove();
            }, 2000);
            e.target.remove();
        }, 3000);
    }else{
        if(currentTask.timeout){
            clearTimeout(currentTask.timeout);
            currentTask.timeOut = null;
        }
    }
}

function removeTask(id){
    allTask = allTask.filter( task => task.id !== id);
}

window.addEventListener("storage", function (){
    console.log("this is another tab and it's working");
    ul.innerHTML = "";
    allTask = JSON.parse(localStorage.getItem("tasks"));
    allTask.forEach(createTaskElement);

});
