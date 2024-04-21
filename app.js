//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

runEvents();
let todos = [];


function runEvents(){
    form.addEventListener("submit" , addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoUI);
    clearButton.addEventListener("click", ClearAllTodo);
    filterInput.addEventListener("keyup", filter);  //klavyeden elini çektiği anda giden event 
}

//Localdeki dataları ekrana getiren fonksiyon
function pageLoaded(){
    checkTodoFromStoroge();
    todos.forEach(function (todo){
        addTodoUI(todo);
    })
}

//Filtreleme
function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
   
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");
            }else {
                todo.setAttribute("style","display : none !important");
            }
        });
    }else{
    showAlert("warning","Filtreleme yapmak için en az 1 todo olmalıdır.");

}
   
}

//Seçilen Todoyu ekrandan siler
function removeTodoUI(e){
    if(e.target.className==="fa fa-remove"){
      
      //Ekrandan Siler
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storoge'dan siler
        removeTodoStogore(todo.textContent);
        showAlert("success","Todo başarı ile silinmiştir.");

    }
}

function ClearAllTodo(){
    const todoListesi = document.querySelectorAll(".list-group-item");
      //  Ekrandan Silme
    if(todoListesi.length>0){
        todoListesi.forEach(function (todo){
            todo.remove();
        }); 

        //Storogedan silme
        todos=[];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Başarılı şekilde silinmiştir.")
    }else {
        showAlert("warning", "Listeyi temizlemek için en az 1 tane todo olmalıdır !");
    }
}

function removeTodoStogore(removeTodo){
    checkTodoFromStoroge();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);    //bir diziden eleman silmek için slice kullanılır.    
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e){

    const inputText = addInput.value.trim();
    if(inputText == null || inputText == ""){
        showAlert("warning" , "Lütfen boş deger girmeyiniz...");
    } else {
        //Arayüz Ekleme
        addTodoUI(inputText);
        addTodoStoroge(inputText);
        showAlert("success" , "Todo Eklendi");
    }

    //Storage Ekleme

    e.preventDefault();
}

function addTodoUI(newTodo)
{
 /*   <!--
                        <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
                    --> */
const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";
li.textContent = newTodo ;

const a = document.createElement("a");
a.href = "#";

const i = document.createElement("i");
i.className = "fa fa-remove";

a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);

addInput.value = "";
}

function addTodoStoroge(newTodo){
    checkTodoFromStoroge();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodoFromStoroge(){
    if(localStorage.getItem("todos")===null) { 
        todos = [] ;

     } else {
        todos = JSON.parse(localStorage.getItem("todos"));
     }
}

function showAlert (type , message){
{/* <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div> */}

const div = document.createElement("div");
// div.className = 'alert alert-${type}';
div.className = "alert alert-" + type ; 
div.textContent = message ;

firstCardBody.appendChild(div);

//2.5 saniye sonra alerti ekrandan kaldırır.
setTimeout(function(){
    div.remove();
},2500 );

}