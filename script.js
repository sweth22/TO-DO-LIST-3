function addTask(){

let input=document.getElementById("taskInput");
let task=input.value.trim();

if(task===""){
alert("Please enter a task");
return;
}

let li=document.createElement("li");

li.innerHTML=`
<input type="checkbox" onclick="toggleTask(this)">
<span>${task}</span>
<button class="delete-btn" onclick="deleteTask(this)">Delete</button>
`;

document.getElementById("taskList").appendChild(li);

input.value="";

updateProgress();

}

function deleteTask(button){

let task = button.parentElement;

task.style.opacity="0";
task.style.transform="translateX(50px)";

setTimeout(()=>{
task.remove();
updateProgress();
},300);

}

function toggleTask(checkbox){

let li=checkbox.parentElement;

li.classList.toggle("completed");

updateProgress();

}

function removeAll(){

document.getElementById("taskList").innerHTML="";

updateProgress();

}

function changeTheme(){

document.body.classList.toggle("dark");

}

function updateProgress(){

let tasks=document.querySelectorAll("#taskList li");

let completed=document.querySelectorAll("#taskList li.completed");

let percent = tasks.length ? (completed.length / tasks.length) * 100 : 0;

document.getElementById("progressBar").style.width = percent + "%";

}