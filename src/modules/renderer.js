import { mainLoader, buttons } from "./DOM";
import { resetMain } from "./DOM";
import { displayNavTitle } from "./DOM";
import { currentDate } from "./DOM";

export function displayTodo(todoTitle, todoDate) {
  const container = document.createElement("div");
  const title = document.createElement("span");
  const date = document.createElement("span");

  const btnEdit = document.createElement("button");
  const btnRemove = document.createElement("button");

  btnEdit.textContent = "Edit";
  btnRemove.textContent = "Remove";

  title.textContent = `${todoTitle}`;
  date.textContent = `${todoDate}`;

  container.append(title, date, btnEdit, btnRemove);

  return mainLoader.append(container);
}

export function renderMain(mainID) {
  resetMain();
  mainLoader.append(buttons.newTodo);
  mainLoader.setAttribute("id", mainID);
  displayNavTitle(mainID);
  let todosObject = JSON.parse(localStorage.getItem("All") || "[]");
  for (let i = 0; i < todosObject.length; i++) {
    if (mainID == "All") {
      displayTodo(todosObject[i].title, todosObject[i].dueDate);
    }
    if (mainID == "Today" && todosObject[i].dueDate == currentDate) {
      displayTodo(todosObject[i].title, todosObject[i].dueDate);
    }
    if (
      mainID == todosObject[i].project &&
      mainID != "All" &&
      mainID != "Today"
    ) {
      displayTodo(todosObject[i].title, todosObject[i].dueDate);
    }
  }
}
