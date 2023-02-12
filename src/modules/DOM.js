import { modal } from "./modal";
import { Storage } from "./storage";

const dom = (() => {
  const allProjects = document.querySelector(
    ".sidebar-static>button:first-child"
  );
  const sidebarDynamic = document.querySelector(".sidebar-dynamic");

  function renderSideBarProjects() {
    allProjects.classList.add("active");
    resetSideBarProjects();
    for (let i = 0; i < Storage.projectList.length; i++) {
      sidebarDynamic.append(renderProjectUI(Storage.projectList[i], i));
    }
  }

  function resetSideBarProjects() {
    while (sidebarDynamic.firstChild) {
      sidebarDynamic.removeChild(sidebarDynamic.lastChild);
    }
  }

  function appendSideBarProjects() {
    const newItem = renderProjectUI(
      Storage.projectList[Storage.projectList.length - 1],
      Storage.projectList.length - 1
    );
    sidebarDynamic.append(newItem);
  }

  function renderProjectUI(projectName, identifier) {
    const container = document.createElement("div");
    container.classList.add("dynamic-item-container");
    // leftside
    const button = document.createElement("button");
    button.classList.add("dynamic-button");
    button.setAttribute("data-index", identifier);

    const buttonIcon = document.createElement("ion-icon");
    buttonIcon.setAttribute("name", "calendar-clear-outline");
    // rightside
    const rightSide = document.createElement("div");

    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("data-index", identifier);
    btnEdit.title = "Edit Project";
    const btnEditIcon = document.createElement("ion-icon");
    btnEditIcon.setAttribute("name", "create-outline");
    btnEdit.append(btnEditIcon);

    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("data-index", identifier);
    btnRemove.title = "Remove Project";
    const btnRemoveIcon = document.createElement("ion-icon");
    btnRemoveIcon.setAttribute("name", "trash-outline");
    btnRemove.append(btnRemoveIcon);

    rightSide.append(btnEdit, btnRemove);
    button.append(buttonIcon, projectName);
    container.append(button, rightSide);

    return container;
  }

  // sidebar inactive
  function resetSideBarStatus() {
    const btn = document.querySelectorAll(".dynamic-button, .static-button");
    btn.forEach((b) => {
      b.classList.remove("active");
      b.parentElement.classList.remove("active");
    });
  }

  // sidebar active
  function activeSidebarStatus(element) {
    element.classList.add("active");
  }

  // main
  const main = document.querySelector(".container > main");
  const todoContainer = document.createElement("div");
  const todoHeader = document.createElement("div");
  todoHeader.classList.add("todo-header");

  function renderMain(header) {
    resetMain();

    todoContainer.classList.add("todos");

    const h1 = document.createElement("h1");
    h1.textContent = header;

    todoHeader.append(h1);
    todoContainer.append(todoHeader);
    main.append(todoContainer);
  }

  function renderTodoItem() {
    // console.log(document.querySelector(".container > main"));

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // left
    const todoItemLeft = document.createElement("div");
    todoItemLeft.classList.add("todo-item-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const todoDetails = document.createElement("span");
    todoDetails.textContent = "This is a todo detail";

    todoItemLeft.append(checkbox, todoDetails);

    // right
    const todoItemRight = document.createElement("div");
    todoItemRight.classList.add("todo-item-right");

    const todoDate = document.createElement("span");
    todoDate.textContent = "02/10/2023";

    const btnEdit = document.createElement("button");
    // btnEdit.setAttribute("data-index", identifier);
    btnEdit.title = "Edit Item";
    const btnEditIcon = document.createElement("ion-icon");
    btnEditIcon.setAttribute("name", "create-outline");
    btnEdit.append(btnEditIcon);

    const btnRemove = document.createElement("button");
    // btnRemove.setAttribute("data-index", identifier);
    btnRemove.title = "Remove Item";
    const btnRemoveIcon = document.createElement("ion-icon");
    btnRemoveIcon.setAttribute("name", "trash-outline");
    btnRemove.append(btnRemoveIcon);

    const btnExpand = document.createElement("button");
    btnExpand.title = "Expand Item";
    const btnExpandIcon = document.createElement("ion-icon");
    btnExpandIcon.setAttribute("name", "information-circle-outline");
    btnExpand.append(btnExpandIcon);

    todoItemRight.append(todoDate, btnEdit, btnRemove, btnExpand);

    //
    todoItem.append(todoItemLeft, todoItemRight);
    todoContainer.append(todoItem);
  }

  function resetMain() {
    while (todoContainer.firstChild) {
      todoContainer.removeChild(todoContainer.lastChild);
    }
    while (todoHeader.firstChild) {
      todoHeader.removeChild(todoHeader.lastChild);
    }
  }

  function appendAddTodo() {
    const btnAddTodo = document.createElement("button");
    btnAddTodo.id = "btnAddTodo";
    btnAddTodo.title = "Add Todo";

    const btnAddTodoIcon = document.createElement("ion-icon");
    btnAddTodoIcon.setAttribute("name", "add-circle-outline");

    btnAddTodo.append(btnAddTodoIcon);
    todoHeader.append(btnAddTodo);
  }

  function initializeMain() {
    renderMain("All");
    renderTodoItem();
  }

  return {
    renderSideBarProjects,
    appendSideBarProjects,
    resetSideBarStatus,
    activeSidebarStatus,
    //
    initializeMain,
    renderMain,
    renderTodoItem,
    appendAddTodo,
  };
})();

export { dom };
