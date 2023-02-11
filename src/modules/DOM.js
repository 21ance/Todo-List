import { modal } from "./modal";
import { Storage } from "./storage";

const dom = (() => {
  const sidebarDynamic = document.querySelector(".sidebar-dynamic");

  function renderSideBarProjects() {
    for (let i = 0; i < Storage.projectList.length; i++) {
      sidebarDynamic.append(renderProjectUI(Storage.projectList[i]));
    }
  }

  function appendSideBarProjects() {
    const newItem = renderProjectUI(
      Storage.projectList[Storage.projectList.length - 1]
    );
    sidebarDynamic.append(newItem);
  }

  function renderProjectUI(projectName) {
    const container = document.createElement("div");
    container.classList.add("dynamic-item-container");
    // leftside
    const button = document.createElement("button");
    button.classList.add("dynamic-button");

    const buttonIcon = document.createElement("ion-icon");
    buttonIcon.setAttribute("name", "calendar-clear-outline");
    // rightside
    const rightSide = document.createElement("div");

    const btnEdit = document.createElement("button");
    btnEdit.title = "Edit Project";
    const btnEditIcon = document.createElement("ion-icon");
    btnEditIcon.setAttribute("name", "create-outline");
    btnEdit.append(btnEditIcon);

    const btnRemove = document.createElement("button");
    btnRemove.title = "Remove Project";
    const btnRemoveIcon = document.createElement("ion-icon");
    btnRemoveIcon.setAttribute("name", "trash-outline");
    btnRemove.append(btnRemoveIcon);

    rightSide.append(btnEdit, btnRemove);
    button.append(buttonIcon, projectName);
    container.append(button, rightSide);

    return container;
  }

  renderSideBarProjects();

  // sidebar new project
  function newProject() {
    modal.revealModal("New Project", "Create Project", "btnCreateProject");
    modal.renderNewProjectModal();
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

  return {
    newProject,
    renderSideBarProjects,
    appendSideBarProjects,
    resetSideBarStatus,
    activeSidebarStatus,
  };
})();

export { dom };
