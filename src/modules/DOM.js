import { sideProjectListener } from "./listeners";
import { Storage } from "./storage";

const dom = (() => {
  //
  const dynamicProjectContainer = document.querySelector(".sidebar-dynamic");
  // sidebar buttons
  const sidebarProjects = document.querySelectorAll(
    "div.sidebar-static>button, .dynamic-item-container"
  );
  const btnEditProject = document.querySelectorAll(
    "button[title='Edit Project']"
  );
  const btnRemoveProject = document.querySelectorAll(
    "button[title='Remove Project']"
  );

  // sidebar functions
  function clickProject(locator) {
    removeActiveState();
    setActiveState(locator);
  }

  function setActiveState(locator) {
    console.log(locator);
    locator.classList.toggle("active");
  }

  function removeActiveState() {
    sidebarProjects.forEach((project) => {
      project.classList.remove("active");
      project.parentElement.classList.remove("active");
    });
  }

  function renderSideBarProjects() {
    // console.log(Storage.projectList);

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

    button.append(buttonIcon, " Project Two");

    container.append(button, rightSide);

    dynamicProjectContainer.append(container);

    // console.log(
    //   document.querySelectorAll(
    //     "div.sidebar-static>button, .dynamic-item-container"
    //   )
    // );
  }

  // sidebar new project
  function newProject() {
    revealModal("New Project", "Create Project", "btnCreateProject");
    renderNewProjectModal();
  }

  // main content functions
  function loadMainContent() {
    // console.log("testMain");
  }

  // modal functions
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector("form");
  const modalHeader = document.querySelector(".modal-content header");
  const modalContent = document.querySelector("form main");
  const btnCancel = document.querySelector("#btnCancel");
  const btnDynamic = document.querySelector("#btnDynamic");

  function revealModal(modalTitle, btnName, btnId) {
    resetModal();
    toggleModal();

    modalHeader.textContent = `${modalTitle}`;
    btnDynamic.textContent = `${btnName}`;
    btnDynamic.setAttribute("id", btnId);
  }

  function toggleModal() {
    modal.classList.toggle("show-modal");
  }

  function resetModal() {
    // remove all element of modalContent
    for (let i = 0; i < modalContent.childElementCount; i++) {
      modalContent.removeChild(modalContent.lastChild);
    }
  }

  // modal content based on shz
  function renderNewProjectModal() {
    const modalLabel = document.createElement("label");
    const modalTitle = document.createElement("span");
    const modalInput = document.createElement("input");

    modalTitle.textContent = "Title*";
    modalInput.placeholder = "Enter Title";
    modalInput.required = true;

    modalLabel.append(modalTitle, modalInput);
    modalContent.append(modalLabel);
  }

  function submitModal() {
    if (document.getElementById("btnCreateProject")) {
      const newProject = Storage.newProjectObject(
        document.querySelector("input[placeholder='Enter Title']").value
      );
      console.log("new proj added to storage");
    }
  }

  return {
    renderSideBarProjects,
    sidebarProjects,
    clickProject,
    newProject,
    toggleModal,
    submitModal,
  };
})();

export { dom };
