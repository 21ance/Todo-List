import "./css/styles.scss";
import { InitializePage } from "./modules/DOM";
import { events } from "./modules/eventListeners";
import { displayTodo } from "./modules/initialPage";
import { mainLoader, resetMain, buttons } from "./modules/DOM";

InitializePage();

const sideBarNav = document.querySelectorAll(
  ".sidebar-dynamic button, .sidebar-static button"
);
sideBarNav.forEach((button) => {
  button.addEventListener("click", (e) => {
    resetMain();
    mainLoader.setAttribute("id", `${e.target.textContent}`);
    displayNavTitle(e.target.textContent);
    displayNavTodos();

    let todosObject = JSON.parse(localStorage.getItem("All") || "[]");
    let currentDate = new Date().toJSON().slice(0, 10);

    for (let i = 0; i < todosObject.length; i++) {
      if (e.target.textContent == "All") {
        displayTodo(todosObject[i].title, todosObject[i].dueDate);
      }
      if (
        e.target.textContent == "Today" &&
        todosObject[i].dueDate == currentDate
      ) {
        displayTodo(todosObject[i].title, todosObject[i].dueDate);
      }
      if (e.target.textContent == todosObject[i].project) {
        displayTodo(todosObject[i].title, todosObject[i].dueDate);
      }
    }
  });
});

function displayNavTodos() {
  //
  mainLoader.append(buttons.newTodo);
}

function displayNavTitle(name) {
  const span = document.createElement("span");
  span.textContent = `${name}`;

  mainLoader.append(span);
}
