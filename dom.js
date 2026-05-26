const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const themeBtn=document.getElementById("themeBtn");
const progressBar=document.getElementById("progressBar");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

renderTasks();

addBtn.onclick=addTask;
themeBtn.onclick=toggleTheme;

function addTask(){

const text=taskInput.value.trim();
if(text==="") return;

tasks.push({text,completed:false});

saveTasks();
renderTasks();

taskInput.value="";
}

function renderTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");
li.draggable=true;

if(task.completed) li.classList.add("completed");

li.innerHTML=`

<input type="checkbox" ${task.completed?"checked":""}>

<span>${task.text}</span>

<div class="actions">

<button class="edit">Edit</button>
<button class="delete">Delete</button>

</div>
`;

const checkbox=li.querySelector("input");

checkbox.onchange=()=>{
tasks[index].completed=checkbox.checked;
saveTasks();
updateProgress();
};

li.querySelector(".delete").onclick=()=>{
tasks.splice(index,1);
saveTasks();
renderTasks();
};

li.querySelector(".edit").onclick=()=>{
const newTask=prompt("Edit task",task.text);

if(newTask){
tasks[index].text=newTask;
saveTasks();
renderTasks();
}
};

taskList.appendChild(li);

});

updateProgress();
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function toggleTheme(){
document.body.classList.toggle("dark");
}

function updateProgress(){

const completed=tasks.filter(t=>t.completed).length;
const percent=tasks.length? (completed/tasks.length)*100:0;

progressBar.style.width=percent+"%";

}