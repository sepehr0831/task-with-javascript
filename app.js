const form = document.querySelector("#task-form");
const taskinput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const tasklist = document.querySelector(".list-group");
const clearBtn = document.querySelector(".clear-tasks");


loadEventListeners();



function loadEventListeners(){


    document.addEventListener("DOMcontentloaded", getTasks);

    //Add task event
    form.addEventListener("submit", addtask);

    //delete task
    tasklist.addEventListener("click",removeTask);

    // Clear task
    clearBtn.addEventListener("click",clearTask);

    // Filete task
    filter.addEventListener("keyup",filterTask)
}



function getTasks(){

    let tasks ;
    if(localStorage.getItem("tasks") === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){

        const li = document.createElement("li");
        li.className = 'list-group-item d-flex align-items-center';
        li.appendChild(document.createTextNode(taskinput.value));

        const i = document.createElement("i");
        i.className = 'fas fa-times text-danger  delete-item';
        li.appendChild(i);

        tasklist.appendChild(li);
    })
}





function addtask(e){
    
    if(taskinput.value === ""){
        alert('برای افزودن تسک در ابتدا تسک را وارد نمایید')
    }else{

        const li = document.createElement("li");
        li.className = 'list-group-item d-flex align-items-center';
        li.appendChild(document.createTextNode(taskinput.value));

        const i = document.createElement("i");
        i.className = 'fas fa-times text-danger mr-auto delete-item';
        li.appendChild(i);

        tasklist.appendChild(li);

        storeTaskInLocalStorage(taskinput.value);

        taskinput.value ="";

        e.preventDefault();


    }
}



function storeTaskInLocalStorage(task){

    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}






function removeTask(e){
    //to find a red button
   if( e.target.classList.contains("delete-item")){
    if(confirm('آیا برای حذف تسک مطمئنید هستید؟')){
        e.target.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement);
    }
   }
}


// remove from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") ===  null){
        tasks = [];
    }else{
        tasks.JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Clear all tasks
function clearTask(){
    tasklist.innerHTML = '';
    clearTaskFromStorage();
}


function clearTaskFromStorage(){
    localStorage.clear();
}



function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(function(task){
    
    const item = task.textContent
    
    if (item.toLowerCase().indexOf(text)!= -1){
        task.classList.add("d-flex");
    }else{
        task.classList.remove("d-flex");
        task.style.display = "none";
    }
    
});
}   


