import { modal } from "./modal";

// sidebar new project
// function newProject() {
//   modal.revealModal("New Project", "Add", "btnCreateProject");
//   modal.renderNewProject();
// }

// function removeProject(element) {
//   modal.revealModal("Delete Project", "Confirm", "btnRemoveProject");
//   modal.renderRemoveProject(element);
// }

// function editProject(element) {
//   modal.revealModal("Edit Project", "Save", "btnEditProject");
//   modal.renderEditProject(element);
// }

function newTodo() {
  modal.revealModal("New Task", "Add", "btnAddTask");
  modal.renderAddTodo();
}

export { newTodo };
