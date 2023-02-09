import { mainLoader, buttons } from "./DOM";
import { currentDate } from "./DOM";
import { Storage } from "./localStorage";
import { sidebarLoader } from "./DOM";
import { sideBarItem } from "./DOM";
import { displayNavTitle } from "./DOM";
import { mainEvent, sidebarEvent } from "./eventListeners";

function displayTodo(todoTitle, todoDate, identifier) {
  const container = document.createElement("div");

  const title = document.createElement("span");
  title.textContent = `${todoTitle}`;

  const date = document.createElement("span");
  date.textContent = `${todoDate}`;

  container.append(
    title,
    date,
    buttons.createEditButton(`${identifier}`),
    buttons.createRemoveButton(`${identifier}`)
  );

  return mainLoader.append(container);
}

export function renderMain(mainID) {
  resetMain();
  mainLoader.append(buttons.createTodoButton());
  mainLoader.setAttribute("id", mainID);
  displayNavTitle(mainID);

  for (let i = 0; i < Storage.allTodoList.length; i++) {
    if (mainID == "All") {
      displayTodo(
        Storage.allTodoList[i].title,
        Storage.allTodoList[i].dueDate,
        i
      );
    }
    if (mainID == "Today" && Storage.allTodoList[i].dueDate == currentDate) {
      displayTodo(
        Storage.allTodoList[i].title,
        Storage.allTodoList[i].dueDate,
        i
      );
    }
    if (
      mainID == Storage.allTodoList[i].project &&
      mainID != "All" &&
      mainID != "Today"
    ) {
      displayTodo(
        Storage.allTodoList[i].title,
        Storage.allTodoList[i].dueDate,
        i
      );
    }
  }
  mainEvent.newTodoListener();
  // mainEvent.submitTodoListener();
  mainEvent.editListener();
  mainEvent.removeListener();
}

export function renderSidebarItems() {
  resetSidebar();
  for (let i = 0; i < Storage.projectList.length; i++) {
    sidebarLoader.sidebarDynamic.append(
      sideBarItem(`${Storage.projectList[i]}`, "clipboard-outline")
    );
  }
  sidebarEvent.sidebarListener();
  sidebarEvent.newProjectListener();
}

function resetMain() {
  let children = mainLoader.childElementCount;
  for (let i = 0; i < children; i++) {
    mainLoader.removeChild(mainLoader.lastChild);
  }
}

function resetSidebar() {
  let children = sidebarLoader.sidebarDynamic.childElementCount;
  for (let i = 0; i < children - 1; i++) {
    mainLoader.removeChild(sidebarLoader.sidebarDynamic.lastChild);
  }
}
