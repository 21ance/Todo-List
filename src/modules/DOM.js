import { modal } from "./modal";
import { Storage } from "./storage";

const dom = (() => {
  const projectAll = document.querySelector(
    ".sidebar-static>button:first-child"
  );
  const sidebarStatic = document.querySelectorAll(".sidebar-static button");
  const sidebarDynamic = document.querySelector(".sidebar-dynamic");

  function renderSideBarProjects() {
    resetSideBarProjects();
    for (let i = 0; i < Storage.projectList.length; i++) {
      sidebarDynamic.append(renderProjectUI(Storage.projectList[i], i));
    }
  }

  function resetSideBarProjects() {
    while (sidebarDynamic.firstChild) {
      sidebarDynamic.removeChild(sidebarDynamic.lastChild);
    }
    sidebarStatic.forEach((staticProject) => {
      staticProject.classList.remove("active");
    });
    projectAll.classList.add("active");
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

  // todo header
  function renderMain(header) {
    resetHeader();
    main.id = header;
    todoContainer.classList.add("todos");

    const h1 = document.createElement("h1");
    h1.textContent = header;

    todoHeader.append(h1);
    // todoContainer.append(todoHeader);
    main.append(todoHeader, todoContainer);
  }

  function resetHeader() {
    while (todoHeader.firstChild) {
      todoHeader.removeChild(todoHeader.lastChild);
    }
  }

  function resetMain() {
    while (todoContainer.firstChild) {
      todoContainer.removeChild(todoContainer.lastChild);
    }
  }

  function appendTodoItem() {
    const lastTodoObject = Storage.allTodoList[Storage.allTodoList.length - 1];
    const newItem = renderTodoUI(
      lastTodoObject.checked,
      lastTodoObject.title,
      lastTodoObject.dueDate,
      Storage.allTodoList.length - 1
    );
    todoContainer.append(newItem);
  }

  function renderTodoItem() {
    resetMain();

    // this loop is for static projects (All -> Past Due)
    for (let i = 0; i < Storage.allTodoList.length; i++) {
      const currentDate = new Date().toJSON().slice(0, 10);
      const task = Storage.allTodoList[i];
      if (Storage.allTodoList[i].project === main.id || main.id === "All") {
        todoContainer.append(
          renderTodoUI(
            Storage.allTodoList[i].checked,
            Storage.allTodoList[i].title,
            Storage.allTodoList[i].dueDate,
            i
          )
        );
      }
      if (task.dueDate === currentDate && main.id === "Today") {
        todoContainer.append(
          renderTodoUI(
            Storage.allTodoList[i].checked,
            Storage.allTodoList[i].title,
            Storage.allTodoList[i].dueDate,
            i
          )
        );
      }
      if (task.dueDate > currentDate && main.id === "Upcoming") {
        todoContainer.append(
          renderTodoUI(
            Storage.allTodoList[i].checked,
            Storage.allTodoList[i].title,
            Storage.allTodoList[i].dueDate,
            i
          )
        );
      }
      if (task.checked === true && main.id === "Completed") {
        todoContainer.append(
          renderTodoUI(
            Storage.allTodoList[i].checked,
            Storage.allTodoList[i].title,
            Storage.allTodoList[i].dueDate,
            i
          )
        );
      }
      if (task.dueDate < currentDate && main.id === "Past Due") {
        todoContainer.append(
          renderTodoUI(
            Storage.allTodoList[i].checked,
            Storage.allTodoList[i].title,
            Storage.allTodoList[i].dueDate,
            i
          )
        );
      }
    }
  }

  function renderTodoUI(status, title, date, identifier) {
    const todoItem = document.createElement("div");
    todoItem.setAttribute("data-index", identifier);

    todoItem.classList.add("todo-item");
    // left
    const todoItemLeft = document.createElement("div");
    todoItemLeft.classList.add("todo-item-left");
    todoItemLeft.classList.add("checkbox");
    todoItemLeft.setAttribute("data-index", identifier);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = status;
    checkbox.setAttribute("data-index", identifier);
    const todoDetails = document.createElement("span");
    todoDetails.classList.add("checkbox");
    todoDetails.setAttribute("data-index", identifier);
    todoDetails.textContent = title;

    todoItemLeft.append(checkbox, todoDetails);

    if (checkbox.checked) {
      checkbox.parentElement.classList.toggle("checked");
      // console.log(checkbox.parentElement.parentElement);
    }

    // right
    const todoItemRight = document.createElement("div");
    todoItemRight.classList.add("todo-item-right");
    const todoDate = document.createElement("span");
    todoDate.textContent = date;
    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("data-index", identifier);
    btnEdit.title = "Edit Item";
    const btnEditIcon = document.createElement("ion-icon");
    btnEditIcon.setAttribute("name", "create-outline");
    btnEdit.append(btnEditIcon);
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("data-index", identifier);
    btnRemove.title = "Remove Item";
    const btnRemoveIcon = document.createElement("ion-icon");
    btnRemoveIcon.setAttribute("name", "trash-outline");
    btnRemove.append(btnRemoveIcon);

    const btnExpand = document.createElement("button");
    btnExpand.title = "Expand Item";
    btnExpand.setAttribute("data-index", identifier);
    const btnExpandIcon = document.createElement("ion-icon");
    btnExpandIcon.setAttribute("name", "information-circle-outline");
    btnExpand.append(btnExpandIcon);

    todoItemRight.append(todoDate, btnEdit, btnRemove, btnExpand);

    //
    todoItem.append(todoItemLeft, todoItemRight);
    // todoContainer.append(todoItem);
    // const newItem = renderTodoUI(
    //   // Storage.allTodoList[Storage.projectList.length - 1],
    // )
    return todoItem;
  }

  function appendNewTodoButton() {
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
    main,
    renderSideBarProjects,
    appendSideBarProjects,
    resetSideBarStatus,
    activeSidebarStatus,
    //
    renderMain,
    renderTodoItem,
    //
    initializeMain,
    renderTodoUI,
    appendNewTodoButton,
    appendTodoItem,
    renderTodoItem,
  };
})();

export { dom };
