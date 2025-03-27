document.addEventListener('DOMContentLoaded', ()=>{
    const addButton = document.getElementById('add-btn');
        if(addButton){
            addButton.addEventListener('click', AddTask);
        } 
        
        document.getElementById('taskList', addEventListener('click', (event)=> {
            if (event.target.classList.contains('delete-btn')){
                DeleteTask(event.target)
            }
        }));
});


let todoItems = [];

function AddTask() {
    let inputElement = document.getElementById("taskInput");
    let inputValue = inputElement.value.trim();

    if (inputValue === "") {
        alert("Please add an item");
        return;
    }

    let task = {
        id: Date.now(),
        text: inputValue,
        completed: false
    };

    todoItems.push(task);
    console.log(todoItems);
    let list = document.createElement("li");
    list.className = "todo-item";
    list.dataset.id = task.id;
    list.innerHTML = `
                <div class="todo-item-content">
                    <input type="checkbox" onclick="ToggleTask(this)">
                    <span>${inputValue}</span>
                </div>
                <button class="delete-btn">Delete</button>
            `;

    document.getElementById("taskList").appendChild(list);
    inputElement.value = "";
    // alert(`${inputValue} added successfully.`);
}

function ToggleTask(checkbox) {
    let listItem = checkbox.closest('.todo-item');
    let taskId = parseInt(listItem.dataset.id);

    let taskIndex = todoItems.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        todoItems[taskIndex].completed = checkbox.checked;

        if (checkbox.checked) {
            listItem.classList.add('completed');
            console.log("completed")
        } else {
            listItem.classList.remove('completed');
            console.log("Not completed")
        }
    }
}

function DeleteTask(button) {
    let list = button.parentElement;
    let taskId = parseInt(list.dataset.id);

    let confirmation = confirm('Are you sure you want to delete this task?');
    if(confirmation){
        let taskList = document.getElementById("taskList");
        taskList.removeChild(list);
        todoItems = todoItems.filter(task => task.id !== taskId);
        console.log(todoItems);
    }



}