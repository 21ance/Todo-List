import { loadAll } from "./initialPage";
import { Storage } from "./localStorage";

const container = document.querySelector("#container");

export const buttons = (() => {
  const newTodo = document.createElement("button");
  newTodo.setAttribute("id", "new-todo");
  newTodo.textContent = "New Todo";

  const newProject = document.createElement("button");
  newProject.setAttribute("id", "new-project");
  newProject.textContent = "New Project";

  return { newTodo, newProject };
})();

const headerLoader = (() => {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "Todo List";

  header.append(h1);
  return header;
})();

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

  for (let i = 0; i < Storage.projectList.length; i++) {
    sidebarDynamic.append(
      sideBarItem(`${Storage.projectList[i]}`, "pricetag-outline")
    );
  }

  sidebar.append(sidebarStatic, sidebarDynamic, buttons.newProject);

  return sidebar;
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

export const mainLoader = document.createElement("main");

const footerLoader = (() => {
  const footer = document.createElement("footer");
  const footerSpan = document.createElement("span");
  footerSpan.textContent = "by 21ance";

  footer.append(footerSpan);
  return footer;
})();

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
  let currentDate = new Date().toJSON().slice(0, 10);
  date.setAttribute("min", `${currentDate}`);
  // console.log(currentDate);

  const btnSubmit = document.createElement("button");
  btnSubmit.textContent = "Add Todo";

  form.append(title, description, date, btnSubmit);
  modalContent.append(form);
  modal.append(modalContent);

  return { modal, form };
})();

export function InitializePage() {
  container.append(
    headerLoader,
    sidebarLoader,
    mainLoader,
    footerLoader,
    modalLoader.modal
  );
  resetMain();
  loadAll();
}

export function resetMain() {
  let children = mainLoader.childElementCount;
  for (let i = 0; i < children; i++) {
    mainLoader.removeChild(mainLoader.lastChild);
  }
}
