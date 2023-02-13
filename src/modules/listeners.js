import { dom } from "./DOM";
import { modal } from "./modal";
// might have to remov storage
import { Storage } from "./storage";
import { editProject, newProject, removeProject } from "./projects";
import { newTodo, removeTodo } from "./todos";

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

    dom.main.id = target.textContent;
    console.log(dom.main);
  }

  if (target.classList.contains("dynamic-button")) {
    dom.resetSideBarStatus();
    dom.activeSidebarStatus(target.parentElement);
    //
    dom.main.id = target.textContent;
    dom.renderMain(target.parentElement.textContent);
    dom.appendNewTodoButton();
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

  // actual todos
  // checkbox
  if (target.type === "checkbox") {
    target.nextSibling.classList.toggle("checked");
    // target.classList.toggle("asdsa");
  }
  // console.log(target);

  // if (target.className === "todo-item-left") {
  //   target.classList.toggle("checked");
  // }

  //rightside buttons
  if (target.title === "Edit Item") {
    console.log("Edit Item");
  }
  if (target.title === "Remove Item") {
    removeTodo(target);
    document.querySelector("#btnRemoveTask").focus();
  }
  if (target.title === "Expand Item") {
    console.log("Expand Item");
  }
});
