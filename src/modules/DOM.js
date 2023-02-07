const container = document.querySelector("#container");

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

  const btnNewTodo = document.createElement("button");
  btnNewTodo.setAttribute("id", "new-todo");
  btnNewTodo.textContent = "New Todo";

  sidebar.append(sidebarStatic, sidebarDynamic, btnNewTodo);

  return { sidebar, btnNewTodo };
})();

// sidebarLoader helper
function sideBarItem(text, ionicIcon) {
  const itemContainer = document.createElement("span");

  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", `${ionicIcon}`);

  const button = document.createElement("button");
  button.textContent = `${text}`;
  button.setAttribute("id", `button-${text}`);

  itemContainer.append(icon, button);
  return itemContainer;
}

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
  console.log(currentDate);

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
    sidebarLoader.sidebar,
    footerLoader,
    modalLoader.modal
  );
}
