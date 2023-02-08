import {
  modalLoader,
  buttons,
  resetMain,
  sidebarLoader,
  sideBarItem,
} from "./DOM";
import { loadAll, todoPreview } from "./initialPage";
import { Todo, Project } from "./newTodo";
import { Storage } from "./localStorage";

export const events = (() => {
  modalLoader.form.addEventListener("submit", (e) => {
    const todo = Todo(
      "",
      document.querySelector("#title").value,
      document.querySelector("#description").value,
      document.querySelector("#date").value
    );

    formHelper();
    e.preventDefault();
  });
})();

// close modal and reset form
function formHelper() {
  console.log(localStorage);
  localStorage.setItem("All", JSON.stringify(Storage.allTodoList));

  document.querySelector("form").reset();
  toggleModal();
  resetMain();
  loadAll();
}

// to clean
// modal script
function windowOnClick(event) {
  if (event.target === modal) {
    modalLoader.modal.classList.toggle("show-modal");
  }
}

buttons.newTodo.addEventListener("click", (e) => {
  modalLoader.modal.classList.toggle("show-modal");
});

window.addEventListener("click", windowOnClick);

// new project
buttons.newProject.addEventListener("click", (e) => {
  const newProj = prompt("Project Name");
  const project = Project(`${newProj}`);
  localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
});
