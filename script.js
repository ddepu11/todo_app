const name = document.getElementById("name");
const submitBtn = document.getElementById("submit");
const message = document.querySelector(".msg");
const section = document.querySelector("section");
const clear = document.getElementById("clear");

// let todos = [
//   {
//     id: 1,
//     title: "Buy Groceries...",
//     hasCompleted: false,
//   },
// ];

let todos;

// Getting all the todos from Localstorage
if (
  localStorage.getItem("todos") !== "" &&
  localStorage.getItem("todos") !== null
) {
  todos = JSON.parse(localStorage.getItem("todos"));
} else {
  todos = [];
}

// Display error or success message
function showMessage(msg, classToAddAndRemove) {
  message.innerText = msg.trim();
  message.classList.add(classToAddAndRemove.trim());
  setTimeout(() => message.classList.remove(classToAddAndRemove.trim()), 2000);
}
// Showing todos in the DOM
fetchTodos();
function fetchTodos() {
  todos !== null
    ? todos
        .map(
          (todo, index) => `
        <p><span id="index">${index + 1} </span>${todo.title}</p>
        <div class="icons">

          <i class="far fa-check-circle fa-2x done" id="${todo.id}" ></i>
          <i class="far fa-trash-alt fa-2x delete" data-id="${todo.id}" ></i>
        </div>
        <div class="line ${todo.hasCompleted ? "show" : ""} " id="${
            todo.id
          }"></div>
      `
        )
        .forEach((todo) => {
          const div = document.createElement("div");
          div.classList.add("todos");
          div.innerHTML = todo;
          section.appendChild(div);
        })
    : "";
}

// Adds a new TODO and saving in local storage
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (name.value === null || name.value === "") {
    showMessage("Input value cannot be empty!!", "error");
  } else {
    let newTodo = {
      id: Math.floor(Math.random() * 2555),
      title: name.value.trim(),
      hasCompleted: false,
    };

    if (todos !== null) {
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      todos = [...todos, newTodo];
    } else {
      localStorage.setItem("todos", JSON.stringify([newTodo]));
      todos.push(newTodo);
    }
    showMessage("Successfully added a Todo", "success");

    section.innerText = "";
    fetchTodos();
    name.value = "";
    completed();
    deleteTodo();
  }
});

// Todo Completed function
completed();
function completed() {
  const line = document.querySelectorAll(".line");
  const done = document.querySelectorAll(".done");

  done.forEach((done) => {
    done.addEventListener("click", () => {
      line.forEach((line) => {
        if (done.id === line.id) {
          line.classList.toggle("show");

          const todoObj = todos.find((todo) => {
            return +done.id === todo.id;
          });

          showMessage("ToDo Completed!!", "success");

          todoObj.hasCompleted = !todoObj.hasCompleted;
          localStorage.setItem("todos", JSON.stringify([...todos]));
        }
      });
    });
  });
}

// Todo delete function
deleteTodo();

function deleteTodo() {
  const deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const dataId = deleteBtn.getAttribute("data-id");
      todos = todos.filter((todo) => todo.id !== +dataId);

      showMessage("ToDo deleted!!", "error");

      localStorage.setItem("todos", JSON.stringify([...todos]));
      section.innerText = "";
      fetchTodos();
      completed();
      deleteTodo();
    });
  });
}

// Delete all the todos
clear.addEventListener("click", () => {
  if (todos !== null) {
    todos.length !== 0 ? showMessage("Deleted all the todos!!!", "error") : "";
    todos.length = 0;
    localStorage.setItem("todos", JSON.stringify(todos));
    section.innerHTML = "";
  }
});
