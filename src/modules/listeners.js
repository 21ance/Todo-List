import { dom } from "./DOM";
import { modal } from "./modal";
import { Storage } from "./storage";
import { editProject, newProject, removeProject } from "./projects";
import { editTodo, expandTodo, newTodo, removeTodo } from "./todos";

// modal form submit
document.addEventListener("submit", (e) => {
  e.preventDefault();

  modal.toggleModal();
  modal.submitModal();
});

// close modal on keyboard escape
document.addEventListener("keydown", (e) => {
  // check if modal is active
  const isModal = document
    .querySelector("#modalID")
    .classList.contains("show-modal");
  if (e.key == "Escape" && isModal) {
    modal.toggleModal();
  }
});

// general clicky listener
document.addEventListener("click", (e) => {
  const target = e.target;

  if (target === btnCancel || target === modalID) {
    modal.toggleModal();
  }

  // sidebar - projects event listeners
  if (target.classList.contains("static-button")) {
    dom.resetSideBarStatus();
    dom.activeSidebarStatus(target);
    dom.renderMain(target.textContent);
    dom.renderTodoItem();
  }

  if (target.classList.contains("dynamic-button")) {
    dom.resetSideBarStatus();
    dom.activeSidebarStatus(target.parentElement);
    dom.renderMain(target.parentElement.textContent);
    dom.renderTodoItem();
  }

  if (target === btnNewProject) {
    newProject();
  }

  if (target.title === "Edit Project") {
    editProject(target);
  }

  if (target.title === "Remove Project") {
    removeProject(target);
    document.querySelector("#btnRemoveProject").focus();
  }

  // main - todos event listeners
  if (target.title === "Add Todo") {
    newTodo();
  }

  // checkbox
  const taskContainer = document.querySelector(
    `.todos>div>div[data-index="${target.dataset.index}"]`
  );
  const checkbox = document.querySelector(
    `.todos input[data-index="${target.dataset.index}"]`
  );

  if (target.type === "checkbox" || target.classList.contains("checkbox")) {
    taskContainer.classList.toggle("checked");
    Storage.allTodoList[target.dataset.index].checked = !checkbox.checked;
    localStorage.setItem("All", JSON.stringify(Storage.allTodoList));
    return checkbox.checked
      ? (checkbox.checked = false)
      : (checkbox.checked = true);
  }

  // rightside buttons
  if (target.title === "Edit Item") {
    editTodo(target);
  }
  if (target.title === "Remove Item") {
    removeTodo(target);
    document.querySelector("#btnRemoveTask").focus();
  }
  if (target.title === "Expand Item") {
    expandTodo(target);
  }

  // mobile burgermenu
  if (target === sidbarToggle) {
    dom.responsiveMobile();
  }
});
