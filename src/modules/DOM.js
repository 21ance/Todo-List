import { modal } from "./modal";
import { Storage } from "./storage";
// import { sidebarListener } from "./listeners";

const dom = (() => {
  const sidebarDynamic = document.querySelector(".sidebar-dynamic");

  // for initial load
  function renderSideBarProjects() {
    // resetSideBarProjects();

    for (let i = 0; i < Storage.projectList.length; i++) {
      sidebarDynamic.append(renderProjectUI(Storage.projectList[i]));
    }
  }

  // for submit new project
  function appendSideBarProjects() {
    const newItem = renderProjectUI(
      Storage.projectList[Storage.projectList.length - 1]
    );
    sidebarDynamic.append(newItem);
  }

  function resetSideBarProjects() {
    while (sidebarDynamic.firstChild) {
      sidebarDynamic.removeChild(sidebarDynamic.lastChild);
    }
  }

  function renderProjectUI(projectName) {
    const container = document.createElement("div");
    container.classList.add("dynamic-item-container");

    // leftside
    const button = document.createElement("button");
    const buttonIcon = document.createElement("ion-icon");
    buttonIcon.setAttribute("name", "calendar-clear-outline");

    // rightside
    const rightSide = document.createElement("div");

    const btnEdit = document.createElement("button");
    btnEdit.title = "Edit Project";

    const btnEditIcon = document.createElement("ion-icon");
    btnEditIcon.setAttribute("name", "create-outline");
    btnEdit.append(btnEditIcon);

    //
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
  // sidebar projects intial load / reload on add
  // renderSideBarProjects();
  // onlick / css effects on sidebar
  renderSideBarProjects();
  //.sidebar-static > button
  // const sidebarProjects = document.querySelectorAll(
  //   ".sidebar-static>button, .dynamic-item-container"
  // );
  const btnEditProject = document.querySelectorAll(
    "button[title='Edit Project']"
  );
  const btnRemoveProject = document.querySelectorAll(
    "button[title='Remove Project']"
  );
  function clickProject(locator) {
    // removeActiveState();
    setActiveState(locator);
  }

  function setActiveState(locator) {
    locator.classList.toggle("active");
  }

  function removeActiveState(element) {
    element.forEach((project) => {
      project.classList.remove("active");
    });
  }

  // sidebar new project
  function newProject() {
    modal.revealModal("New Project", "Create Project", "btnCreateProject");
    modal.renderNewProjectModal();
  }

  return {
    newProject,
    renderSideBarProjects,
    appendSideBarProjects,
    clickProject,
  };
})();

export { dom };
