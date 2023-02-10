import { renderMain, renderSidebarItems } from "./renderer";

const container = document.querySelector("#container");
export const currentDate = new Date().toJSON().slice(0, 10);

export const buttons = (() => {
  function createTodoButton() {
    const btnNewTodo = document.createElement("button");
    btnNewTodo.setAttribute("id", "new-todo");
    btnNewTodo.textContent = "New Todo";

    return btnNewTodo;
  }

  function createProjectButton() {
    const btnNewProject = document.createElement("button");
    btnNewProject.setAttribute("id", "new-project");
    btnNewProject.textContent = "New Project";

    return btnNewProject;
  }

  function createEditButton(identifier) {
    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "btnEdit");
    btnEdit.textContent = "Edit";

    btnEdit.setAttribute("data-id", `${identifier}`);

    return btnEdit;
  }

  function createRemoveButton(identifier) {
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("id", "btnRemove");
    btnRemove.textContent = "Remove";

    btnRemove.setAttribute("data-id", `${identifier}`);

    return btnRemove;
  }

  return {
    createTodoButton,
    createProjectButton,
    createEditButton,
    createRemoveButton,
  };
})();

// header
const headerLoader = (() => {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "Todo List";

  header.append(h1);
  return header;
})();

// sidebar
export const sidebarLoader = (() => {
  const sidebar = document.createElement("aside");

  const sidebarStatic = document.createElement("div");
  sidebarStatic.classList.add("sidebar-static");

  const sidebarDynamic = document.createElement("div");
  sidebarDynamic.classList.add("sidebar-dynamic");

  const projSpan = document.createElement("span");
  projSpan.classList.add("project-text");
  projSpan.textContent = "Projects";

  sidebarStatic.append(
    sideBarItem("All", "calendar-clear-outline"),
    sideBarItem("Today", "today-outline"),
    sideBarItem("Upcoming", "calendar-outline")
  );

  sidebarDynamic.append(projSpan);
  sidebar.append(sidebarStatic, sidebarDynamic, buttons.createProjectButton());

  return { sidebar, sidebarDynamic };
})();

// sidebarLoader helper
export function sideBarItem(text, ionicIcon) {
  const itemContainer = document.createElement("span");

  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", `${ionicIcon}`);

  const button = document.createElement("button");
  button.textContent = `${text}`;
  button.setAttribute("id", `button-${text}`);

  itemContainer.append(icon, button);
  return itemContainer;
}

// main
export const mainLoader = document.createElement("main");

export function displayNavTitle(name) {
  const span = document.createElement("span");
  span.textContent = `${name}`;

  mainLoader.append(span);
}

// footer
const footerLoader = (() => {
  const footer = document.createElement("footer");
  const footerSpan = document.createElement("span");
  footerSpan.textContent = "by 21ance";

  footer.append(footerSpan);
  return footer;
})();

// modal
export const modalLoader = (() => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const form = document.createElement("form");

  const title = document.createElement("input");
  title.setAttribute("id", "title");
  title.placeholder = "Title: Morning exercise";
  title.required = true;

  const description = document.createElement("input");
  description.setAttribute("id", "description");
  description.placeholder = "Details: 5km run";

  const date = document.createElement("input");
  date.setAttribute("type", "date");
  date.setAttribute("id", "date");
  //limit date input to today onwards
  // let currentDate = new Date().toJSON().slice(0, 10);
  date.setAttribute("min", `${currentDate}`);
  // console.log(currentDate);

  const btnSubmit = document.createElement("button");
  btnSubmit.textContent = "Add Todo";

  form.append(title, description, date, btnSubmit);
  modalContent.append(form);
  modal.append(modalContent);

  return { modal, form };
})();

const InitializePage = (() => {
  container.append(
    headerLoader,
    sidebarLoader.sidebar,
    mainLoader,
    footerLoader,
    modalLoader.modal
  );
})();

renderMain("All");
renderSidebarItems();
