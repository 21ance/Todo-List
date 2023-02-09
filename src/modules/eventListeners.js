import { modalLoader, buttons } from "./DOM";
import { Todo, Project } from "./factories";
import { Storage } from "./localStorage";
import { Modal } from "./modalHandler";
import { renderMain } from "./renderer";
import { sidebarLoader, sideBarItem } from "./DOM";

// new todo
export const events = (() => {
  modalLoader.form.addEventListener("submit", (e) => {
    const todo = Todo(
      document.querySelector("main").getAttribute("id"),
      document.querySelector("#title").value,
      document.querySelector("#description").value,
      document.querySelector("#date").value
    );

    localStorage.setItem("All", JSON.stringify(Storage.allTodoList));

    e.preventDefault();
    Modal.formHelper();
  });
})();

// new project
buttons.newProject.addEventListener("click", (e) => {
  const newProj = prompt("Project Name");
  const project = Project(`${newProj}`);
  localStorage.setItem("Projects", JSON.stringify(Storage.projectList));

  sidebarLoader.sidebarDynamic.append(
    sideBarItem(`${newProj}`, "pricetag-outline")
  );
});

// todo edit item
