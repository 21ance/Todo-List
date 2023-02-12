import { dom } from "./DOM";
import { modal } from "./modal";
// might have to remov storage
import { Storage } from "./storage";
import { editProject, newProject, removeProject } from "./projects";
import { newTodo } from "./todos";

// modal form submit
document.addEventListener("submit", (e) => {
  e.preventDefault();

  modal.toggleModal();
  modal.submitModal();
  // dom.appendSideBarProjects();
  // dom.renderSideBarProjects();
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

// general clicky
document.addEventListener("click", (e) => {
  const target = e.target;
  // console.log(e.target);

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
    //
    dom.renderMain(target.parentElement.textContent);
    dom.appendAddTodo();
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
});