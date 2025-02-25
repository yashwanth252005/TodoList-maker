var alltodos = getTodo();
var deletetodos = getDelTodo();
let todoList = document.getElementById("newtask");
let delTodoList = document.getElementById("newdeltask");
updatetodoList();
updatedeltodoList();
let add = document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault();
  let titleval = document.getElementById("title").value;
  let descval = document.getElementById("description").value;
  let dateval = document.getElementById("lastDate").value;
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formattedDate = `${date} <br> ${time}`;
  if (titleval.trim() === "" || descval.trim() === "" || !dateval) {
    if (titleval.trim() === "") {
      document.getElementById("title").addEventListener("input", () => { document.getElementById("errormsgt").style.display = "none" });
      document.getElementById("errormsgt").style.display = "block";
    }
    else {
      document.getElementById("errormsgt").style.display = "none";
    }
    if (descval.trim() === "") {
      document.getElementById("description").addEventListener("input", () => { document.getElementById("errormsgd").style.display = "none" });
      document.getElementById("errormsgd").style.display = "block";

    }
    else {
      document.getElementById("errormsgd").style.display = "none";
    }
    if (!dateval) {
      document.getElementById("lastDate").addEventListener("click", () => { document.getElementById("errormsgdate").style.display = "none" });
      document.getElementById("errormsgdate").style.display = "block";
    }
    else {
      document.getElementById("errormsgdate").style.display = "none";
    }
  }
  else {
    console.log(titleval, descval, dateval, formattedDate);

    addtodo(titleval, descval, dateval, formattedDate);
  }
  function addtodo(titleval, descval, dateval, formattedDate) {
    alltodos.push([titleval, descval, dateval, formattedDate]);
    console.log(alltodos);
    //createToDoItem([titleval, descval, dateval]);
    updatetodoList();
    saveTodo();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("lastDate").value = "";
  }
});
function updatetodoList() {

  todoList.innerHTML = "";
  alltodos.forEach((todo, todoIndex) => {
    todoItem = createToDoItem(todo, todoIndex);
    todoList.appendChild(todoItem);
  });
}
function updatedeltodoList() {
  delTodoList.innerHTML = "";
  deletetodos.forEach((todo, todoIndex) => {
    deleteToDoItem = createDelTodoItem(todo, todoIndex);
    delTodoList.appendChild(deleteToDoItem);
  });
}
function createToDoItem(todo, todoIndex) {
  //alert(todo);

  let todoId = "todo-" + todoIndex;
  // alert(todoId);
  let todoClass = "todo";
  let divi = document.createElement("div");
  divi.innerHTML =
    `<div class="card container text-bg-primary mb-3 grid-items ${todoClass}" id=${todoId} style="max-width: 18rem;">
<div class="card-header text-bg-dark">Task ${todoIndex + 1} : ${todo[0]}</div>
 <div class="card-body">
   <div class="card-title"><span class="text-danger mr-6" ><b class="text-bg-danger text-dark daysLeft">days left</b></span>
   <span class="text-end ml-3">
   <!--button edit starts 📝-->
    <button type="button" class="btn" id="new"><span class="material-symbols-outlined">edit_note</span>
    </button>
    <!-- Modal -->
<div class="modal fade" id="edit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-secondary">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>"
      </div>
      <div class="modal-body bg-dark">
        <p>Are you sure you want to edit this task?</p>
      </div>
      <div id="editDiv" class="modal-footer bg-secondary editdiv">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="confirmEdit" class="btn btn-primary">Edit</button>
      </div>
    </div>
  </div>
</div>
<!--buttton done ends📝-->
   </span>  </div>
   <p class="card-text">${todo[1]}<br /><br />
   <div id=lastEdited class="text-start"><em class="text-dark"><u class="text-black-50" >Last edited:</u>${todo[3]}</em></div></p>
 </div>
<div class="card-footer text-center">
<!--button delete starts ❌-->
<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" onclick="tdeleteToDoItem(${todoIndex})">
  Delete
</button>
<!-- Modal
<div class="modal fade" id="delete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-secondary">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body bg-dark">
        <p>Are you sure you want to delete this task?</p>
      </div>
      <div class="modal-footer bg-secondary">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="confirmDelete" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>
<buttton delete ends❌-->
<!--button done start📝-->
<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#done" onclick="doneToDoItem(${todoIndex})">
  <b>Done</b>
</button>
<!-- Modal
<div class="modal fade" id="done" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-secondary">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>"
      </div>
      <div class="modal-body bg-dark">
        <p>Are you sure you want to mark this task as done?</p>
      </div>
      <div class="modal-footer bg-secondary">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="confirmDone" class="btn btn-success">Done</button>
      </div>
    </div>
  </div>
</div>
buttton done ends✅-->
</div>
</div>`;
  return divi;
}
let interval = setInterval(updateCountdown, 1000); // Update every second
function updateCountdown() {
  alltodos.forEach((todo, index) => {
    let targetDate = new Date(todo[2]);
    let todoId = `todo-${index}`;

    let daysLeft = calculateDaysLeft(targetDate);

    document.getElementById(todoId).querySelector(".daysLeft").textContent = `${daysLeft} days left`;
  });
}
function tdeleteToDoItem(todoIndex) {
  //alert(todoIndex)
  let deltodo = alltodos[todoIndex];
  let deltitleVal = deltodo[0];
  let deldescVal = deltodo[1];
  let deldateVal = deltodo[2];
  var modal = document.getElementById("myModal");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var closeFooterBtn = document.getElementById("closeFooterBtn");
  var okBtn = document.getElementById("okBtn");
  var textcontent = document.getElementById("textcontent");
  textcontent.innerHTML = `<b><p>Are you sure you want to delete this task?</p></b>`;
  okBtn.innerText = "Yes"
  modal.style.display = "block";
  closeModalBtn.onclick = function() {
    modal.style.display = "none";
  }
  closeFooterBtn.onclick = function() {
    modal.style.display = "none";
  }
  okBtn.onclick = function() {
    //alert("Item deleted!");
    deletetodos.push([deltitleVal, deldescVal, deldateVal]);
    alltodos = alltodos.filter((_, i) => i !== todoIndex);

    updatetodoList();
    updatedeltodoList();
    saveTodo();
    modal.style.display = "none";
  }
}
function doneToDoItem(todoIndex) {
  // alert(todoIndex)
  var modal = document.getElementById("myModal");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var closeFooterBtn = document.getElementById("closeFooterBtn");
  var okBtn = document.getElementById("okBtn");
  var textcontent = document.getElementById("textcontent");
  textcontent.innerHTML = `<b><p>Are you sure you want to mark this task as done?</p></b>`;
  okBtn.innerText = "Yes"
  modal.style.display = "block";
  closeModalBtn.onclick = function() {
    modal.style.display = "none";
  }
  closeFooterBtn.onclick = function() {
    modal.style.display = "none";
  }
  okBtn.onclick = function() {
    // alert("Item deleted!");
    alltodos = alltodos.filter((_, i) => i !== todoIndex);
    saveTodo();
    updatetodoList();
    modal.style.display = "none";
  }
}
function calculateDaysLeft(targetDate) {
  const currentDate = new Date();
  const timeLeft = targetDate - currentDate;
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  if (daysLeft <= 0)
    return 0;
  return daysLeft;
}
function createDelTodoItem(todo, todoIndex) {
  let todoId = "delTodo-" + todoIndex;
  let todoClass = "deltodo";
  let deldivi = document.createElement("div");
  deldivi.innerHTML = `<div class="p-4 fs-6 text-white bg-primary" ><span class="delcard mt-5 ${todoClass}" id=${todoId}><div><spam class="text-dark font-weight-bold">Task ${todoIndex + 1} </spam>: ${todo[0]}<br>
  <spam class="text-dark font-weight-bold">Desc : </spam>${todo[1]}</div></span>
  <div class="mt-3"><span type="button" class="btn btn-danger" onclick="cancelTodoItem(${todoIndex})"><b>Cancel</b></span>
  <span class="btn btn-white" onclick="undoDelTodoItem(${todoIndex})"><b class="fs-5">Undo</b></span>
  </span></div></div>`;
  return deldivi;
}
function undoDelTodoItem(todoIndex) {
  let deltodo = deletetodos[todoIndex];
  let deltitleVal = deltodo[0];
  let deldescVal = deltodo[1];
  let deldateVal = deltodo[2];
  const cuDate = new Date();
  const date = cuDate.toLocaleDateString();
  const time = cuDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formattedDate = `${date} <br> ${time}`;
  alltodos.push([deltitleVal, deldescVal, deldateVal, formattedDate]);
  deletetodos = deletetodos.filter((_, i) => i !== todoIndex);
  updatetodoList();
  updatedeltodoList();
  saveTodo();
}
function cancelTodoItem(todoIndex) {
  deletetodos = deletetodos.filter((_, i) => i !== todoIndex);
  updatedeltodoList();
  saveTodo();
}
function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(alltodos));
  localStorage.setItem("deltodos", JSON.stringify(deletetodos));
}
function getTodo() {
  const todos = localStorage.getItem("todos") || [];
  return todos.length > 0 ? JSON.parse(todos) : [];
}
function getDelTodo() {
  const deltodos = localStorage.getItem("deltodos") || [];
  return deltodos.length > 0 ? JSON.parse(deltodos) : [];
}
function display() {
  document.getElementById("newdeltask").style.display = "block";
}