import { mainLoader, buttons } from "./DOM";

export function loadAll() {
  let users = JSON.parse(localStorage.getItem("All") || "[]");
  mainLoader.append(buttons.newTodo);

  for (let i = 0; i < users.length; i++) {
    displayTodo(users[i].title, users[i].dueDate);
  }
}

export function displayTodo(todoTitle, todoDate) {
  const container = document.createElement("div");
  const title = document.createElement("span");
  const date = document.createElement("span");

  title.textContent = `${todoTitle}`;
  date.textContent = `${todoDate}`;

  container.append(title, date);

  return mainLoader.append(container);
}
