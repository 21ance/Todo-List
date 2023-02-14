import { modal } from "./modal";

function newProject() {
  modal.modalForm.reset();
  modal.revealModal("New Project", "Add", "btnCreateProject");
  modal.renderNewProject();
}

function removeProject(element) {
  modal.revealModal("Delete Project", "Confirm", "btnRemoveProject");
  modal.renderRemoveProject(element);
}

function editProject(element) {
  modal.revealModal("Edit Project", "Save", "btnEditProject");
  modal.renderEditProject(element);
}

export { newProject, removeProject, editProject };
