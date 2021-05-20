let addTask = function(taskText, saveToLocal, isChecked) {
    // add task to local storage if not loaded
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let inputArea = document.getElementById('input-task')
    if (saveToLocal) {
        if (taskList.some(a => a[0] === taskText)) {
            inputArea.classList.add('is-invalid');
            return;
        }
        inputArea.classList.remove('is-invalid');
        taskList.push([taskText, false]);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
    // display task on html
    let newTask = `<li class="list-group-item d-flex justify-content-between align-items-center">
            <input class="form-check-input flex-shrink-0" type="checkbox" />
            <span class="task px-2 text-break">${taskText}</span>
            <button type="button" class="delete-btn btn btn-danger flex-shrink-0">
                <i class="fas fa-trash"></i>
            </button>
        </li>`
    document.getElementById("input-task").value = '';
    container.insertAdjacentHTML('beforeend', newTask);

    // "delete option" for new task
    container.lastElementChild.lastElementChild.addEventListener('click', deleteTask, false);
    // add check status if loading
    if (!saveToLocal) {
        container.lastElementChild.firstElementChild.checked = isChecked;
        // add line-through class
        if (isChecked) {
            container.lastElementChild.children[1].style.textDecoration = 'line-through';
        }
    }
    // "line through option" for new task
    container.lastElementChild.firstElementChild.addEventListener( 'change', decorText);
}


let deleteTask = function(e) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList = taskList.filter(function(value, index, arr){
        return value[0] !== e.currentTarget.parentNode.children[1].innerHTML;
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    e.currentTarget.parentNode.remove();
}

let decorText = function(e) {
    let isTaskChecked = false;
    if(e.target.checked) {
        e.currentTarget.parentNode.children[1].style.textDecoration = 'line-through';
        isTaskChecked = true;
    } else {
        e.currentTarget.parentNode.children[1].style.textDecoration = 'none';
    }
    //add check status
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    if (taskList.length < 1) return;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i][0] === e.currentTarget.parentNode.children[1].innerHTML) {
            taskList[i][1] = isTaskChecked;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
}


// load tasks on load
document.addEventListener('DOMContentLoaded', function() {
    let el = document.getElementById("input-task");
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    if (taskList.length < 1) return;
    for (let i = 0; i < taskList.length; i++) {
        addTask(taskList[i][0], false, taskList[i][1]);
    }

    // checked or not
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener( 'change', decorText);
    }

}, false);



// add task
let addTaskBtn = document.getElementById("add-task-button");
let container = document.getElementById('task-list');

addTaskBtn.addEventListener("click", function() {
    let el = document.getElementById("input-task");
    if (!el.value) return;
    addTask(el.value, true,false);
});


// delete task
let deleteTaskBtns = document.getElementsByClassName('delete-btn');

for (let i = 0; i < deleteTaskBtns.length; i++) {
    deleteTaskBtns[i].addEventListener('click', deleteTask, false);
}
